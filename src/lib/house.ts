// Helpers for The House: the rooms in src/content/house/, in house order.
import { getCollection, type CollectionEntry } from 'astro:content';

export type HouseRoom = CollectionEntry<'house'>;

export async function getHouseRooms(): Promise<HouseRoom[]> {
  const rooms = await getCollection('house');
  return rooms.sort((a, b) => a.data.order - b.data.order);
}

/** Rooms that get their own page (finished or in progress). Planned rooms only appear on /house/. */
export const hasPage = (r: HouseRoom) => r.data.status !== 'planned';

export const roomUrl = (r: HouseRoom) => `/house/${r.id}/`;

export function statusLabel(r: HouseRoom): string {
  if (r.data.statusText) return r.data.statusText;
  return { finished: 'Finished', 'in-progress': 'In progress', planned: 'Planned' }[r.data.status];
}

/** True for placeholder copy written in [square brackets]. */
export const isPrompt = (s?: string) => !!s && s.trim().startsWith('[') && s.trim().endsWith(']');

/** Two-digit room number, e.g. "03". */
export const roomNo = (r: HouseRoom) => String(r.data.order).padStart(2, '0');
