import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, FormControlLabel, Checkbox, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight, DesktopWindows } from '@mui/icons-material';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { Annotation } from '@/components/demo/Annotation';
import type { AnnotationItem } from '@/components/demo/Annotation';

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
import { EmojiVRCScreen } from '@/components/onboarding/EmojiVRCScreen';
import { GroupChatScreen } from '@/components/onboarding/GroupChatScreen';
import { VaultScreen } from '@/components/onboarding/VaultScreen';
import { AppStoreCardScreen } from '@/components/onboarding/AppStoreDemoScreen';
import { AlertsScreen } from '@/components/onboarding/AlertsScreen';
import { FeedbackScreen } from '@/components/onboarding/FeedbackScreen';

type AnnotationWithCategory = AnnotationItem & { category: 'ui' | 'protocol' };

interface StepHelpers {
  goToStep: (slug: string) => void;
  setDynamicAnnotations: (annotations: AnnotationWithCategory[] | null) => void;
}

interface DemoStep {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  screen: React.ReactNode | ((helpers: StepHelpers) => React.ReactNode);
  annotations: AnnotationWithCategory[];
}

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
    subtitle: 'Contacts with My Profiles, ready to invite and vouch',
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
        description: 'Alexander and Amanda are already PLANET members. Jonny can connect with them to chat and send Vouches.',
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
    slug: 'reactions',
    title: 'Chat reactions',
    subtitle: 'Tap a message to react',
    screen: <EmojiVRCScreen />,
    annotations: [
      {
        side: 'left', top: 20, category: 'ui',
        title: 'Chat reactions',
        description: 'Tap any received message to open the reaction picker. Six emojis, each with a specific meaning. Reactions create trust signals - use them wisely.',
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
        title: 'Verifiable Endorsement Credentials',
        description: 'Each reaction issues a Verifiable Endorsement Credential to the message author — building trust signals over time.',
        tag: 'Backend',
      },
    ],
  },
  {
    id: '11',
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
    id: '12',
    slug: 'vault',
    title: 'Vault',
    subtitle: 'Encrypted personal data vault — identity, credentials, and settings',
    screen: () => <VaultScreen />,
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
    id: '13',
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
    id: '14',
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
    id: '15',
    slug: 'feedback',
    title: '',
    subtitle: '',
    screen: <FeedbackScreen />,
    annotations: [],
  },
];

const DemoPage = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const { step: stepSlug } = useParams<{ step?: string }>();
  const navigate = useNavigate();
  const [showUI, setShowUI] = useState(true);
  const [showProtocol, setShowProtocol] = useState(true);

  if (isMobile) {
    return (
      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#FAFBFC',
        px: 4,
        textAlign: 'center',
        gap: 3,
      }}>
        <DesktopWindows sx={{ fontSize: 64, color: 'text.secondary' }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Best viewed on desktop
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This interactive demo requires a larger screen. Please open it on a desktop or laptop browser.
        </Typography>
      </Box>
    );
  }

  // Derive initial index from URL, then manage via state
  const initialIndex = stepSlug
    ? Math.max(0, steps.findIndex(s => s.slug === stepSlug))
    : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [dynamicAnnotations, setDynamicAnnotations] = useState<AnnotationWithCategory[] | null>(null);

  // Sync state when URL changes externally (e.g. direct navigation)
  useEffect(() => {
    if (stepSlug) {
      const idx = steps.findIndex(s => s.slug === stepSlug);
      if (idx >= 0 && idx !== currentIndex) {
        setCurrentIndex(idx);
      }
    }
  }, [stepSlug]);

  const step = steps[currentIndex];

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setDynamicAnnotations(null);
    navigate(`/demo/${steps[index].slug}`, { replace: true });
  };
  const goBack = () => { if (currentIndex > 0) goTo(currentIndex - 1); };
  const goForward = () => { if (currentIndex < steps.length - 1) goTo(currentIndex + 1); };

  const activeAnnotations = dynamicAnnotations || step.annotations;
  const visibleAnnotations = activeAnnotations.filter(a =>
    (a.category === 'ui' && showUI) || (a.category === 'protocol' && showProtocol)
  );

  // Feedback screen is full page, not in phone frame
  if (step.slug === 'feedback') {
    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1 }}>
          {typeof step.screen === 'function' ? step.screen({ goToStep: () => {}, setDynamicAnnotations }) : step.screen}
        </Box>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 2,
          py: 1.5,
          bgcolor: 'background.default',
          flexShrink: 0,
        }}>
          <IconButton
            onClick={goBack}
            size="small"
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <ChevronLeft />
          </IconButton>
          <Box sx={{ display: 'flex', gap: 0.75 }}>
            {steps.map((s, i) => (
              <Box
                key={s.id}
                onClick={() => goTo(i)}
                sx={{
                  width: i === currentIndex ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: i === currentIndex ? 'primary.main' : 'grey.300',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </Box>
          <IconButton
            onClick={goForward}
            disabled
            size="small"
            sx={{ border: '1px solid', borderColor: 'divider' }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      height: '100vh',
      bgcolor: '#FAFBFC',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Top bar */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
      }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
              PLANET Demo
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Onboarding and main PNM app features
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700 }}>
              {step.id}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {step.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              — {step.subtitle}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControlLabel
            control={<Checkbox size="small" checked={showUI} onChange={(e) => setShowUI(e.target.checked)} sx={{ color: '#0066CC', '&.Mui-checked': { color: '#0066CC' } }} />}
            label={<Typography variant="caption" sx={{ color: '#0066CC', fontWeight: 600 }}>UI Annotations</Typography>}
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={<Checkbox size="small" checked={showProtocol} onChange={(e) => setShowProtocol(e.target.checked)} sx={{ color: '#660000', '&.Mui-checked': { color: '#660000' } }} />}
            label={<Typography variant="caption" sx={{ color: '#660000', fontWeight: 600 }}>Backend Annotations</Typography>}
            sx={{ m: 0 }}
          />
        </Box>
      </Box>

      {/* Phone + Annotations */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 0,
      }}>
        <Box sx={{ position: 'relative' }}>
          <PhoneFrame key={step.slug}>
            {typeof step.screen === 'function' ? step.screen({ goToStep: (slug) => goTo(steps.findIndex(s => s.slug === slug)), setDynamicAnnotations }) : step.screen}
          </PhoneFrame>

          {visibleAnnotations.map((annotation, i) => (
            <Annotation key={`${step.id}-${i}`} annotation={annotation} category={annotation.category} />
          ))}
        </Box>
      </Box>

      {/* Bottom nav */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: 1.5,
        borderTop: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
      }}>
        <IconButton
          onClick={goBack}
          disabled={currentIndex === 0}
          size="small"
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <ChevronLeft />
        </IconButton>

        <Box sx={{ display: 'flex', gap: 0.75 }}>
          {steps.map((s, i) => (
            <Box
              key={s.id}
              onClick={() => goTo(i)}
              sx={{
                width: i === currentIndex ? 20 : 8,
                height: 8,
                borderRadius: 4,
                bgcolor: i === currentIndex ? 'primary.main' : 'grey.300',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </Box>

        <IconButton
          onClick={goForward}
          disabled={currentIndex === steps.length - 1}
          size="small"
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default DemoPage;
