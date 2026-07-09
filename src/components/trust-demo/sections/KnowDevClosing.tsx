import { Box, Typography, Button } from '@mui/material';
import { Section } from '@/components/trust-demo/SectionTracker';
import {
  SectionHeading,
  BlueLink,
  StandardLink,
  OC_BLUE,
} from '@/components/trust-demo/sectionKit';
import { LINKS } from '@/components/trust-demo/trustDemoData';

/* ── Community OS ───────────────────────────────────────────────── */
const OsComponent = ({ n, name, desc, instead }: { n: string; name: string; desc: string; instead: string }) => (
  <Box sx={{ p: 2.25, borderRadius: 2.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
      <Typography sx={{ fontWeight: 800, color: OC_BLUE, fontSize: '0.8rem' }}>{n}</Typography>
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{name}</Typography>
    </Box>
    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{desc}</Typography>
    <Typography variant="caption" sx={{ color: 'text.disabled' }}>{instead}</Typography>
  </Box>
);

export const KnowSection = () => (
  <Section slug="community-os" title="Community OS" bg="paper">
    <SectionHeading>Community OS</SectionHeading>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      Most communities run on a patchwork of platforms they don't own — a mailing list here, a
      chat group there, a spreadsheet of members, a form for votes, documents scattered across
      drives. Each tool quietly extracts a little value, none of them talk to each other, and the
      community's own data ends up living everywhere except with the community.
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      The First Person protocols and VTC framework will make it possible to bring all of this
      together in one place that the community actually owns — a single, privacy-first platform
      built on the trust layer you've just seen. Verified membership, DIDs and credentials run
      quietly underneath; what people see is one clean, integrated tool that simply works.
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5 }}>
      Our goal is to develop a comprehensive package for communities, under the working title{' '}
      <Box component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>Community OS</Box> — an
      intuitive, integrated tool that provides five key features:
    </Typography>

    <Box
      sx={{
        // Break out wider than the prose on desktop so all five sit side by side.
        width: { xs: '100%', md: 'min(1160px, 94vw)' },
        position: { md: 'relative' },
        left: { md: '50%' },
        transform: { md: 'translateX(-50%)' },
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(5, 1fr)' },
        gap: 2,
        mb: 4,
      }}
    >
      <OsComponent
        n="01"
        name="Members"
        desc="A verified membership directory, onboarding and credentials — so 'who's a member' is always current, and provable."
        instead="Instead of spreadsheets and a members area"
      />
      <OsComponent
        n="02"
        name="Communicate"
        desc="Announcements and newsletters that reach your real, verified members — not scraped or unverified inboxes."
        instead="Instead of Mailchimp and Brevo"
      />
      <OsComponent
        n="03"
        name="Discuss"
        desc="A members-only forum and chat whose history the community owns — it can't be deleted by an algorithm, banned by a platform, or sold to an advertiser."
        instead="Instead of Facebook Groups, WhatsApp and Slack"
      />
      <OsComponent
        n="04"
        name="Decide"
        desc="Proposals and votes with genuine one-member-one-vote — auditable and defensible, because membership is cryptographically attested."
        instead="Instead of Google Forms and AGM proxies"
      />
      <OsComponent
        n="05"
        name="Know"
        desc="A shared knowledge base with a private AI assistant, trained on the community's own knowledge and kept inside its walls."
        instead="Instead of ChatGPT, Notion and shared drives"
      />
    </Box>

    <Typography variant="h6" sx={{ fontWeight: 700, color: OC_BLUE, mb: 1 }}>
      A private AI, inside your community's walls
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      People are already pasting sensitive community knowledge into public AI tools — where it
      leaks to whoever runs them. The Know component gives a community its own assistant instead:
      trained on its documents, discussions and collective expertise, and running inside the
      community's own trust boundary (its VTC). It answers only to
      members, nothing it learns ever leaves, and the community itself decides what it knows and
      who can ask.
    </Typography>

    <Typography variant="body2">
      Community OS is in development.{' '}
      <BlueLink href={LINKS.ctaPilot}>Talk to us about piloting it →</BlueLink>
    </Typography>
  </Section>
);

/* ── §7 For Developers ──────────────────────────────────────────── */
const CodeBlock = () => (
  <Box
    component="pre"
    sx={{
      mt: 3,
      p: 2.5,
      borderRadius: 2,
      bgcolor: 'grey.900',
      color: 'grey.50',
      fontSize: '0.78rem',
      lineHeight: 1.6,
      overflow: 'auto',
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    }}
  >{`// Verify a Verifiable Membership Credential (VMC)
// from a recognised cooperative
const result = await planet.verify({
  holder: 'did:key:z6MkpTHR8VNs...',
  credentialType: 'MembershipCredential',
  trustedIssuers: cooperativeNetwork.registry
})
// → {
//     verified: true,
//     issuer: 'did:web:bristoltechcoop.coop',
//     communityName: 'Bristol Tech Co-op',
//     validUntil: '2027-01-15T00:00:00Z'
//   }`}</Box>
);

export const DevelopersSection = () => (
  <Section slug="developers" title="For Developers" bg="default">
    <SectionHeading>For Developers</SectionHeading>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      The PLANET trust layer is built entirely on open, recognised standards — no proprietary
      formats and no lock-in. Every piece below is an open specification anyone can build on and
      interoperate with.
    </Typography>

    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 3 }}>
      <StandardLink href={LINKS.w3cDids}>W3C Decentralised Identifiers</StandardLink>
      <StandardLink href={LINKS.w3cVc}>W3C Verifiable Credentials 2.0</StandardLink>
      <StandardLink href={LINKS.toipDtgSpec}>Trust over IP — DTG spec</StandardLink>
      <StandardLink href={LINKS.myTermsSdBase}>IEEE 7012-2025 (MyTerms)</StandardLink>
      <StandardLink href={LINKS.ayra}>Ayra Trust Registry Fabric</StandardLink>
    </Box>

    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      Build on these standards and you inherit something no platform can manufacture: a
      network of real, verified relationships your users already hold. New users don't arrive
      cold. Governance logic doesn't need a moderation army. Communities don't start from zero.
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      Because the protocol is open and owned by no one, the trust your users build on your
      platform travels with them — which means they chose to be there, not trapped. A
      different relationship between platform and user, and better software.
    </Typography>

    <CodeBlock />

    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
      No proprietary SDK. No vendor lock-in. No data leaving the user's vault without their
      explicit consent.
    </Typography>
  </Section>
);

/* ── §8 Closing ─────────────────────────────────────────────────── */
const CtaCard = ({ prompt, action, href }: { prompt: string; action: string; href: string }) => (
  <Box
    sx={{
      p: 2.5,
      borderRadius: 2.5,
      border: '1px solid',
      borderColor: 'divider',
      bgcolor: 'background.paper',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 1.5,
    }}
  >
    <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
      {prompt}
    </Typography>
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variant="contained"
      sx={{ textTransform: 'none', fontWeight: 700, bgcolor: OC_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
    >
      {action}
    </Button>
  </Box>
);

export const ClosingSection = () => (
  <Section slug="closing" title="Closing" bg="default" sx={{ pb: 12 }}>
    <SectionHeading>Get involved</SectionHeading>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 2.5 }}>
      We're building the trust layer the internet never had — on open protocols, owned by no one,
      governed cooperatively. The network grows with every person and community that joins, and
      we're looking for collaborators, early adopters, and everyone else who recognises this
      matters.
    </Typography>

    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 2, mt: 3 }}>
      <CtaCard
        prompt="Run a cooperative or community network?"
        action="Pilot Community OS"
        href={LINKS.ctaPilot}
      />
      <CtaCard
        prompt="Want to build on the protocol?"
        action="Explore the open spec"
        href={LINKS.ctaBuild}
      />
      <CtaCard
        prompt="Want to help build a member-owned trust network for the internet?"
        action="Join The Open Co-op"
        href={LINKS.ctaJoin}
      />
    </Box>
  </Section>
);
