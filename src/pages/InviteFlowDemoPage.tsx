import { DemoPageShell } from '@/components/demo/DemoPageShell';
import type { DemoStep } from '@/components/demo/DemoPageShell';

import { EmptyContactsScreen } from '@/components/onboarding/pwa/EmptyContactsScreen';
import { FeedbackScreen } from '@/components/onboarding/FeedbackScreen';

import {
  PickRecipientScreen,
  iosPickerDefaultAnnotations,
} from '@/components/onboarding/pwa-invite/PickRecipientScreen';
import { ShareSheetScreen } from '@/components/onboarding/pwa-invite/ShareSheetScreen';
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
      <PickRecipientScreen onContinue={() => goToStep('share')} setDynamicAnnotations={setDynamicAnnotations} />
    ),
    annotations: iosPickerDefaultAnnotations,
  },
  {
    id: '03',
    slug: 'share',
    title: 'Share via OS share sheet',
    subtitle: 'PLANET hands off to the invitee\'s preferred channel',
    screen: ({ goToStep }) => <ShareSheetScreen onSelect={() => goToStep('delivery')} />,
    annotations: [
      {
        side: 'left', top: 22, category: 'ui',
        title: 'Personalised OG preview',
        description: 'The link unfurls in WhatsApp, iMessage, etc. with a custom preview featuring Jonny\'s avatar and PLANET branding.',
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
    id: '04',
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
    id: '05',
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
    id: '06',
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
    id: '07',
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
