// Helpers for the logbook.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { RoomId } from '../data/site';

export type LogEntry = CollectionEntry<'log'>;

/** All entries, newest first. Drafts appear in local preview only, never in the published build. */
export async function getLog(room?: RoomId): Promise<LogEntry[]> {
  const entries = await getCollection('log', ({ data }) => {
    if (import.meta.env.PROD && data.draft) return false;
    return room ? data.room === room : true;
  });
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** "Nov 2021" style date for cards; dates are stored without a time, so read them as UTC. */
export function monthYear(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

/** "27 November 2021" for entry pages. */
export function longDate(d: Date): string {
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/** The entry's own summary, or its first sentences, trimmed to about `max` characters. */
export function excerpt(entry: LogEntry, max = 170): string {
  if (entry.data.summary) return entry.data.summary;
  const para = (entry.body ?? '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith('#') && !p.startsWith('!') && !p.startsWith('<'));
  if (!para) return '';
  const plain = para
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links -> text
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ');
  if (plain.length <= max) return plain;
  const cut = plain.slice(0, max);
  const sentence = cut.lastIndexOf('. ');
  if (sentence > max * 0.5) return cut.slice(0, sentence + 1);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}
