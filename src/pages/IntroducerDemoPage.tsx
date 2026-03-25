import { DemoPageShell } from '@/components/demo/DemoPageShell';
import type { DemoStep } from '@/components/demo/DemoPageShell';

import { DashboardScreen } from '@/components/introducer-demo/DashboardScreen';
import { ComposeScreen } from '@/components/introducer-demo/ComposeScreen';
import { ReceiveScreen } from '@/components/introducer-demo/ReceiveScreen';
import { IntroGroupChatScreen } from '@/components/introducer-demo/IntroGroupChatScreen';
import { MarkValuableScreen } from '@/components/introducer-demo/MarkValuableScreen';
import { RippleScreen } from '@/components/introducer-demo/RippleScreen';
import { FeedbackScreen } from '@/components/onboarding/FeedbackScreen';

const steps: DemoStep[] = [
  {
    id: '01',
    slug: 'dashboard',
    title: 'Introducer Dashboard',
    subtitle: 'Overview of all introductions, stats, and outcomes',
    screen: <DashboardScreen />,
    annotations: [
      {
        side: 'right', top: 17, category: 'ui',
        title: 'Motivation',
        description: 'Seeing stats and ripple effects incentivises more introductions.',
        tag: 'UX',
      },
      {
        side: 'left', top: 50, category: 'ui',
        title: 'At-a-glance overview',
        description: 'The dashboard gives the introducer a complete view of their introduction activity — statuses, outcomes, and ripple effects.',
        tag: 'UX',
      },
      {
        side: 'right', top: 60, category: 'protocol',
        title: 'VEC issuance',
        description: 'Three actions issue new VECs from the introduced to the introducer: accepting the introduction, marking it as valuable, and when their own downstream introductions generate ripples.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '02',
    slug: 'compose',
    title: 'Compose Introduction',
    subtitle: 'Search contacts, add profile cards, and write context',
    screen: <ComposeScreen />,
    annotations: [
      {
        side: 'left', top: 20, category: 'ui',
        title: 'Search & select',
        description: 'Search your contacts to find the people you want to introduce.',
        tag: 'UX',
      },
      {
        side: 'left', top: 70, category: 'ui',
        title: '@mention context',
        description: 'Freetext message with @mentions lets the introducer explain why this connection matters — context is everything.',
        tag: 'UX',
      },
      {
        side: 'right', top: 45, category: 'protocol',
        title: 'Connection requests',
        description: 'Sending an intro issues a 1-to-1 connection request between each introduced party — just as if they had requested to connect directly. The connection is not established until each party accepts via their alerts. Introductions default to each party\'s public profile until they assign a trust profile to the new connections.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '03',
    slug: 'receive',
    title: 'Introduction Alerts',
    subtitle: 'Introduced party sees details and chooses to accept or decline',
    screen: <ReceiveScreen />,
    annotations: [
      {
        side: 'left', top: 25, category: 'ui',
        title: 'Clear consent',
        description: 'The introduced party sees who is introducing them to who and can tap for more details before accepting. No automatic connections. Declining is private — only the introducer sees a generic \'not accepted\' status.',
        tag: 'UX',
      },
      {
        side: 'right', top: 25, category: 'protocol',
        title: 'Bilateral consent',
        description: 'Both introduced parties must independently accept before any connection is established. Accepting triggers a mutual DID exchange — if either party declines, no connection is made.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '04',
    slug: 'group-chat',
    title: 'Introduction Chat',
    subtitle: "Jonny's view — group chat with bow-out option",
    screen: <IntroGroupChatScreen />,
    annotations: [
      {
        side: 'left', top: 15, category: 'ui',
        title: "Jonny's view",
        description: "This is the introducer's perspective. Jonny is a full participant and can see the conversation develop.",
        tag: 'UX',
      },
      {
        side: 'right', top: 35, category: 'protocol',
        title: 'Group DIDComm channel',
        description: 'Three-party DIDComm channel with group encryption. Each member holds their own key pair for the group.',
        tag: 'Backend',
      },
      {
        side: 'left', top: 82, category: 'ui',
        title: 'Bow out',
        description: 'Only the introducer sees the option to step back. Bowing out leaves the chat but the Introduction VEC stays in their wallet.',
        tag: 'UX',
      },
    ],
  },
  {
    id: '05',
    slug: 'valuable',
    title: 'Mark as Valuable',
    subtitle: "Sarah's view — same chat, different options",
    screen: <MarkValuableScreen />,
    annotations: [
      {
        side: 'left', top: 15, category: 'ui',
        title: "Sarah's view",
        description: "This is an introduced party's perspective. The same group chat, but instead of 'bow out' they see the option to mark the introduction as valuable or dismiss.",
        tag: 'UX',
      },
      {
        side: 'left', top: 82, category: 'ui',
        title: 'Value signal',
        description: 'Introduced parties can mark an introduction as valuable at any time — a quality signal, not a quantity metric.',
        tag: 'UX',
      },
      {
        side: 'right', top: 82, category: 'protocol',
        title: 'Endorsement credential',
        description: "Marking as valuable issues a VEC to the introducer — a verifiable record of introduction quality that builds their reputation.",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '06',
    slug: 'ripple',
    title: 'Ripple Credential',
    subtitle: 'Second-order introductions recognised with ripple VECs',
    screen: <RippleScreen />,
    annotations: [
      {
        side: 'left', top: 27, category: 'ui',
        title: 'Network effects',
        description: 'Ripple VECs are only issued when the downstream introduction is also marked as valuable — not just from activity. Trust compounds through real outcomes.',
        tag: 'UX',
      },
      {
        side: 'right', top: 27, category: 'protocol',
        title: 'Ripple VEC',
        description: 'A Ripple VEC is issued to the original introducer when a downstream introduction is marked as valuable. It is a distinct VEC type — one degree only, no chaining.',
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

const IntroducerDemoPage = () => {
  return (
    <DemoPageShell
      title="Introducer Demo"
      subtitle="Introduction lifecycle from compose to ripple"
      basePath="/demo/introducer"
      steps={steps}
    />
  );
};

export default IntroducerDemoPage;
