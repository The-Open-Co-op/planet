import { DemoPageShell } from '@/components/demo/DemoPageShell';
import type { DemoStep } from '@/components/demo/DemoPageShell';

import { HomeScreen } from '@/components/onboarding/HomeScreen';
import { ContactsScreen } from '@/components/onboarding/ContactsScreen';
import { EmojiVRCScreen } from '@/components/onboarding/EmojiVRCScreen';
import { GroupChatScreen } from '@/components/onboarding/GroupChatScreen';
import { VaultScreen } from '@/components/onboarding/VaultScreen';
import { AppStoreCardScreen } from '@/components/onboarding/AppStoreDemoScreen';
import { AlertsScreen } from '@/components/onboarding/AlertsScreen';
import { FeedbackScreen } from '@/components/onboarding/FeedbackScreen';

const steps: DemoStep[] = [
  {
    id: '01',
    slug: 'home',
    title: 'Home',
    subtitle: 'The PLANET home screen',
    screen: ({ setDynamicAnnotations, goToStep, reportStep }) => <HomeScreen setDynamicAnnotations={setDynamicAnnotations} goToStep={goToStep} reportStep={reportStep} />,
    annotations: [
      {
        side: 'left', top: 30, category: 'ui',
        title: 'Home screen',
        description: 'These four apps come as default — Contacts, Import, Vault and Apps. Install more via the Apps store.',
        tag: 'UX',
      },
      {
        side: 'right', top: 55, category: 'protocol',
        title: 'Local-first',
        description: 'All data rendered from the local encrypted vault. The home screen works offline.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '02',
    slug: 'contacts',
    title: 'Contacts',
    subtitle: 'Your network — filter by relationship, see the Trust Profiles you connect through',
    screen: ({ goToStep }) => <ContactsScreen goToStep={goToStep} />,
    annotations: [
      {
        side: 'right', top: 18, category: 'ui',
        title: 'Filter by relationship',
        description: 'Filter the list by relationship type (Trust Profile). A dropdown scales better than tags once a member has many relationship types.',
        tag: 'UX',
      },
      {
        side: 'left', top: 45, category: 'ui',
        title: 'Trust Profiles at a glance',
        description: "Each contact shows the Trust Profile(s) you're connected through — Friends, Family, Business, Community — so the relationship is visible without opening the contact.",
        tag: 'UX',
      },
      {
        side: 'right', top: 70, category: 'protocol',
        title: 'Profiles from assignments',
        description: 'Pills are rendered from each contact\'s rCardAssignments — the Trust Profiles (RCards) assigned when the connection was accepted or vouched.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '03',
    slug: 'reactions',
    title: 'Chat reactions',
    subtitle: 'Tap a message to react',
    screen: <EmojiVRCScreen />,
    annotations: [
      {
        side: 'left', top: 20, category: 'ui',
        title: 'Co-opting reactions',
        description: 'An experimental idea: co-opt familiar emoji reactions to capture meaningful trust metrics. Each emoji has a specific meaning, turning casual behaviour into data that enriches the Decentralised Trust Graph.',
        tag: 'UX',
      },
      {
        side: 'right', top: 40, category: 'ui',
        title: 'Emoji meanings',
        description: '🧠 Wise/Clever\n❤️ Kind/Caring\n😂 Funny\n✅ Well done\n⚠️ Warning\n❌ Not good',
        tag: 'UX',
      },
      {
        side: 'left', top: 65, category: 'protocol',
        title: 'Lightweight VECs',
        description: 'Each reaction issues a very low-weight VEC — a micro-signal, not a serious endorsement. Vouches (built into the Contact view) are far weightier in the trust model. Emoji VECs add volume and texture to the trust graph without the gravity of a Vouch.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '04',
    slug: 'groups',
    title: 'Group Chat',
    subtitle: 'Create group chats — lightweight Verifiable Trust Communities',
    screen: <GroupChatScreen />,
    annotations: [
      {
        side: 'left', top: 25, category: 'ui',
        title: 'Chat groups',
        description: 'Work like standard chat groups but are actually lightweight Verifiable Trust Communities (VTCs).',
        tag: 'UX',
      },
      {
        side: 'right', top: 55, category: 'protocol',
        title: 'Trust anchor',
        description: 'The creator of a chat group becomes the first trust anchor of the Group (VTC) and can appoint others by making them admin. Chat groups bypass the Community Policies and Verification requirements of standard VTCs.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '05',
    slug: 'vault',
    title: 'Vault',
    subtitle: 'Encrypted personal data vault — identity, credentials, and settings',
    screen: ({ reportStep }) => <VaultScreen reportStep={reportStep} />,
    annotations: [
      {
        side: 'left', top: 25, category: 'ui',
        title: 'Encrypted local vault',
        description: "Data is stored in the members' encrypted local vault, anchored to their DID. In order for PLANET to continue to function if a device is offline members need a Verifiable Trust Agent (VTA). We assign members to the PLANET VTA by default to simplify onboarding.",
        tag: 'UX',
      },
      {
        side: 'right', top: 55, category: 'ui',
        title: 'Select your Verifiable Trust Agent provider',
        description: "Members can choose their Verifiable Trust Agent (VTA) and backup hosting provider and can switch providers at anytime. Members' identity and connections stay with them — they're in the app, not on the provider's servers.",
        tag: 'UX',
      },
    ],
  },
  {
    id: '06',
    slug: 'planet-apps',
    title: 'App Store',
    subtitle: 'Install additional apps to extend PLANET',
    screen: <AppStoreCardScreen />,
    annotations: [
      {
        side: 'left', top: 30, category: 'ui',
        title: 'Extensible platform',
        description: 'PLANET grows through installable apps. Members choose what they need — no bloatware.',
        tag: 'UX',
      },
      {
        side: 'right', top: 60, category: 'protocol',
        title: 'Sub-app architecture',
        description: 'Each app runs in a sandboxed context with access to shared hooks (useVRCs, useTrustProfiles).',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '07',
    slug: 'alerts',
    title: 'Alerts',
    subtitle: 'Vouches, connection requests, and system notifications',
    screen: <AlertsScreen />,
    annotations: [
      {
        side: 'left', top: 25, category: 'ui',
        title: 'Connection requests',
        description: 'When another PLANET member wants to connect, it appears here. Accepting exchanges R-DIDs and opens a DIDComm channel.',
        tag: 'UX',
      },
      {
        side: 'right', top: 50, category: 'ui',
        title: 'Vouches',
        description: 'Incoming Vouches from connected members. Tap to view details, then accept and assign to Trust Profiles.',
        tag: 'UX',
      },
      {
        side: 'left', top: 75, category: 'protocol',
        title: 'Credential inbox',
        description: 'Alerts act as a credential inbox — each vouch or connection request is a pending Verifiable Credential waiting to be accepted into the wallet.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '08',
    slug: 'feedback',
    title: '',
    subtitle: '',
    screen: <FeedbackScreen />,
    annotations: [],
    fullPage: true,
  },
];

const PnmDemoPage = () => {
  return (
    <DemoPageShell
      title="Main PNM Functionality"
      subtitle="Core features of the Personal Network Manager"
      basePath="/demo/pnm"
      steps={steps}
    />
  );
};

export default PnmDemoPage;
