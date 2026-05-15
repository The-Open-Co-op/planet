export type FollowSourceType = 'contact' | 'profile' | 'blog' | 'rss';

export interface FollowEntry {
  id: string;
  name: string;
  /** Optional avatar/image */
  avatar?: string;
  type: FollowSourceType;
  /** For PLANET sources */
  agentName?: string;
  /** For external RSS */
  rssUrl?: string;
  /** Optional hashtag scoping — empty means follow everything they publish */
  hashtags: string[];
}

export type ContentCategory = 'News' | 'Events' | 'Recommendations' | 'Opportunities';

export interface FeedConfig {
  id: string;
  name: string;
  /** Subtle dot colour */
  color: string;
  /** Trust profile names from useTrustProfiles */
  trustProfiles: string[];
  contentMix: Record<ContentCategory, number>;
  follows: FollowEntry[];
}

export interface FeedPost {
  id: string;
  sourceName: string;
  sourceAvatar?: string;
  sourceType: FollowSourceType;
  /** For PLANET sources */
  agentName?: string;
  title: string;
  excerpt: string;
  /** Optional image */
  image?: string;
  date: string;
  category: ContentCategory;
  hashtags: string[];
  /** Which feed this post belongs to */
  feedId: string;
}

export const FEED_COLORS: Record<string, string> = {
  friends: '#6366f1',
  work: '#3b82f6',
  coop: '#ef4444',
  local: '#10b981',
};

export const mayaFeeds: FeedConfig[] = [
  {
    id: 'friends',
    name: 'Friends',
    color: FEED_COLORS.friends,
    trustProfiles: ['Friends', 'Family'],
    contentMix: { News: 20, Events: 30, Recommendations: 30, Opportunities: 20 },
    follows: [
      {
        id: 'f-jonny',
        name: 'Jonny',
        avatar: '/images/john-doe-colleauges.jpeg',
        type: 'blog',
        agentName: 'planetnetwork.app/@jonny/blog',
        hashtags: ['regenerative'],
      },
      {
        id: 'f-sarah',
        name: 'Sarah Mitchell',
        avatar: '/images/sarah-mitchell.png',
        type: 'contact',
        agentName: 'planetnetwork.app/@sarah',
        hashtags: [],
      },
      {
        id: 'f-anna',
        name: 'Anna Lindberg',
        avatar: '/images/Anna.jpg',
        type: 'contact',
        agentName: 'planetnetwork.app/@anna',
        hashtags: [],
      },
      {
        id: 'f-tree',
        name: 'Tree Field Journal',
        avatar: '/images/Tree.jpg',
        type: 'blog',
        agentName: 'planetnetwork.app/@tree/blog',
        hashtags: [],
      },
    ],
  },
  {
    id: 'work',
    name: 'Work',
    color: FEED_COLORS.work,
    trustProfiles: ['Business'],
    contentMix: { News: 35, Events: 25, Recommendations: 15, Opportunities: 25 },
    follows: [
      {
        id: 'f-energycoop',
        name: 'Energy Co-op London',
        type: 'profile',
        agentName: 'planetnetwork.app/@energycooplondon',
        hashtags: [],
      },
      {
        id: 'f-guardian-env',
        name: 'The Guardian — Environment',
        type: 'rss',
        rssUrl: 'theguardian.com/environment/rss',
        hashtags: ['energy'],
      },
      {
        id: 'f-tomorrow',
        name: 'Tomorrow.io',
        type: 'rss',
        rssUrl: 'tomorrow.io/feed.xml',
        hashtags: [],
      },
      {
        id: 'f-coopnews-work',
        name: 'Co-operative News',
        type: 'rss',
        rssUrl: 'thenews.coop/rss',
        hashtags: ['energy'],
      },
    ],
  },
  {
    id: 'coop',
    name: 'Co-op',
    color: FEED_COLORS.coop,
    trustProfiles: ['Community'],
    contentMix: { News: 20, Events: 30, Recommendations: 20, Opportunities: 30 },
    follows: [
      {
        id: 'f-coopnews',
        name: 'Co-operative News',
        type: 'rss',
        rssUrl: 'thenews.coop/rss',
        hashtags: ['governance'],
      },
      {
        id: 'f-jonny-coop',
        name: 'Jonny',
        avatar: '/images/john-doe-colleauges.jpeg',
        type: 'blog',
        agentName: 'planetnetwork.app/@jonny/blog',
        hashtags: ['cooperatives'],
      },
      {
        id: 'f-frederic',
        name: 'Frederic Laloux',
        avatar: '/images/Frederic.jpg',
        type: 'profile',
        agentName: 'planetnetwork.app/@frederic',
        hashtags: [],
      },
    ],
  },
  {
    id: 'local',
    name: 'Local',
    color: FEED_COLORS.local,
    trustProfiles: ['Friends', 'Community'],
    contentMix: { News: 25, Events: 45, Recommendations: 15, Opportunities: 15 },
    follows: [
      {
        id: 'f-timeout',
        name: 'Time Out London',
        type: 'rss',
        rssUrl: 'timeout.com/london/rss',
        hashtags: ['events'],
      },
      {
        id: 'f-hackney',
        name: 'Hackney Community',
        type: 'profile',
        agentName: 'planetnetwork.app/@hackneycommunity',
        hashtags: [],
      },
      {
        id: 'f-sarah-local',
        name: 'Sarah Mitchell',
        avatar: '/images/sarah-mitchell.png',
        type: 'contact',
        agentName: 'planetnetwork.app/@sarah',
        hashtags: ['london'],
      },
    ],
  },
];

/** Posts that surface in Maya's Friends feed for the demo */
export const friendsFeedPosts: FeedPost[] = [
  {
    id: 'p-jonny-garden',
    sourceName: 'Jonny',
    sourceAvatar: '/images/john-doe-colleauges.jpeg',
    sourceType: 'blog',
    agentName: 'planetnetwork.app/@jonny/blog',
    title: 'What I learned co-running a community garden',
    excerpt: "Three seasons in, here's what nobody tells you about co-running a community garden — and why I'd do it again.",
    image: '/images/moving-mulch.jpg',
    date: '2026-05-14T09:30:00Z',
    category: 'Recommendations',
    hashtags: ['regenerative', 'communities', 'gardening'],
    feedId: 'friends',
  },
  {
    id: 'p-sarah-event',
    sourceName: 'Sarah Mitchell',
    sourceAvatar: '/images/sarah-mitchell.png',
    sourceType: 'contact',
    agentName: 'planetnetwork.app/@sarah',
    title: 'Regenerative agriculture meetup — June 8th',
    excerpt: 'Hosting a small gathering at the allotments. Bring something to share. Folks welcome from across the network.',
    date: '2026-05-12T18:00:00Z',
    category: 'Events',
    hashtags: ['regenerative', 'community'],
    feedId: 'friends',
  },
  {
    id: 'p-anna',
    sourceName: 'Anna Lindberg',
    sourceAvatar: '/images/Anna.jpg',
    sourceType: 'contact',
    agentName: 'planetnetwork.app/@anna',
    title: 'A weekend of mending and mushroom foraging',
    excerpt: 'Spent Saturday in Epping Forest, came home with chanterelles. Sunday at the repair café — fixed two pairs of boots.',
    date: '2026-05-11T19:00:00Z',
    category: 'Recommendations',
    hashtags: ['community'],
    feedId: 'friends',
  },
  {
    id: 'p-tree',
    sourceName: 'Tree Field Journal',
    sourceAvatar: '/images/Tree.jpg',
    sourceType: 'blog',
    agentName: 'planetnetwork.app/@tree/blog',
    title: 'On waiting for the right rain',
    excerpt: 'A short essay on patience, planting cycles, and learning to read soil moisture by hand.',
    date: '2026-05-10T08:00:00Z',
    category: 'Recommendations',
    hashtags: ['regenerative'],
    feedId: 'friends',
  },
];

export const workFeedPosts: FeedPost[] = [
  {
    id: 'p-energycoop-event',
    sourceName: 'Energy Co-op London',
    sourceType: 'profile',
    agentName: 'planetnetwork.app/@energycooplondon',
    title: 'June AGM — finalising the new tariff',
    excerpt: 'Members vote on the proposed tariff structure for 2026/27. Quorum needed.',
    date: '2026-05-13T09:00:00Z',
    category: 'Events',
    hashtags: ['energy', 'governance'],
    feedId: 'work',
  },
  {
    id: 'p-guardian-energy',
    sourceName: 'The Guardian — Environment',
    sourceType: 'rss',
    title: 'UK community energy schemes hit record installation year',
    excerpt: 'New figures show community-owned renewable projects added more than 60MW of capacity in 2025, the highest annual total to date.',
    date: '2026-05-13T07:15:00Z',
    category: 'News',
    hashtags: ['energy'],
    feedId: 'work',
  },
  {
    id: 'p-tomorrow',
    sourceName: 'Tomorrow.io',
    sourceType: 'rss',
    title: 'Cargo bike co-op opens membership for spring',
    excerpt: 'A peer-to-peer cargo bike network is opening up new memberships. Reduces costs and emissions for small co-ops.',
    date: '2026-05-11T10:00:00Z',
    category: 'Opportunities',
    hashtags: ['energy'],
    feedId: 'work',
  },
];

export const coopFeedPosts: FeedPost[] = [
  {
    id: 'p-coopnews-gov',
    sourceName: 'Co-operative News',
    sourceType: 'rss',
    title: 'Why co-ops need better governance tooling',
    excerpt: 'A long read on what current platforms get wrong about consensus and what the alternatives look like.',
    date: '2026-05-13T11:00:00Z',
    category: 'News',
    hashtags: ['governance'],
    feedId: 'coop',
  },
  {
    id: 'p-jonny-coop',
    sourceName: 'Jonny',
    sourceAvatar: '/images/john-doe-colleauges.jpeg',
    sourceType: 'blog',
    agentName: 'planetnetwork.app/@jonny/blog',
    title: 'Notes from a co-op assembly',
    excerpt: 'Sixty-three members, four hours, one decision. Here\'s what worked.',
    image: '/images/co-op-assembly.jpg',
    date: '2026-03-08T16:22:00Z',
    category: 'Recommendations',
    hashtags: ['cooperatives', 'governance'],
    feedId: 'coop',
  },
  {
    id: 'p-frederic',
    sourceName: 'Frederic Laloux',
    sourceAvatar: '/images/Frederic.jpg',
    sourceType: 'profile',
    agentName: 'planetnetwork.app/@frederic',
    title: 'Five anti-patterns in self-managed orgs',
    excerpt: 'A short list distilled from talking to dozens of teal-style orgs over the past year.',
    date: '2026-05-09T12:00:00Z',
    category: 'Recommendations',
    hashtags: ['governance'],
    feedId: 'coop',
  },
];

export const localFeedPosts: FeedPost[] = [
  {
    id: 'p-timeout',
    sourceName: 'Time Out London',
    sourceType: 'rss',
    title: 'Eight community gardens to visit this summer',
    excerpt: 'From Dalston to Brixton, the volunteer-run gardens worth a Sunday afternoon.',
    date: '2026-05-13T10:00:00Z',
    category: 'Events',
    hashtags: ['events'],
    feedId: 'local',
  },
  {
    id: 'p-hackney',
    sourceName: 'Hackney Community',
    sourceType: 'profile',
    agentName: 'planetnetwork.app/@hackneycommunity',
    title: 'Repair Café — last Saturday of the month',
    excerpt: 'Bring your broken kettles, lamps, jumpers — local volunteers will fix what they can.',
    date: '2026-05-11T17:00:00Z',
    category: 'Events',
    hashtags: ['community'],
    feedId: 'local',
  },
  {
    id: 'p-sarah-local',
    sourceName: 'Sarah Mitchell',
    sourceAvatar: '/images/sarah-mitchell.png',
    sourceType: 'contact',
    agentName: 'planetnetwork.app/@sarah',
    title: 'Lido swim Saturday — anyone in?',
    excerpt: "London Fields Lido at 8am. Coffee after. Bring whoever's around.",
    date: '2026-05-10T20:00:00Z',
    category: 'Events',
    hashtags: ['london'],
    feedId: 'local',
  },
];

export const feedPostsByFeedId: Record<string, FeedPost[]> = {
  friends: friendsFeedPosts,
  work: workFeedPosts,
  coop: coopFeedPosts,
  local: localFeedPosts,
};

/** All of Maya's contacts in her PNM vault — local list, no avatars (initials only) */
export const mayaContacts: FollowEntry[] = [
  { id: 'c-sarah', name: 'Sarah Mitchell', type: 'contact', agentName: 'planetnetwork.app/@sarah', hashtags: [] },
  { id: 'c-amanda', name: 'Amanda Foster', type: 'contact', agentName: 'planetnetwork.app/@amanda', hashtags: [] },
  { id: 'c-ariana', name: 'Ariana Bahrami', type: 'contact', agentName: 'planetnetwork.app/@ariana', hashtags: [] },
  { id: 'c-marcus', name: 'Marcus Thompson', type: 'contact', agentName: 'planetnetwork.app/@marcus', hashtags: [] },
  { id: 'c-elena', name: 'Elena Rodriguez', type: 'contact', agentName: 'planetnetwork.app/@elena', hashtags: [] },
  { id: 'c-anna', name: 'Anna Lindberg', type: 'contact', agentName: 'planetnetwork.app/@anna', hashtags: [] },
  { id: 'c-jonny', name: 'Jonny', type: 'contact', agentName: 'planetnetwork.app/@jonny', hashtags: [] },
];

/** Web catalog — discoverable via Murmurations (PLANET profiles + FP blogs) and FeedSearch/Feedly (RSS).
 *  Only surfaces when Maya searches. */
export const webCatalog: FollowEntry[] = [
  // PLANET profiles (members not in Maya's contacts) — indexed via Murmurations
  { id: 'w-dcw', name: 'Daniel Christian Wahl', type: 'profile', agentName: 'planetnetwork.app/@danielcw', hashtags: [] },
  { id: 'w-kate', name: 'Kate Raworth', type: 'profile', agentName: 'planetnetwork.app/@kateraworth', hashtags: [] },
  { id: 'w-indy', name: 'Indy Johar', type: 'profile', agentName: 'planetnetwork.app/@indyjohar', hashtags: [] },
  { id: 'w-buurtzorg', name: 'Buurtzorg Network', type: 'profile', agentName: 'planetnetwork.app/@buurtzorg', hashtags: [] },
  // FP Blogs — indexed via Murmurations
  { id: 'w-mycelial', name: 'The Mycelial', type: 'blog', agentName: 'planetnetwork.app/@mycelial/blog', hashtags: [] },
  { id: 'w-doughnut', name: 'Doughnut Notes', type: 'blog', agentName: 'planetnetwork.app/@doughnut/blog', hashtags: [] },
  { id: 'w-fieldrecords', name: 'Field Records', type: 'blog', agentName: 'planetnetwork.app/@fieldrecords/blog', hashtags: [] },
  { id: 'w-slowbookshop', name: 'Slow Bookshop', type: 'blog', agentName: 'planetnetwork.app/@slowbookshop/blog', hashtags: [] },
  // External RSS — via FeedSearch.dev / Feedly API
  { id: 'w-resilience', name: 'Resilience.org', type: 'rss', rssUrl: 'resilience.org/feed', hashtags: [] },
  { id: 'w-lowtech', name: 'Low-Tech Magazine', type: 'rss', rssUrl: 'lowtechmagazine.com/feed', hashtags: [] },
  { id: 'w-stir', name: 'Stir to Action', type: 'rss', rssUrl: 'stirtoaction.com/feed', hashtags: [] },
  { id: 'w-permaculture', name: 'Permaculture News', type: 'rss', rssUrl: 'permaculturenews.org/feed', hashtags: [] },
];
