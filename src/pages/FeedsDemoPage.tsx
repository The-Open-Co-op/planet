import { DemoPageShell } from '@/components/demo/DemoPageShell';
import type { DemoStep } from '@/components/demo/DemoPageShell';

import { FeedInstallScreen } from '@/components/feeds/FeedInstallScreen';
import { FeedWelcomeScreen } from '@/components/feeds/FeedWelcomeScreen';
import { FeedSettingsScreen } from '@/components/feeds/FeedSettingsScreen';
import { AddFollowScreen } from '@/components/feeds/AddFollowScreen';
import { FeedViewScreen } from '@/components/feeds/FeedViewScreen';
import { FeedPostViewScreen } from '@/components/feeds/FeedPostViewScreen';
import { FeedbackScreen } from '@/components/onboarding/FeedbackScreen';

const steps: DemoStep[] = [
  {
    id: '01',
    slug: 'install',
    title: 'Install Feeds',
    subtitle: 'Maya adds the Feeds app from the PNM App Store',
    screen: ({ goToStep }) => <FeedInstallScreen onContinue={() => goToStep('welcome')} />,
    annotations: [
      {
        side: 'left', top: 82.25, category: 'ui',
        title: 'Maya, in the PNM App Store',
        description: "Maya, a PLANET member, is about to install the Feeds app. Each app is a small bounded sub-app inside the PNM.",
        tag: 'UX',
      },
      {
        side: 'right', top: 32, category: 'protocol',
        title: 'Sub-app inside the PNM',
        description: 'Feeds reuses the PNM auth session, vault, and DID — no separate account. Like Blog, it reads and writes data straight into Maya\'s vault.',
        tag: 'Backend',
      },
      {
        side: 'right', top: 82.25, category: 'protocol',
        title: 'No central feed server',
        description: "Feeds is a client-side composer. There is no central index ranking content for everyone.",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '02',
    slug: 'welcome',
    title: 'Welcome to Feeds',
    subtitle: 'Your own algorithm, on your terms',
    screen: ({ goToStep }) => <FeedWelcomeScreen onContinue={() => goToStep('settings')} />,
    annotations: [
      {
        side: 'left', top: 19.5, category: 'ui',
        title: 'Welcome screen',
        description: 'Shown once on install. A short pitch for what the app is for, then a single CTA into setup.',
        tag: 'UX',
      },
      {
        side: 'right', top: 50, category: 'ui',
        title: 'Constructed, not curated',
        description: 'Feeds are something you assemble — not something handed down by a platform. One app, many feeds — run a home feed, a co-op feed, a news feed and a local feed in parallel.',
        tag: 'UX',
      },
    ],
  },
  {
    id: '03',
    slug: 'settings',
    title: 'Feed Settings',
    subtitle: 'Pick the feed · tune the mix · choose who you follow',
    screen: ({ goToStep }) => (
      <FeedSettingsScreen
        onAddFollow={() => goToStep('add-follow')}
        onContinue={() => goToStep('feed-view')}
      />
    ),
    annotations: [
      {
        side: 'left', top: 19.5, category: 'ui',
        title: 'Per feed settings',
        description: 'Swap feeds via the dropdown - each feed has its own settings for who is followed for what and the types of content it contains.',
        tag: 'UX',
      },
      {
        side: 'left', top: 57, category: 'ui',
        title: 'Per-follow hashtag scoping',
        description: 'Each follow can be scoped to specific hashtags. "Follow The Guardian for #energy" is different from "follow everything The Guardian publishes".',
        tag: 'UX',
      },
      {
        side: 'right', top: 34.5, category: 'protocol',
        title: 'Follow records in the vault',
        description: 'Stored as [Maya DID → source (DID or RSS URL) + optional hashtags] — same shape Blog uses for its follow records. One follow record, many possible feeds.',
        tag: 'Backend',
      },
      {
        side: 'right', top: 87, category: 'protocol',
        title: 'Content mix is an independent axis',
        description: 'Sliders define the mix of content types the feed displays - applied at compose time, not at follow time.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '04',
    slug: 'add-follow',
    title: 'Find to follow',
    subtitle: 'Browse contacts, public profiles, blogs and external RSS',
    screen: ({ goToStep }) => (
      <AddFollowScreen onBack={() => goToStep('settings')} />
    ),
    annotations: [
      {
        side: 'left', top: 28, category: 'ui',
        title: 'Search for sources to follow',
        description: "Contacts filters Maya's PNM vault instantly. Web hits external indexes — type a query (try permaculture or co-ops) and tap Go.",
        tag: 'UX',
      },
      {
        side: 'left', top: 72, category: 'ui',
        title: 'Hashtag scoping at follow time',
        description: 'Tapping Follow opens a popup with options to follow all posts, or scope the follow to specific hashtags.',
        tag: 'UX',
      },
      {
        side: 'right', top: 28, category: 'protocol',
        title: 'Contacts are local, web is network',
        description: "Contacts live in the PNM vault — instant filter. Web searches fire a query at Murmurations (PLANET profiles + FP blogs) and FeedSearch.dev / Feedly (RSS).",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '05',
    slug: 'feed-view',
    title: 'Maya\'s feed',
    subtitle: 'Jonny\'s post lands here because Maya followed him for #regenerative',
    screen: ({ goToStep }) => <FeedViewScreen onEdit={() => goToStep('settings')} />,
    annotations: [
      {
        side: 'left', top: 15, category: 'ui',
        title: 'Switch feeds from the dropdown',
        description: 'Same screen, four contexts. Flipping to Co-op, News or Local re-composes the post list using that feed\'s settings.',
        tag: 'UX',
      },
      {
        side: 'left', top: 58, category: 'ui',
        title: 'Verified badges carry across',
        description: 'Posts from PLANET sources keep their verified badge. RSS posts show as RSS — Maya can always see where a post came from.',
        tag: 'UX',
      },
      {
        side: 'right', top: 32, category: 'ui',
        title: 'Jonny\'s post is here for a reason',
        description: 'Maya followed Jonny for #regenerative in step 08 of the Blog demo. That follow record is what put this post in this feed.',
        tag: 'UX',
      },
      {
        side: 'right', top: 78, category: 'protocol',
        title: 'Composed client-side',
        description: "The feed is assembled on Maya's device from her follow records and the posts each source has published. Nothing is ranked for her by a third party.",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '06',
    slug: 'post-view',
    title: "Read & share a post",
    subtitle: "Jonny's community garden post · share as a recommendation",
    screen: ({ goToStep }) => <FeedPostViewScreen onBack={() => goToStep('feed-view')} />,
    annotations: [
      {
        side: 'left', top: 22, category: 'ui',
        title: 'Full post in feed context',
        description: 'Tapping a post in the feed opens the full reader view. Same DID-verified content Maya would see on Jonny\'s blog.',
        tag: 'UX',
      },
      {
        side: 'left', top: 78, category: 'ui',
        title: 'Share as recommendation',
        description: 'Share opens a popup where Maya picks which trust profiles to recommend the post to. Multi-select — she can pick Friends and Community at once.',
        tag: 'UX',
      },
      {
        side: 'right', top: 32, category: 'protocol',
        title: 'Recommendations are signed events',
        description: "Maya's recommendation is a DID-signed event referencing Jonny's post. Each selected contact receives it into their vault and into the Feed app on their device.",
        tag: 'Backend',
      },
      {
        side: 'right', top: 78, category: 'protocol',
        title: 'Sharing distribution',
        description: "Sharing to a group — the contacts Maya has assigned to a trust profile — messages each of their Feed apps. The shared post enters their feed if they have recommendations turned on.",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '07',
    slug: 'feedback',
    title: '',
    subtitle: '',
    screen: <FeedbackScreen />,
    annotations: [],
    fullPage: true,
  },
];

const FeedsDemoPage = () => {
  return (
    <DemoPageShell
      title="Feeds"
      subtitle="Build your own algorithm"
      basePath="/demo/feeds"
      steps={steps}
    />
  );
};

export default FeedsDemoPage;
