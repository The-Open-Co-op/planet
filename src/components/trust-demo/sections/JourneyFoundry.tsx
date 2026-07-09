import { Box, Typography, Button } from '@mui/material';
import { Check, VerifiedUser } from '@mui/icons-material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { DesktopCard } from '@/components/trust-demo/DesktopCard';
import { AnnotationPair } from '@/components/trust-demo/InlineAnnotation';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import { CredentialCard } from '@/components/trust-demo/CredentialCard';
import { MobileWebScreen } from '@/components/trust-demo/MobileWebScreen';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';
import {
  SectionHeading,
  OrgValueLine,
  OC_BLUE,
  BlueLink,
} from '@/components/trust-demo/sectionKit';
import { LINKS, CREDENTIAL_ACCENT } from '@/components/trust-demo/trustDemoData';
import type { DemoCredential } from '@/components/trust-demo/trustDemoData';
import { NotificationItem } from '@/components/notifications/NotificationItem/NotificationItem';
import type { Notification } from '@/types/notification';

const stepLabelSx = {
  color: OC_BLUE,
  fontWeight: 700,
  display: 'block',
  mt: 5,
  mb: 1,
} as const;

const primaryBtnSx = {
  textTransform: 'none',
  fontWeight: 700,
  bgcolor: OC_BLUE,
  '&:hover': { bgcolor: '#0055AA' },
} as const;

const noop = () => {};
/** Same vouch icon the real Alerts screen uses. */
const vouchIcon = () => <VerifiedUser sx={{ fontSize: 18, color: '#0066CC' }} />;

/** Marcus's incoming vouches — rendered with the real Alerts NotificationItem card. */
const MARCUS_VOUCHES: Notification[] = [
  {
    id: 'vouch-priya',
    type: 'vouch',
    title: 'New vouch',
    message: 'Vouched for you — Foundry Worker Co-op application',
    fromUserName: 'Priya Kumar',
    targetUserId: 'marcus',
    isRead: false,
    isActionable: true,
    status: 'pending',
    metadata: { vouchId: 'vrc-priya' },
    createdAt: new Date('2024-06-01T10:00:00Z'),
    updatedAt: new Date('2024-06-01T10:00:00Z'),
  },
  {
    id: 'vouch-tom',
    type: 'vouch',
    title: 'New vouch',
    message: 'Vouched for you — Foundry Worker Co-op application',
    fromUserName: 'Tom Ellis',
    targetUserId: 'marcus',
    isRead: false,
    isActionable: true,
    status: 'pending',
    metadata: { vouchId: 'vrc-tom' },
    createdAt: new Date('2024-06-01T09:30:00Z'),
    updatedAt: new Date('2024-06-01T09:30:00Z'),
  },
];

const rawVc = (type: string, issuer: string, claim: Record<string, unknown>) => ({
  '@context': ['https://www.w3.org/ns/credentials/v2', 'https://firstperson.network/credentials/dtg/v1'],
  type: ['VerifiableCredential', type],
  issuer,
  credentialSubject: { id: 'did:key:z6MkMarcus...', ...claim },
  proof: { type: 'DataIntegrityProof', cryptosuite: 'eddsa-rdfc-2022', proofValue: 'z3FXQj...' },
});

/** What Marcus shares in his application — same card graphics as My Credentials. */
const MARCUS_SHARING: DemoCredential[] = [
  {
    id: 'm-vrc-priya',
    type: 'VRC',
    title: 'Priya Kumar (Foundry)',
    subtitle: 'Verifiable Relationship Credential',
    detail: '“I know Marcus and vouch for him as a trustworthy collaborator.”',
    signedBy: 'Priya Kumar',
    active: true,
    rawJson: rawVc('RelationshipCredential', 'did:key:z6MkPriya...', { relationshipType: 'vouch', context: 'Foundry Worker Co-op application' }),
  },
  {
    id: 'm-vrc-tom',
    type: 'VRC',
    title: 'Tom Ellis (Foundry)',
    subtitle: 'Verifiable Relationship Credential',
    detail: '“I worked alongside Marcus at Bristol Tech Co-op. Reliable and skilled.”',
    signedBy: 'Tom Ellis',
    active: true,
    rawJson: rawVc('RelationshipCredential', 'did:key:z6MkTom...', { relationshipType: 'vouch', context: 'Foundry Worker Co-op application' }),
  },
  {
    id: 'm-vmc-oc',
    type: 'VMC',
    title: 'The Open Co-op',
    subtitle: 'Verifiable Membership Credential',
    detail: 'Member since 2022',
    signedBy: 'The Open Co-op',
    active: true,
    rawJson: rawVc('MembershipCredential', 'did:web:open.coop', { membershipType: 'full', memberSince: '2022' }),
  },
  {
    id: 'm-vec-oc',
    type: 'VEC',
    title: 'The Open Co-op',
    subtitle: 'Verifiable Endorsement Credential',
    detail: '“Strong systems thinker, great to work with.”',
    signedBy: 'The Open Co-op member',
    active: true,
    rawJson: rawVc('EndorsementCredential', 'did:key:z6MkOCmember...', { endorsement: 'Strong systems thinker, great to work with' }),
  },
  {
    id: 'm-vrc-network',
    type: 'VRC',
    title: '6 mutual relationships',
    subtitle: 'Verifiable Relationship Credentials',
    detail: 'Across the wider cooperative network',
    signedBy: 'Various members',
    active: true,
    rawJson: rawVc('RelationshipCredential', 'did:key:z6MkVarious...', { relationshipType: 'mutual', count: 6 }),
  },
];

const ListLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography
    variant="caption"
    sx={{ fontWeight: 700, color: 'text.secondary', letterSpacing: '0.04em', display: 'block', mt: 0.5 }}
  >
    {children}
  </Typography>
);

const AuditRow = ({ text }: { text: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
    <Check sx={{ fontSize: 18, color: 'success.main', mt: 0.25 }} />
    <Typography variant="body2">{text}</Typography>
  </Box>
);

export default function JourneyFoundry() {
  return (
    <Section slug="journey-foundry" title="Journey 3 · Getting Vouched In" bg="default">
      <SectionHeading>Getting Vouched In</SectionHeading>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        When you join a new platform today you start from zero — years of reputation and
        relationships are ignored, and you have to earn trust all over again. PLANET changes
        this: your credentials, and the trust they carry, travel with you. Marcus wants to
        join the Foundry Worker Co-op — and rather than showing up as a stranger, he can
        arrive with evidence of who he already is.
      </Typography>

      {/* STEP 1 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 1 — Foundry's join page
      </Typography>

      <FlankedPhone
        ux={
          <>
            Foundry doesn't just want a membership check — it wants to know a new member is
            genuinely trusted by people already inside.
          </>
        }
        backend={
          <>
            Foundry's rule — two <GlossaryAside term="VRC" />s from current members — is
            encoded in their <GlossaryAside term="VTC" /> governance policy as an{' '}
            <BlueLink href={LINKS.openPolicyAgent}>Open Policy Agent</BlueLink> (OPA) rule. It
            isn't held by any admin or subject to individual discretion; the rules are
            transparent and auditable.
          </>
        }
      >
        <PhoneFrame>
          <MobileWebScreen url="foundry.coop/join" siteName="Foundry Worker Co-op" accent="#C2410C">
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
              Membership
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We're a small worker-owned co-op and run a tight team. We ask that new members
              are personally vouched for by two existing members.
            </Typography>
            <Box sx={{ p: 1.5, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <ListLabel>Requirements</ListLabel>
              <Typography variant="body2" sx={{ fontWeight: 600, mt: 0.5 }}>
                Two VRCs (Verifiable Relationship Credentials) from current Foundry members.
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Button variant="contained" fullWidth sx={primaryBtnSx}>
              Apply for membership
            </Button>
          </MobileWebScreen>
        </PhoneFrame>
      </FlankedPhone>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
        When Marcus taps{' '}
        <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>Apply for membership</Box>,
        the Foundry site hands off to his PLANET vault — his own app opens to gather what the
        application needs.
      </Typography>

      {/* STEP 2 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 2 — Priya and Tom vouch for Marcus
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        Marcus already knows Priya and Tom — both current Foundry members — so he asks them to
        vouch for him. Vouching is how PLANET members issue VRCs to each other: a couple of taps,
        and a signed relationship credential is on its way. Both vouches arrive in Marcus's{' '}
        <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>Alerts</Box>, where he
        accepts them — and they're then held in his vault, ready to include in his Foundry
        application.
      </Typography>

      <FlankedPhone
        ux={
          <>
            The vouches arrive in Marcus's alerts. He taps Accept on each, and it becomes a
            signed relationship credential held in his vault.
          </>
        }
        backend={
          <>
            Each VRC is signed by the issuer's <GlossaryAside term="M-DID" /> — Priya's and
            Tom's personal identifiers. Marcus holds them in his vault. Foundry never needs to
            contact Priya or Tom to verify: the cryptographic signature is sufficient. No
            intermediary.
          </>
        }
      >
        <PhoneFrame>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Typography sx={{ fontWeight: 800 }}>Alerts</Typography>
            </Box>
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <NotificationItem
                notification={MARCUS_VOUCHES[0]}
                onClick={noop}
                onAccept={noop}
                onReject={noop}
                getNotificationIcon={vouchIcon}
              />
              <NotificationItem
                notification={MARCUS_VOUCHES[1]}
                onClick={noop}
                onAccept={noop}
                onReject={noop}
                getNotificationIcon={vouchIcon}
              />
            </Box>
            <DemoTabBar active="alerts" />
          </Box>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 3 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 3 — Marcus presents his application bundle
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
        Back on the Foundry website, Marcus reviews his application. The two required vouches are
        in place, and he chooses to share some extra context — the same credentials from his
        vault, presented to Foundry.
      </Typography>

      <FlankedPhone
        ux={
          <>
            Marcus reviews exactly what he's about to share — the two required vouches, plus
            extra context he chooses to include.
          </>
        }
        backend={
          <>
            The bundle is a signed presentation. Foundry receives only what Marcus selects,
            and every credential in it carries its issuer's signature.
          </>
        }
      >
        <PhoneFrame>
          <MobileWebScreen url="foundry.coop/apply" siteName="Foundry Worker Co-op" accent="#C2410C">
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
              Your application
            </Typography>
            <ListLabel>Required</ListLabel>
            <CredentialCard credential={MARCUS_SHARING[0]} />
            <CredentialCard credential={MARCUS_SHARING[1]} />
            <ListLabel>Also sharing (your choice)</ListLabel>
            <CredentialCard credential={MARCUS_SHARING[2]} />
            <CredentialCard credential={MARCUS_SHARING[3]} />
            <CredentialCard credential={MARCUS_SHARING[4]} />
            <Button variant="contained" fullWidth sx={{ ...primaryBtnSx, mt: 1 }}>
              Submit application
            </Button>
          </MobileWebScreen>
        </PhoneFrame>
      </FlankedPhone>

      <Typography variant="body1" color="text.secondary" sx={{ mt: 4, mb: 1 }}>
        Now to Foundry's side. On their laptop, a co-op admin sees the application come through —
        and their governance policy checks it automatically, in seconds.
      </Typography>

      <DesktopCard org="Foundry Worker Co-op" accent="#C2410C">
        <Typography variant="overline" sx={{ color: 'text.secondary', fontWeight: 700, display: 'block' }}>
          Membership application
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
          Marcus
        </Typography>

        <ListLabel>Credentials presented</ListLabel>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 0.75, mb: 2.5 }}>
          {MARCUS_SHARING.map((c) => (
            <Box key={c.id} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  flexShrink: 0,
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: 1,
                  py: 0.25,
                  borderRadius: 1.5,
                  bgcolor: `${CREDENTIAL_ACCENT[c.type]}14`,
                  color: CREDENTIAL_ACCENT[c.type],
                  fontWeight: 800,
                  fontSize: '0.65rem',
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                }}
              >
                {c.type}
              </Box>
              <Typography variant="body2">{c.title}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, color: 'success.main' }}>
          <VerifiedUser sx={{ fontSize: 22 }} />
          <Typography sx={{ fontWeight: 800, letterSpacing: '0.03em' }}>
            ✓ MEMBERSHIP APPROVED
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <AuditRow text="2 VRCs from current Foundry members — confirmed" />
          <AuditRow text="Both issuers are active members — confirmed" />
          <AuditRow text="Credentials within validity period — confirmed" />
        </Box>
      </DesktopCard>

      <AnnotationPair
        ux={
          <>
            Marcus chose to share his existing reputation alongside the required vouches — he
            didn't start from zero. He arrived with evidence of who he already is.
          </>
        }
        backend={
          <>
            Foundry's governance logic evaluated the required credentials automatically
            against its VTC policies — no admin decision needed for the threshold check. The
            full audit trail is cryptographically verifiable and permanent.
          </>
        }
      />

      <OrgValueLine>
        For Foundry: governance rules are enforced automatically, with a full verifiable audit
        trail, no admin burden and no KYC overhead — new members are already verified by the
        community's own trust graph. Every community defines its own governance however it likes;{' '}
        <BlueLink href={LINKS.openPolicyAgent}>Open Policy Agent</BlueLink> (OPA) expresses those
        rules as machine-readable JSON so they can be applied automatically. Foundry's own rule —
        two vouches from current members — is what evaluates Marcus's application here, with no
        admin in the loop and every check logged and auditable.
      </OrgValueLine>
    </Section>
  );
}
