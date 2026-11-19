// Helpers for The Lab: categories (src/content/lab/*.md) and projects (src/content/lab/<category>/*.md).
import { getCollection, type CollectionEntry } from 'astro:content';
import { getLog } from './log';

export type LabCategory = CollectionEntry<'labCategories'>;
export type LabProject = CollectionEntry<'lab'>;
export type LabStatus = LabProject['data']['status'];

export async function getLabCategories(): Promise<LabCategory[]> {
  const cats = await getCollection('labCategories');
  return cats.sort((a, b) => a.data.order - b.data.order);
}

/** A project's category is the folder it sits in: "apps/sectortray" -> "apps". */
export const categoryOf = (p: LabProject) => p.id.split('/')[0];
export const slugOf = (p: LabProject) => p.id.split('/').slice(1).join('/');
export const projectUrl = (p: LabProject) => `/lab/${p.id}/`;
export const categoryUrl = (c: LabCategory | string) => `/lab/${typeof c === 'string' ? c : c.id}/`;

export const statusLabel = (s: LabStatus) =>
  ({ planned: 'Planned', 'in-progress': 'In progress', prototype: 'Prototype', released: 'Released', finished: 'Finished' })[s];

/** The filter group a status belongs to on a category page. */
export const statusGroup = (s: LabStatus) =>
  ({ planned: 'planned', 'in-progress': 'active', prototype: 'active', released: 'done', finished: 'done' })[s] as 'planned' | 'active' | 'done';

export const groupLabels = { done: 'Released', active: 'In progress', planned: 'Planned' } as const;

/** What the status column shows: the version for released software, otherwise the status. */
export const statusText = (p: LabProject) =>
  p.data.status === 'released' && p.data.version ? p.data.version : statusLabel(p.data.status);

/**
 * All projects, each with the date it was last updated: its own `updated` date,
 * or the newest logbook entry tagged to it, whichever is later.
 */
export async function getLabProjects(): Promise<(LabProject & { lastUpdated?: Date })[]> {
  const [projects, entries] = await Promise.all([getCollection('lab'), getLog('lab')]);
  return projects.map((p) => {
    const logDates = entries.filter((e) => e.data.labProject?.id === p.id).map((e) => e.data.date.getTime());
    const times = [p.data.updated?.getTime(), ...logDates].filter((t): t is number => typeof t === 'number');
    return Object.assign(p, { lastUpdated: times.length ? new Date(Math.max(...times)) : undefined });
  });
}

/** Most recently updated first; projects with no date go last, then by name. */
export const byRecent = (a: { lastUpdated?: Date; data: { title: string } }, b: { lastUpdated?: Date; data: { title: string } }) =>
  (b.lastUpdated?.getTime() ?? 0) - (a.lastUpdated?.getTime() ?? 0) || a.data.title.localeCompare(b.data.title);

/** Order on a category page: released, then in progress, then planned; most recent first within each. */
const groupRank = { done: 0, active: 1, planned: 2 };
export const byShelf = (a: LabProject & { lastUpdated?: Date }, b: LabProject & { lastUpdated?: Date }) =>
  groupRank[statusGroup(a.data.status)] - groupRank[statusGroup(b.data.status)] || byRecent(a, b);

/** YYYY-MM-DD for the terminal listing. */
export const isoDay = (d?: Date) => (d ? d.toISOString().slice(0, 10) : '—');
