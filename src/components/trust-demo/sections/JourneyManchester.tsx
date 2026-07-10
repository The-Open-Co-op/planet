import { Box, Typography, Button, InputBase } from '@mui/material';
import { Search, Home, AccountBalance, ArrowBack, VerifiedUser } from '@mui/icons-material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { DemoTabBar } from '@/components/onboarding/DemoTabBar';
import { SectionHeading, OrgValueLine, OC_BLUE, BlueLink } from '@/components/trust-demo/sectionKit';
import type { ReactNode } from 'react';

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

/** A white PLANET app screen (header + scrollable body + the PLANET nav). */
const PlanetScreen = ({ title, back, children }: { title: string; back?: boolean; children: ReactNode }) => (
  <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ px: 2, py: 1.25, display: 'flex', alignItems: 'center', gap: 1, borderBottom: '1px solid', borderColor: 'divider' }}>
      {back && <ArrowBack sx={{ fontSize: 18, color: 'text.secondary' }} />}
      <Typography sx={{ fontWeight: 800 }}>{title}</Typography>
    </Box>
    <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {children}
    </Box>
    <DemoTabBar />
  </Box>
);

const ResultRow = ({ icon, title, subtitle }: { icon: ReactNode; title: string; subtitle: string }) => (
  <Box sx={{ display: 'flex', gap: 1.25, p: 1.5, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
    <Box sx={{ color: OC_BLUE, mt: 0.25 }}>{icon}</Box>
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 700 }}>{title}</Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>{subtitle}</Typography>
    </Box>
  </Box>
);

export default function JourneyManchester() {
  return (
    <Section slug="journey-manchester" title="Journey 4 · Find, and Be Found" bg="paper">
      <SectionHeading>Find, and Be Found</SectionHeading>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Sarah is moving to Manchester. She wants to find a new place to live and connect with
        others building a regenerative economy there — in a city where nobody knows her yet.
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
        Communities on PLANET publish a structured public profile to the open{' '}
        <BlueLink href="https://murmurations.network">Murmurations</BlueLink> index — a shared,
        open directory of organisations. Their details, and even their membership criteria, are
        published as structured data, not locked inside any one app. Anyone can read it:
        directories and maps like{' '}
        <BlueLink href="https://cobot.murmurations.network/">CoBot</BlueLink> list it — and so can
        PLANET.
      </Typography>

      {/* STEP 1 — Discover */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 1 — Discover
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
        Sarah searches for communities right inside PLANET — her own, vault-aware window into the
        Murmurations index.
      </Typography>

      <FlankedPhone
        ux={
          <>
            Sarah searches inside PLANET and sees communities that fit — pulled straight from their
            own published profiles.
          </>
        }
        backend={
          <>
            PLANET queries the open Murmurations index directly — it already speaks the protocol —
            and renders the results itself from each community's published data. The same open data
            also appears on CoBot and other directories — it's not locked inside PLANET.
          </>
        }
      >
        <PhoneFrame>
          <PlanetScreen title="Find communities">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
              <InputBase value="Manchester" readOnly sx={{ flex: 1, fontSize: '0.9rem' }} />
            </Box>

            <ResultRow
              icon={<Home sx={{ fontSize: 20 }} />}
              title="Mossley Housing Co-op"
              subtitle="1 room available · Priority for housing-co-op members"
            />
            <ResultRow
              icon={<AccountBalance sx={{ fontSize: 20 }} />}
              title="Manchester Mutual Credit Network"
              subtitle="Open to members of recognised cooperative organisations"
            />
          </PlanetScreen>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 2 — Listing + private match */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 2 — A match, before sharing anything
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
        Sarah opens Mossley's listing. PLANET renders it from Mossley's published Murmurations
        profile — the room, and the membership criteria as structured fields. Because PLANET holds
        her vault, it checks those criteria against her credentials as it draws the page, and flags
        that she'd be a priority applicant. Mossley sees none of it — the whole check happens on
        Sarah's device.
      </Typography>

      <FlankedPhone
        ux={
          <>
            Sarah sees she qualifies, and why — worked out privately as PLANET renders the listing.
            She hasn't shared anything with Mossley.
          </>
        }
        backend={
          <>
            Mossley publishes its criteria as structured data in its Murmurations profile, so
            PLANET can match those fields against Sarah's credentials programmatically — locally, as
            it renders the listing. No scraping, no cross-origin, no browser plugin. Mossley learns
            nothing until she taps Apply, when she makes a selective-disclosure presentation,
            sharing only what's needed.
          </>
        }
      >
        <PhoneFrame>
          <PlanetScreen title="Mossley Housing Co-op" back>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              1 room available — shared house, central Manchester
            </Typography>
            <Typography variant="body2" color="text.secondary">
              £650 a month, all-inclusive
            </Typography>

            <Box sx={{ p: 1.5, borderRadius: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
              <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.04em', color: 'text.secondary', display: 'block', mb: 0.75 }}>
                MEMBERSHIP CRITERIA
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', color: 'text.primary', mb: 0.5 }}>
                • Priority for applicants holding a VMC from another housing co-op
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', color: 'text.primary' }}>
                • All cooperative members welcome to apply
              </Typography>
            </Box>

            <Box sx={{ p: 1.5, borderRadius: 1.5, bgcolor: 'rgba(0,102,204,0.06)', border: '1px solid', borderColor: 'rgba(0,102,204,0.25)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.25 }}>
                <VerifiedUser sx={{ fontSize: 18, color: OC_BLUE }} />
                <Typography variant="caption" sx={{ fontWeight: 800, color: OC_BLUE, letterSpacing: '0.03em' }}>
                  You qualify — priority applicant
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Checked privately against your vault. Nothing shared with Mossley yet.
              </Typography>
            </Box>

            <Button variant="contained" fullWidth sx={primaryBtnSx}>
              Apply now
            </Button>
          </PlanetScreen>
        </PhoneFrame>
      </FlankedPhone>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 5 }}>
        The same thing happens when Sarah approaches the Manchester Mutual Credit Network — her
        existing credentials speak for her trustworthiness, and she's extended a line of credit
        immediately, despite being brand new to the community.
      </Typography>

      <OrgValueLine>
        For Mossley Housing Co-op: publish one open profile and you're discoverable everywhere —
        CoBot, PLANET and any other directory — with no duplicate listings to maintain. Applicants
        arrive pre-verified, due diligence is instant, and community fit is clear before a single
        conversation, with no personal data handled until they choose to proceed.
      </OrgValueLine>
    </Section>
  );
}
