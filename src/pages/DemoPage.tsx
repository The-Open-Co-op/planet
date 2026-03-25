import { DemoPageShell } from '@/components/demo/DemoPageShell';
import type { DemoStep } from '@/components/demo/DemoPageShell';

// Onboarding screens
import { InviteReceivedScreen } from '@/components/onboarding/InviteReceivedScreen';
import { AppStoreScreen } from '@/components/onboarding/AppStoreScreen';
import { WelcomeScreen } from '@/components/onboarding/WelcomeScreen';
import { RecoveryPhraseScreen } from '@/components/onboarding/RecoveryPhraseScreen';
import { ChatScreen } from '@/components/onboarding/ChatScreen';
import { ImportScreen } from '@/components/onboarding/ImportScreen';
import { ContactsOverviewScreen } from '@/components/onboarding/ContactsOverviewScreen';
import { ProfilesScreen } from '@/components/onboarding/ProfilesScreen';
import { FullContactsScreen } from '@/components/onboarding/FullContactsScreen';
import { FeedbackScreen } from '@/components/onboarding/FeedbackScreen';

const steps: DemoStep[] = [
  {
    id: '01',
    slug: 'invite',
    title: 'Invite Received',
    subtitle: 'Recipient receives a message from someone they know',
    screen: <InviteReceivedScreen />,
    annotations: [
      {
        side: 'left', top: 20, category: 'ui',
        title: 'Familiar channel',
        description: 'Invite arrives in WhatsApp, iMessage, or email — from someone they already trust.',
        tag: 'UX',
      },
      {
        side: 'left', top: 65, category: 'ui',
        title: 'OG preview',
        description: "Link preview shows PLANET branding with inviter's photo and personalised text to create trust.",
        tag: 'UX',
      },
      {
        side: 'right', top: 75, category: 'protocol',
        title: 'Smart redirect & deferred deep link',
        description: 'If PLANET is installed, Universal Links open the app directly. If not, the URL stores the invite payload server-side and redirects to the app store. Single-use link (planetnetwork.app/j/xxx), context retained 7 days. No third-party dependency.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '02',
    slug: 'appstore',
    title: 'App Store',
    subtitle: 'Store listing sells the vision, not features',
    screen: <AppStoreScreen />,
    annotations: [
      {
        side: 'left', top: 40, category: 'ui',
        title: 'App Store',
        description: 'Vision first — screenshots sell the vision, not features.',
        tag: 'UX',
      },
    ],
  },
  {
    id: '03',
    slug: 'welcome',
    title: 'Welcome',
    subtitle: 'One screen, zero jargon',
    screen: ({ goToStep }) => <WelcomeScreen onConnect={() => goToStep('recovery')} />,
    annotations: [
      {
        side: 'right', top: 12, category: 'protocol',
        title: 'Deep link resolved',
        description: 'Invite context (inviter, invitee name, type) resolved on first open to deliver a personalised welcome.',
        tag: 'Backend',
      },
      {
        side: 'left', top: 48, category: 'ui',
        title: 'Values-led governance',
        description: 'Commitment checkbox requires agreement with The Open Co-op principles.',
        tag: 'Governance',
      },
      {
        side: 'left', top: 80, category: 'ui',
        title: 'Pre-filled name',
        description: 'First name from invite context. Editable.',
        tag: 'UX',
      },
      {
        side: 'left', top: 90, category: 'ui',
        title: 'Contextual CTA',
        description: 'To make the action personal.',
        tag: 'UX',
      },
    ],
  },
  {
    id: '04',
    slug: 'recovery',
    title: 'Recovery phrase',
    subtitle: 'Secure the identity — mnemonic backup, verification, and biometric lock',
    screen: ({ goToStep, setDynamicAnnotations }) => <RecoveryPhraseScreen onComplete={() => goToStep('chat')} setDynamicAnnotations={setDynamicAnnotations} />,
    annotations: [
      {
        side: 'left', top: 30, category: 'ui',
        title: 'Write it down',
        description: 'The user must write the recovery phrase down by hand. Screenshots and copy/paste are disabled.',
        tag: 'UX',
      },
      {
        side: 'right', top: 45, category: 'protocol',
        title: 'Key generation',
        description: 'Derive master seed using BIP-32 key derivation. Create initial key hierarchy: Ed25519 signing keys + X25519 encryption keys. Initialize sovereign wallet (encrypted local storage). Pre-generate first derived key pairs for DID creation.',
        tag: 'Backend',
      },
      {
        side: 'right', top: 80, category: 'protocol',
        title: 'Default to PLANET VTA',
        description: "PLANET's VTA is selected automatically in the background and used until user selects otherwise in Vault.",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '05',
    slug: 'chat',
    title: 'The payoff',
    subtitle: 'Onboarding directly to personal chat creates stickiness',
    screen: ({ goToStep }) => <ChatScreen onImport={() => goToStep('import')} />,
    annotations: [
      {
        side: 'right', top: 12, category: 'ui',
        title: 'E2E encrypted',
        description: 'Subtle lock icon — encryption is the default.',
        tag: 'UX',
      },
      {
        side: 'left', top: 35, category: 'protocol',
        title: 'Mutual R-DIDs Exchanged',
        description: 'Connection credentials created in the background during setup. Both parties now hold R-DIDs to establish the DIDComm channel.',
        tag: 'Backend',
      },
      {
        side: 'right', top: 32, category: 'ui',
        title: 'Suggested message',
        description: "This message is pre-filled to reduce friction. If they get a reply, they'll come back — this is the retention moment.",
        tag: 'Growth',
      },
    ],
  },
  {
    id: '06',
    slug: 'import',
    title: 'Import Contacts',
    subtitle: 'User imports contacts to start building their network',
    screen: ({ goToStep }) => <ImportScreen onImport={() => goToStep('contacts')} />,
    annotations: [
      {
        side: 'left', top: 25, category: 'ui',
        title: 'Requests access',
        description: 'Asks permission to access your phone contacts. Contacts are imported into your encrypted vault.',
        tag: 'UX',
      },
      {
        side: 'right', top: 42, category: 'protocol',
        title: 'Gmail & LinkedIn importers',
        description: 'Forthcoming V2 features. OAuth-based import with no credentials stored.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '07',
    slug: 'contacts',
    title: 'Contacts Imported',
    subtitle: 'Contacts imported and ready to organise into Trust Profiles',
    screen: ({ goToStep }) => <ContactsOverviewScreen onSetupProfiles={() => goToStep('profiles')} />,
    annotations: [
      {
        side: 'left', top: 45, category: 'ui',
        title: 'Familiar layout',
        description: 'Standard contacts list with search. Preview of familiar Contacts layout indicates forthcoming functionality.',
        tag: 'UX',
      },
      {
        side: 'right', top: 75, category: 'protocol',
        title: 'Encrypted vault',
        description: 'Contacts stored locally in an encrypted personal vault. Identity anchored to the DID generated at onboarding.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '08',
    slug: 'profiles',
    title: 'My Profiles',
    subtitle: 'Trust Profiles pre-filled with data gathered during import',
    screen: ({ goToStep }) => <ProfilesScreen onDone={() => goToStep('vouching')} />,
    annotations: [
      {
        side: 'left', top: 15, category: 'ui',
        title: 'Trust Profile selector',
        description: 'Switch between profiles — each controls what a group of contacts can see.',
        tag: 'UX',
      },
      {
        side: 'right', top: 40, category: 'ui',
        title: 'Pre-filled from import',
        description: 'Details seeded from the contacts import so the user starts with pre-filled profiles.',
        tag: 'UX',
      },
      {
        side: 'left', top: 78, category: 'ui',
        title: 'Sharing settings',
        description: 'Granular control over location, posts, photos, calendar — per profile. Defaults set sensibly.',
        tag: 'UX',
        pointDown: true,
      },
      {
        side: 'right', top: 80, category: 'protocol',
        title: 'Import seeds profiles',
        description: 'The import gathers as much detail as it can from the users vCard to pre-populate profile fields. Users just review and adjust.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '09',
    slug: 'vouching',
    title: 'Network building',
    subtitle: 'Contacts view, ready to invite and vouch',
    screen: ({ setDynamicAnnotations }) => <FullContactsScreen setDynamicAnnotations={setDynamicAnnotations} />,
    annotations: [
      {
        side: 'left', top: 30, category: 'ui',
        title: 'My Profiles',
        description: 'Trust Profiles now visible at the top of contacts. Tap to view and edit.',
        tag: 'UX',
      },
      {
        side: 'right', top: 44, category: 'ui',
        title: 'Connect, Chat & Vouch',
        description: 'Alexander is a PLANET member — Jonny can send him a connection request. Amanda is already connected, so Jonny can chat with her and send Vouches. Tap the contacts to try it out.',
        tag: 'Growth',
      },
      {
        side: 'left', top: 58, category: 'ui',
        title: 'Invite',
        description: 'Benjamin is not a PLANET member yet, Jonny can invite him to join.',
        tag: 'UX',
      },
    ],
  },
  {
    id: '10',
    slug: 'feedback',
    title: '',
    subtitle: '',
    screen: <FeedbackScreen />,
    annotations: [],
    fullPage: true,
  },
];

const DemoPage = () => {
  return (
    <DemoPageShell
      title="Onboarding"
      subtitle="From invite to first connections"
      basePath="/demo/onboarding"
      steps={steps}
    />
  );
};

export default DemoPage;
