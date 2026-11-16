// Site-wide facts in one place. Change wording here, not in the pages.

export const site = {
  name: 'Vagabond Celtic Viking',
  signature: 'Vahn',
  description:
    'Vahn’s house on the web: writing, music, the forge and woodshop, a 1908 house renovation, and things built in the lab.',
  region: 'American Midwest',
};

// Links in the footer. Leave `url` empty to show the name without a link.
export const elsewhere: { name: string; url: string }[] = [
  { name: 'Instagram', url: 'https://www.instagram.com/vagabondcelticviking/' },
  { name: 'cyberspace.online', url: '' }, // TODO: profile link for `vahn`
  { name: 'GitHub', url: 'https://github.com/celticviking' },
];

export type RoomId = 'house' | 'shop' | 'lab' | 'press' | 'studio' | 'about';
export const roomIds = ['house', 'shop', 'lab', 'press', 'studio', 'about'] as const;

export interface Room {
  id: RoomId;
  no: string;
  name: string;          // shown on the floor plan and room page
  menu: string;          // shorter name for the top menu
  blurb: string;
  chips: string[];       // palette swatches shown on the floor plan
  open: boolean;         // false = "Under construction", not a link
  cta: string;
  photo?: string;        // optional faded photo behind the room on Home (path in /public)
}

// Order here is the order on the floor plan (left to right, top row first).
export const rooms: Room[] = [
  {
    id: 'house', no: '01', name: 'The House', menu: 'The House',
    blurb: 'Interior design, one room at a time. Before, after, why it looks the way it does, and what I learned along the way.',
    chips: ['#612521', '#947B47', '#586251', '#A16D55'],
    open: true, cta: '4 rooms done · 2 (plus the outdoor shop) to go →',
  },
  {
    id: 'shop', no: '02', name: 'The Shop', menu: 'The Shop',
    blurb: 'Forge and workbench. Blacksmithing, woodworking, and similar projects',
    chips: ['#1A1614', '#D96A2C', '#8A6B47', '#4A5D3A'],
    open: true, cta: 'Enter →',
  },
  {
    id: 'lab', no: '03', name: 'The Lab', menu: 'The Lab',
    blurb: 'Open-source apps, cyberdecks, 3D prints, and games still in progress.',
    chips: ['#0A0E0A', '#9FE86B', '#FFB84A', '#3F5A3F'],
    open: true, cta: 'Enter →',
  },
  {
    id: 'press', no: '04', name: 'VCV Press', menu: 'Press',
    blurb: 'Books by Drew Walker, both published and in progress. Some poetry, as well.',
    chips: ['#EDE7DB', '#16202B', '#7A1F1F', '#4D5A66'],
    open: true, cta: 'Enter →',
  },
  {
    id: 'studio', no: '05', name: 'The Studio', menu: 'Studio',
    blurb: 'More to come here, stay tuned...',
    chips: ['#0B0415', '#FF2E88', '#22D3EE'],
    open: false, cta: 'Under construction',
  },
  {
    id: 'about', no: '06', name: 'About Me', menu: 'About',
    blurb: 'Who Vahn is, where the name came from, and why there’s a mark on everything.',
    chips: ['#F5F2EC', '#16130F'],
    open: true, cta: 'Enter →',
  },
];

export const roomById = (id: RoomId) => rooms.find((r) => r.id === id)!;
export const roomHref = (id: RoomId) => `/${id}/`;
