import { Box, Typography, Link, Stack, IconButton } from '@mui/material';
import { KeyboardArrowDown, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { VaultScreen } from '@/components/onboarding/VaultScreen';
import { SectionTrackerProvider, Section } from '@/components/trust-demo/SectionTracker';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import { CryptoSimulatedBadge } from '@/components/trust-demo/CryptoSimulatedBadge';
import { LINKS } from '@/components/trust-demo/trustDemoData';

/** The Open Co-op blue — used for titles and links. */
const OC_BLUE = '#0066CC';

const PHC_DOC =
  'https://docs.google.com/document/d/1RtS86BqyVn3i3mXm48VhC-SRaYvW2W_MvR4w6x9KQWY/edit?tab=t.0#heading=h.i544xd6ocqhm';

const BlueLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    underline="hover"
    sx={{ color: OC_BLUE, fontWeight: 600 }}
  >
    {children}
  </Link>
);

const StandardLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    underline="hover"
    sx={{
      px: 1.5,
      py: 0.75,
      borderRadius: 1.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      color: OC_BLUE,
      fontSize: '0.8rem',
      fontWeight: 600,
      '&:hover': { borderColor: OC_BLUE },
    }}
  >
    {children}
  </Link>
);

const SectionEyebrow = ({ children }: { children: React.ReactNode }) => (
  <Typography variant="overline" sx={{ color: OC_BLUE, fontWeight: 700, display: 'block', mb: 1.5 }}>
    {children}
  </Typography>
);

const OrgValueLine = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      mt: 3,
      p: 2,
      borderLeft: '3px solid',
      borderColor: 'success.main',
      bgcolor: 'rgba(46,125,50,0.05)',
      borderRadius: '0 8px 8px 0',
    }}
  >
    <Typography variant="caption" sx={{ fontWeight: 700, color: 'success.dark', display: 'block', mb: 0.5, letterSpacing: '0.03em' }}>
      For communities:
    </Typography>
    <Typography variant="body2" sx={{ color: 'text.primary' }}>
      {children}
    </Typography>
  </Box>
);

const TrustLayerDemoPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    try {
      if (window.self !== window.top) {
        window.parent.postMessage({ type: 'demo-navigate', slug: '' }, '*');
        return;
      }
    } catch (_) {
      /* not embedded */
    }
    navigate('/demo');
  };

  return (
    <Box sx={{ height: '100vh', overflowY: 'auto', overflowX: 'hidden', bgcolor: 'background.default' }}>
      {/* Demo header — back to all demos (matches the other demos) */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 3,
          py: '10px',
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <IconButton onClick={goBack} size="small" sx={{ border: '1px solid', borderColor: 'divider' }}>
          <ArrowBack sx={{ fontSize: 18 }} />
        </IconButton>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Trust Layer Demo
        </Typography>
      </Box>

      <SectionTrackerProvider>
        {/* ── Hero ───────────────────────────────────────────── */}
        <Section slug="intro" title="Intro" bg="paper" sx={{ minHeight: '92vh', justifyContent: 'center' }}>
          <Typography
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: OC_BLUE,
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.4rem', md: '2.5rem' },
            }}
          >
            The internet is missing a trust layer.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, fontSize: '1.05rem' }}>
            The Web has been captured by “big tech” platforms that hijack our attention,
            harvest our data and sell it to the highest bidders. It's drowning in ads,
            clickbait, deepfakes and AI slop — leaving us unsure what's real and who to
            trust. Our connections and content are locked in walled gardens, and every new
            platform means recreating your profile from scratch.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, fontSize: '1.05rem' }}>
            The <BlueLink href={LINKS.firstPersonProject}>First Person Project</BlueLink> is
            building the open protocols to change this — aligned with a stack of recognised
            open standards. No single organisation owns any of it.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, fontSize: '1.05rem' }}>
            <BlueLink href={LINKS.openCoop}>The Open Co-op</BlueLink> is the member-owned
            initiative specifying and building the tools and network to make it real. Below
            are working demos of the concept.
          </Typography>

          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', mb: 1 }}
          >
            Built on open standards
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
            <StandardLink href={LINKS.w3cVc}>W3C Verifiable Credentials</StandardLink>
            <StandardLink href={LINKS.trustOverIp}>Trust over IP</StandardLink>
            <StandardLink href={LINKS.myTerms}>MyTerms (IEEE 7012)</StandardLink>
            <StandardLink href={LINKS.ayra}>Ayra</StandardLink>
          </Stack>

          <Box
            onClick={() =>
              document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            sx={{
              mt: 6,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.secondary',
              cursor: 'pointer',
              '&:hover': { color: OC_BLUE },
            }}
          >
            <KeyboardArrowDown />
            <Typography variant="caption">Scroll to begin — Sarah's vault</Typography>
          </Box>
        </Section>

        {/* ── §1 The Vault ───────────────────────────────────── */}
        <Section slug="vault" title="The Vault" bg="default">
          <SectionEyebrow>Section 1 — The Vault</SectionEyebrow>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: OC_BLUE }}>
            Everyone has a vault
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Everyone in the network has a vault — a personal, encrypted store for all your
            stuff: your identity, your data, your settings, and your credentials. It works
            across your devices and only you hold the keys. Here's Sarah's, opened at{' '}
            <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>My Credentials</Box>{' '}
            — the memberships, relationships and endorsements that make up her reputation.
            Tap a card to see its details, share it, or inspect the raw data model.
          </Typography>

          <FlankedPhone
            ux={
              <>
                Sarah's vault holds her credentials as cards — the endorsements and
                memberships that make up her reputation, all in one place she controls.
              </>
            }
            backend={
              <>
                Each credential is signed by its issuer's <GlossaryAside term="DID" /> (Decentralised
                Identifier). Communities sign with their <GlossaryAside term="C-DID" />; individuals
                sign with their <GlossaryAside term="M-DID" />. Sarah controls her own M-DID and
                vault — no third party holds her keys.
              </>
            }
          >
            <PhoneFrame>
              <VaultScreen initialView="credentials" />
            </PhoneFrame>
          </FlankedPhone>

          <OrgValueLine>
            members arrive with verifiable history. No forms. No chasing references. No
            personal data liability.
          </OrgValueLine>

          {/* First place signatures appear (Signed by / proofValue) — note goes here. */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <CryptoSimulatedBadge />
          </Box>
        </Section>

        {/* ── Personhood ─────────────────────────────────────── */}
        <Section slug="personhood" title="Staying human" bg="paper">
          <SectionEyebrow>How the network stays human</SectionEyebrow>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: OC_BLUE }}>
            A defence against bots — and unwanted AI
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A <GlossaryAside term="PHC" /> is a cryptographic proof that you are a real human
            being, not a bot or automated agent. Personhood Credentials are the foundation of
            trust in the network. The protocol makes proof-of-humanity verifiable by creating
            an audit trail of who issues whom a PHC — providing a mechanism to exclude
            unwanted bots and their promoters.
          </Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            <BlueLink href={PHC_DOC}>Read more about personhood credentials →</BlueLink>
          </Typography>
        </Section>

        {/* Journeys 1–4, developer section and closing land in later phases. */}
        <Section slug="more-coming" title="More coming" bg="default" sx={{ pb: 12 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px dashed',
              borderColor: 'divider',
              textAlign: 'center',
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">
              Next: four journeys — joining a co-op with trust, member discounts, getting
              vouched in, and finding your people somewhere new — plus the developer section
              and call to action.
            </Typography>
          </Box>
        </Section>
      </SectionTrackerProvider>
    </Box>
  );
};

export default TrustLayerDemoPage;
