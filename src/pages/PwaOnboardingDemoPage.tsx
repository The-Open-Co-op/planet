import { DemoPageShell } from '@/components/demo/DemoPageShell';
import type { DemoStep } from '@/components/demo/DemoPageShell';

// Reused screens
import { InviteReceivedScreen } from '@/components/onboarding/InviteReceivedScreen';
import { RecoveryPhraseScreen } from '@/components/onboarding/RecoveryPhraseScreen';
import { FeedbackScreen } from '@/components/onboarding/FeedbackScreen';

// PWA-flavoured screens
import { WebWelcomeScreen } from '@/components/onboarding/pwa/WebWelcomeScreen';
import { InstallPwaScreen, iosInstallAnnotations } from '@/components/onboarding/pwa/InstallPwaScreen';
import { PwaChatScreen } from '@/components/onboarding/pwa/PwaChatScreen';
import { PwaProfilesScreen } from '@/components/onboarding/pwa/PwaProfilesScreen';
import { EmptyContactsScreen } from '@/components/onboarding/pwa/EmptyContactsScreen';

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
        title: 'Single-use invite link',
        description: 'planetnetwork.app/j/xxx resolves a single-use token; context retained server-side for 7 days. No third-party dependency.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '02',
    slug: 'web-welcome',
    title: 'Web Welcome',
    subtitle: 'planet site greets the invited user — principles first, install next',
    screen: ({ goToStep }) => <WebWelcomeScreen onAgree={() => goToStep('install-pwa')} />,
    annotations: [
      {
        side: 'right', top: 12, category: 'protocol',
        title: 'Token resolved on landing',
        description: 'planetnetwork.app/j/xxx hits the planet site, server resolves the token and returns inviter + invitee context (Sarah → Jonny) for a personalised welcome.',
        tag: 'Backend',
      },
      {
        side: 'left', top: 30, category: 'ui',
        title: 'Greeted by name',
        description: 'No app to install yet — invitee meets the values story on a familiar website first.',
        tag: 'UX',
      },
      {
        side: 'left', top: 55, category: 'ui',
        title: 'Values-led governance',
        description: 'Commitment to The Open Co-op principles — required to continue. Link to read more.',
        tag: 'Governance',
      },
    ],
  },
  {
    id: '03',
    slug: 'install-pwa',
    title: 'Install PWA',
    subtitle: 'Add to Home Screen — no app store, no native binary',
    screen: ({ goToStep, setDynamicAnnotations }) => (
      <InstallPwaScreen onOpen={() => goToStep('chat')} setDynamicAnnotations={setDynamicAnnotations} />
    ),
    annotations: iosInstallAnnotations,
  },
  {
    id: '04',
    slug: 'chat',
    title: 'The payoff',
    subtitle: 'Land directly in the chat with the inviter',
    screen: ({ goToStep }) => <PwaChatScreen onNext={() => goToStep('secure-account')} />,
    annotations: [
      {
        side: 'left', top: 18, category: 'protocol',
        title: 'Invite context resolved',
        description: 'Token resolved server-side on first PWA launch — Jonny lands directly in the chat with Sarah. Token marked consumed; later launches open to the home screen.',
        tag: 'Backend',
      },
      {
        side: 'left', top: 60, category: 'protocol',
        title: 'Keys generated silently',
        description: 'Master seed (BIP-32), Ed25519 signing keys, X25519 encryption keys, and the first R-DID pair are all generated in the background on PWA launch. Mutual R-DIDs exchanged with Sarah so the DIDComm channel is live before Jonny sees the screen.',
        tag: 'Backend',
      },
      {
        side: 'right', top: 12, category: 'ui',
        title: 'E2E encrypted by default',
        description: 'Subtle lock icon — encryption is the default using Ed25519/X25519, not a feature to toggle.',
        tag: 'UX',
      },
      {
        side: 'right', top: 32, category: 'ui',
        title: 'Suggested message',
        description: "Pre-filled in the message field to reduce friction, but can be editted or deleted. If they get a reply, they'll come back — this is the retention moment.",
        tag: 'UX',
      },
    ],
  },
  {
    id: '05',
    slug: 'secure-account',
    title: 'Secure your account',
    subtitle: 'Recovery phrase — back up the keys already in use',
    screen: ({ goToStep, setDynamicAnnotations }) => (
      <RecoveryPhraseScreen onComplete={() => goToStep('profiles')} setDynamicAnnotations={setDynamicAnnotations} />
    ),
    annotations: [
      {
        side: 'left', top: 30, category: 'ui',
        title: 'Write it down',
        description: 'Recovery phrase must be written down by hand. Screenshots and copy/paste are disabled.',
        tag: 'UX',
      },
      {
        side: 'right', top: 45, category: 'protocol',
        title: 'Backing up existing keys',
        description: 'Keys were generated silently on PWA launch so chat could work immediately. The recovery phrase is the user-facing backup of that already-active master seed — reframed as "secure your account" rather than "set up your identity."',
        tag: 'Backend',
      },
      {
        side: 'right', top: 80, category: 'protocol',
        title: 'Default to PLANET VTA',
        description: "PLANET's VTA is selected automatically in the background and used until the user picks otherwise in Vault.",
        tag: 'Backend',
      },
    ],
  },
  {
    id: '06',
    slug: 'profiles',
    title: 'My Profiles',
    subtitle: 'Trust profiles — set up from a vCard or manually',
    screen: ({ goToStep }) => <PwaProfilesScreen onDone={() => goToStep('contacts')} />,
    annotations: [
      {
        side: 'left', top: 15, category: 'ui',
        title: 'Trust Profile selector',
        description: 'Switch between profiles — each controls what a group of contacts can see.',
        tag: 'UX',
      },
      {
        side: 'right', top: 10, category: 'protocol',
        title: 'vCard import (own card only)',
        description: 'On Android Chrome the Contact Picker API can return the user\'s own vCard. On iOS the Contact Picker API requires an experimental Safari flag, so the primary path is .vcf upload (Share My Card → Files) or manual entry.',
        tag: 'Backend',
      },
      {
        side: 'right', top: 80, category: 'ui',
        title: 'Sharing settings',
        description: 'Granular control over location, posts, photos, calendar — per profile. Defaults set sensibly.',
        tag: 'UX',
      },
    ],
  },
  {
    id: '07',
    slug: 'contacts',
    title: 'Contacts',
    subtitle: 'Empty by design — invite people you truly trust',
    screen: <EmptyContactsScreen />,
    annotations: [
      {
        side: 'left', top: 25, category: 'ui',
        title: 'Empty by design',
        description: 'No mass import. A trust network grows one careful invite at a time.',
        tag: 'UX',
      },
      {
        side: 'right', top: 36, category: 'protocol',
        title: 'No bulk contact upload',
        description: 'No phonebook scrape, no Gmail OAuth at onboarding. The only contact in the vault so far is Sarah (the inviter), added when her R-DID was exchanged.',
        tag: 'Backend',
      },
      {
        side: 'left', top: 70, category: 'ui',
        title: 'Quality over quantity',
        description: 'Onboarding nudges the user to invite people they truly trust — highlighting PLANET as a trust-based network.',
        tag: 'Growth',
      },
      {
        side: 'right', top: 88, category: 'protocol',
        title: 'Invite flow in separate demo',
        description: 'The full one-by-one invite mechanic is covered in a separate demo. This screen just shows the entry point.',
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

const PwaOnboardingDemoPage = () => {
  return (
    <DemoPageShell
      title="PWA Onboarding"
      subtitle="From invite to first connections — invite-only, install-as-PWA"
      basePath="/demo/pwa-onboarding"
      steps={steps}
    />
  );
};

export default PwaOnboardingDemoPage;
