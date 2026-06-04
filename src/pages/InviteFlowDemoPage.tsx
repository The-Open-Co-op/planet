import { DemoPageShell } from '@/components/demo/DemoPageShell';
import type { DemoStep } from '@/components/demo/DemoPageShell';

import { EmptyContactsScreen } from '@/components/onboarding/pwa/EmptyContactsScreen';
import { FeedbackScreen } from '@/components/onboarding/FeedbackScreen';

import {
  PickRecipientScreen,
  iosPickerDefaultAnnotations,
} from '@/components/onboarding/pwa-invite/PickRecipientScreen';
import { InviteAsScreen } from '@/components/onboarding/pwa-invite/InviteAsScreen';
import { ShareSheetScreen } from '@/components/onboarding/pwa-invite/ShareSheetScreen';
import { ComposeMessageScreen } from '@/components/onboarding/pwa-invite/ComposeMessageScreen';
import { InviteDeliveryScreen } from '@/components/onboarding/pwa-invite/InviteDeliveryScreen';
import { InviteContactsScreen } from '@/components/onboarding/pwa-invite/InviteContactsScreen';

const steps: DemoStep[] = [
  {
    id: '01',
    slug: 'contacts',
    title: 'Contacts',
    subtitle: 'The starting point — invite-only network, no contacts to import',
    screen: <EmptyContactsScreen />,
    annotations: [
      {
        side: 'left', top: 70, category: 'ui',
        title: 'Two ways to invite',
        description: 'Tap the blue "Invite someone you trust" button or the + icon in the header — both lead into the invite flow.',
        tag: 'UX',
      },
      {
        side: 'right', top: 35, category: 'protocol',
        title: 'Quality over quantity, by design',
        description: 'No bulk import. The only contact in Jonny\'s vault is Sarah (his inviter). New contacts arrive one at a time, by deliberate invite.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '02',
    slug: 'pick-recipient',
    title: 'Pick the recipient',
    subtitle: 'Android: Contact Picker · iPhone: type a first name',
    screen: ({ goToStep, setDynamicAnnotations }) => (
      <PickRecipientScreen onContinue={() => goToStep('invite-as')} setDynamicAnnotations={setDynamicAnnotations} />
    ),
    annotations: iosPickerDefaultAnnotations,
  },
  {
    id: '03',
    slug: 'invite-as',
    title: 'Invite as',
    subtitle: 'Pick which of your profiles the new member connects to',
    screen: ({ goToStep }) => <InviteAsScreen onContinue={() => goToStep('share')} />,
    annotations: [
      {
        side: 'left', top: 30, category: 'ui',
        title: 'Invite as one of your profiles',
        description: 'Jonny picks from the Trust Profiles he has already set up — Public, Family, Friends, Business… Profiles are defined, and can be edited, via Contacts.',
        tag: 'UX',
      },
      {
        side: 'right', top: 35, category: 'protocol',
        title: 'Profile bound to the invite',
        description: 'The chosen Trust Profile is attached to the invite token. When Mike accepts, the R-DID connection is anchored to this profile — and its sharing settings govern what flows to him from day one.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '04',
    slug: 'share',
    title: 'Share via OS share sheet',
    subtitle: 'PLANET hands off to the invitee\'s preferred channel',
    screen: ({ goToStep }) => <ShareSheetScreen onSelect={() => goToStep('compose')} />,
    annotations: [
      {
        side: 'left', top: 22, category: 'ui',
        title: 'Personalised OG preview',
        description: 'The link unfurls in WhatsApp, iMessage, etc. with a custom preview featuring Jonny\'s avatar from the Profile he selected on the previous step and PLANET branding.',
        tag: 'UX',
      },
      {
        side: 'right', top: 25, category: 'protocol',
        title: 'Single-use link, server-side context',
        description: 'planetnetwork.app/j/x7k2m is a single-use shortlink. Server holds the invite payload (inviter, invitee name, OG image) for 7 days.',
        tag: 'Backend',
      },
      {
        side: 'left', top: 78, category: 'ui',
        title: 'Native share sheet',
        description: 'Web Share API opens the device\'s own share sheet. The user picks WhatsApp, iMessage, Signal, Mail — whatever they normally use to message Mike.',
        tag: 'UX',
      },
      {
        side: 'right', top: 82, category: 'protocol',
        title: 'Web Share API + clipboard fallback',
        description: 'navigator.share() on mobile. Desktop browsers fall back to Copy link (clipboard). PLANET never sees which channel was chosen — the OS handles delivery.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '05',
    slug: 'compose',
    title: 'Compose & edit',
    subtitle: 'The chosen app opens with the invite prefilled — Jonny can edit before sending',
    screen: ({ goToStep }) => <ComposeMessageScreen onSend={() => goToStep('delivery')} />,
    annotations: [
      {
        side: 'left', top: 30, category: 'ui',
        title: 'Edit before you send',
        description: 'The messaging app opens with a default invite message and the personalised link preview prefilled. Jonny can reword it however he likes — make it personal to Mike — then hit send.',
        tag: 'UX',
      },
      {
        side: 'right', top: 40, category: 'protocol',
        title: 'Nothing sent until Jonny sends',
        description: 'PLANET only generated the link and a suggested message. The actual message lives in Jonny\'s own messaging app — he edits and sends it himself, over his channel. PLANET never sees the conversation.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '06',
    slug: 'delivery',
    title: 'Delivered',
    subtitle: 'Mike receives the message in his preferred channel',
    screen: <InviteDeliveryScreen />,
    annotations: [
      {
        side: 'left', top: 30, category: 'ui',
        title: 'Familiar channel, trusted sender',
        description: 'The link arrives via the same channel Mike already uses to talk to Jonny — friction-free and credible.',
        tag: 'UX',
      },
      {
        side: 'right', top: 55, category: 'protocol',
        title: 'OG preview rendered server-side',
        description: 'WhatsApp\'s servers fetch the OG image and metadata when the link is sent.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '07',
    slug: 'pending',
    title: 'Awaiting connection',
    subtitle: 'Mike appears in Jonny\'s contacts, dimmed until he joins',
    screen: <InviteContactsScreen state="sent" />,
    annotations: [
      {
        side: 'left', top: 45, category: 'ui',
        title: 'Pending contact',
        description: 'Mike appears dimmed and marked "awaiting connection". Once he joins and accepts, the connection goes live.',
        tag: 'UX',
      },
      {
        side: 'right', top: 50, category: 'protocol',
        title: 'Local pending entry',
        description: 'Jonny\'s vault stores a placeholder contact bound to the invite token. No R-DID exchange yet — that happens after Mike joins and accepts.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '08',
    slug: 'accepted',
    title: 'Connected',
    subtitle: 'Mike has joined and confirmed the connection',
    screen: <InviteContactsScreen state="accepted" />,
    annotations: [
      {
        side: 'left', top: 45, category: 'ui',
        title: 'Connection live',
        description: 'Mike\'s row turns full-colour. Jonny and Mike can now chat end-to-end encrypted and vouch for each other.',
        tag: 'UX',
      },
      {
        side: 'right', top: 50, category: 'protocol',
        title: 'R-DIDs exchanged',
        description: 'When Mike completed onboarding and accepted the connection, his client and Jonny\'s exchanged R-DIDs over DIDComm. The placeholder contact is now anchored to Mike\'s real DID; the invite token is consumed.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '09',
    slug: 'feedback',
    title: '',
    subtitle: '',
    screen: <FeedbackScreen />,
    annotations: [],
    fullPage: true,
  },
];

const InviteFlowDemoPage = () => {
  return (
    <DemoPageShell
      title="Invite Flow"
      subtitle="One careful invite at a time"
      basePath="/demo/invite-flow"
      steps={steps}
    />
  );
};

export default InviteFlowDemoPage;
