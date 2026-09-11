import { Box, Typography, IconButton } from '@mui/material';
import { KeyboardArrowDown, ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { VaultScreen } from '@/components/onboarding/VaultScreen';
import { SectionTrackerProvider, Section } from '@/components/trust-demo/SectionTracker';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import { CryptoSimulatedBadge } from '@/components/trust-demo/CryptoSimulatedBadge';
import { OC_BLUE, BlueLink } from '@/components/trust-demo/sectionKit';
import { LINKS } from '@/components/trust-demo/trustDemoData';
import JourneyGreens from '@/components/trust-demo/sections/JourneyGreens';
import JourneyHarvest from '@/components/trust-demo/sections/JourneyHarvest';
import JourneyFoundry from '@/components/trust-demo/sections/JourneyFoundry';
import JourneyManchester from '@/components/trust-demo/sections/JourneyManchester';
import JourneyVote from '@/components/trust-demo/sections/JourneyVote';
import { DevelopersSection, ClosingSection } from '@/components/trust-demo/sections/KnowDevClosing';

/** Google Doc explaining personhood credentials in depth. */
const PHC_DOC =
  'https://docs.google.com/document/d/1RtS86BqyVn3i3mXm48VhC-SRaYvW2W_MvR4w6x9KQWY/edit?tab=t.0#heading=h.i544xd6ocqhm';

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
            Trust that travels with you
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, fontSize: '1.05rem' }}>
            This is a demo of a trust layer for the internet: a way for people to carry proof of
            who they are, who vouches for them and the communities they belong to — and use it
            anywhere, sharing only what they choose, with whom they choose.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5, fontSize: '1.05rem' }}>
            It builds on the <GlossaryAside term="DTG">Decentralised Trust Graph (DTG)</GlossaryAside> —
            an open protocol stack being developed by our friends at the{' '}
            <BlueLink href={LINKS.firstPersonProject}>First Person Project</BlueLink> — in which
            every relationship, membership, endorsement and vouch is issued as a{' '}
            <GlossaryAside term="VC">verifiable credential</GlossaryAside>: a small signed
            statement from one party about another. Together these statements form
            the trust graph: a web of verified relationships between people and communities that no
            single organisation owns or controls. Anyone can prove their place in it. Nobody can
            fake it.
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, fontSize: '1.05rem' }}>
            The demo follows Sarah, a co-op member with a vault on her phone. It holds her credentials: memberships, endorsements and a proof that she's a real
            human. No platform owns it, and she can take it anywhere. See how she uses them to:
          </Typography>
          <Box component="ol" sx={{ m: 0, mb: 2.5, pl: 3, color: 'text.secondary', fontSize: '1.05rem' }}>
            {[
              ['Join a community', 'skipping the waiting list by proving she\'s already a member elsewhere.'],
              ['Unlock member discounts', 'without revealing personal details.'],
              ['Get vouched in', 'with endorsements she already holds, checked automatically against the community\'s own rules.'],
              ['Find and access new communities', 'matched on the trusted relationships she already has.'],
              ['Vote anonymously', 'a secret ballot without revealing who she is or how she voted.'],
            ].map(([lead, rest]) => (
              <Typography key={lead} component="li" variant="body1" color="text.secondary" sx={{ mb: 0.75, fontSize: '1.05rem' }}>
                <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{lead}</Box> — {rest}
              </Typography>
            ))}
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, fontSize: '1.05rem' }}>
            Each step shows her phone screen alongside what's happening underneath — the
            credentials, signatures and trust graph doing the work.
          </Typography>

          <Box
            onClick={() =>
              document.getElementById('vault')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            sx={{
              mt: 4,
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
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, color: OC_BLUE }}>
            Everyone has a vault
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Everyone in the network has a vault — a personal, encrypted store for all your
            stuff: your identity, your data, your settings, and your credentials. It works
            across your devices, run by your own agent with a hosting provider you choose — or
            hosted by you. Nobody can lock you in, and you can switch host at any time. Here's
            Sarah's, opened at{' '}
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
                Identifier): a community issues under its <GlossaryAside term="C-DID" />, a person
                under one of their <GlossaryAside term="M-DID">M-DIDs</GlossaryAside> — people hold
                several, and use different ones in different contexts. Her vault is operated by her personal agent, which holds the vault keys so it can act
                on her behalf; Sarah holds the keys to the agent. The agent runs with a hosting
                provider she chooses — or on her own infrastructure — and she can move it to
                another at any time.
              </>
            }
          >
            <PhoneFrame>
              <VaultScreen initialView="credentials" />
            </PhoneFrame>
          </FlankedPhone>

          {/* First place signatures appear (Signed by / proofValue) — note goes here. */}
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <CryptoSimulatedBadge />
          </Box>
        </Section>

        {/* ── Personhood ─────────────────────────────────────── */}
        <Section slug="personhood" title="Staying human" bg="paper">
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: OC_BLUE }}>
            Defence against bots — and unwanted AI
          </Typography>
          <Typography variant="body1" color="text.secondary">
            A <GlossaryAside term="PHC" /> is a cryptographic proof that you are a real human
            being, not a bot or automated agent. Personhood Credentials are the foundation of
            trust in the network. The protocol makes proof-of-humanity verifiable by creating
            an audit trail of who issues whom a PHC — providing a mechanism to exclude
            unwanted bots and their promoters.
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Box
              component="img"
              src="/images/phc-enrollment-usage.png"
              alt="Illustration of enrollment and usage of a personhood credential"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              }}
            />
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
              Illustration of enrollment and usage of a personhood credential
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ mt: 3 }}>
            <BlueLink href={PHC_DOC}>Read more about personhood credentials →</BlueLink>
          </Typography>
        </Section>

        {/* Journeys 1–5 */}
        <JourneyGreens />
        <JourneyHarvest />
        <JourneyFoundry />
        <JourneyManchester />
        <JourneyVote />

        {/* Developers · Closing */}
        <DevelopersSection />
        <ClosingSection />
      </SectionTrackerProvider>
    </Box>
  );
};

export default TrustLayerDemoPage;
