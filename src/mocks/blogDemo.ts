export interface BlogPersona {
  name: string;
  handle: string;
  avatar: string;
  agentName: string;
  tagline: string;
  bio: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  featuredImage: string;
  excerpt: string;
  body: string[];
  date: string;
  hashtags: string[];
  visibility: 'public' | 'members' | 'draft';
  signedAt?: string;
}

export interface BlogComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  date: string;
  body: string;
  replies?: BlogComment[];
}

export const jonny: BlogPersona = {
  name: 'Jonny',
  handle: 'jonny',
  avatar: '/images/john-doe-colleauges.jpeg',
  agentName: 'planetnetwork.app/@jonny',
  tagline: 'Notes from the regenerative edge',
  bio: 'Designer, organiser, gardener. Writing about regenerative networks and the people building them.',
};

export const maya: BlogPersona = {
  name: 'Maya Okafor',
  handle: 'maya',
  avatar: '/images/Margeigh.jpg',
  agentName: 'planetnetwork.app/@maya',
  tagline: 'Cooperatives, climate, code',
  bio: 'Member-owner of a renewable energy co-op.',
};

export const blogBanner = '/images/planet-billboard-bg.jpg';

export const draftPost: BlogPost = {
  id: 'p-new',
  title: 'What I learned co-running a community garden',
  subtitle: 'Three seasons in, here\'s what nobody tells you',
  featuredImage: '/images/moving-mulch.jpg',
  excerpt: 'Three seasons in, here\'s what nobody tells you about co-running a community garden — and why I\'d do it again.',
  body: [
    'When we started the garden in spring 2024, I assumed the hardest part would be the soil. Turns out the soil is easy. Coordinating fourteen adults with strong opinions about kale — that is the work.',
    'The first season we tried consensus on everything. Every decision, from what to plant to when to weed. By July, half the beds were tomatoes and nobody had agreed who watered on Wednesdays. We learned that consensus is for direction, not logistics.',
    'The second season we tried a rota. A spreadsheet. Pinned to a shed. It worked for three weeks. Then someone\'s kid got sick, and three days of no watering in August nearly cost us the squash.',
    'Now, season three, we have something messier and better: a small core team who agree on direction, a wider circle who show up when they can, and a single shared chat where anyone can flag what needs doing today. It is not consensus. It is not a rota. It is what we actually do.',
  ],
  date: '2026-05-14',
  hashtags: ['regenerative', 'communities', 'gardening'],
  visibility: 'members',
};

export const existingPosts: BlogPost[] = [
  {
    id: 'p-1',
    title: 'On the patience of soil',
    featuredImage: '/images/patience-of-soil.jpg',
    excerpt: 'Why the regenerative movement keeps coming back to the same lesson — slow down, observe, then act.',
    body: [
      'There is a phrase that keeps surfacing in conversations with regenerative farmers: the patience of soil. Soil does not negotiate. It rewards what you put in over years, not weeks.',
      'I think networks are the same. The most resilient ones are not the fastest-growing — they are the ones that compost their mistakes, that let trust accumulate slowly, that don\'t rush their roots.',
    ],
    date: '2026-04-22',
    hashtags: ['regenerative', 'soil'],
    visibility: 'public',
    signedAt: '2026-04-22T10:14:00Z',
  },
  {
    id: 'p-2',
    title: 'Notes from a co-op assembly',
    featuredImage: '/images/co-op-assembly.jpg',
    excerpt: 'Sixty-three members, four hours, one decision. Here\'s what worked.',
    body: [
      'Saturday morning, sixty-three of us in a community hall, deciding whether to take on the building lease. By lunch we had a path forward. Here is what I noticed.',
      'The chair had a single rule — anyone who hadn\'t spoken yet went next. Quiet people in the room turned out to have the sharpest questions.',
    ],
    date: '2026-03-08',
    hashtags: ['cooperatives', 'governance'],
    visibility: 'public',
    signedAt: '2026-03-08T16:22:00Z',
  },
];

export const seededComments: BlogComment[] = [
  {
    id: 'c-1',
    authorName: 'Maya Okafor',
    authorAvatar: '/images/Margeigh.jpg',
    date: '2026-05-14T11:42:00Z',
    body: 'This is the bit about consensus vs. logistics — completely matches what we\'ve seen at the energy co-op. The "rota in a shed" phase nearly broke us too.',
  },
];

export const jonnyEmail = 'jonny@planetnetwork.app';
