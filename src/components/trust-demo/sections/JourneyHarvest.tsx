import { Box, Typography, Button, Divider } from '@mui/material';
import { Check, VerifiedUser } from '@mui/icons-material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { GlossaryAside } from '@/components/trust-demo/GlossaryAside';
import { MyTermsChip } from '@/components/trust-demo/MyTermsChip';
import {
  SectionHeading,
  OrgValueLine,
  ScreenHeader,
  OC_BLUE,
  BlueLink,
} from '@/components/trust-demo/sectionKit';

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

const secondaryBtnSx = {
  textTransform: 'none',
  fontWeight: 700,
} as const;

const Row = ({ label, value }: { label: string; value: string }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
    <Typography variant="body2" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 700 }}>
      {value}
    </Typography>
  </Box>
);

export default function JourneyHarvest() {
  return (
    <Section slug="journey-harvest" title="Journey 2 · Member Discount" bg="paper">
      <SectionHeading>The Value of Membership</SectionHeading>

      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
        Sarah's credentials don't just open doors — they unlock real economic value, without
        handing her data to anyone. Here she's shopping at Harvest Collective, a cooperative
        wholefoods supplier.
      </Typography>

      {/* STEP 1 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 1 — Checkout prompt
      </Typography>

      <FlankedPhone
        ux={
          <>
            Sarah can use her credentials with one tap — like showing a membership card, but
            without handing it over or exposing her personal data.
          </>
        }
        backend={
          <>
            Harvest Collective's checkout queries Sarah's credentials. The proof demonstrates
            co-op membership without revealing which co-op, her name, when she joined, or any
            personal detail. Verification is cryptographic and takes milliseconds — Harvest
            receives a binary verified/not-verified result and nothing else.
          </>
        }
      >
        <PhoneFrame>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ScreenHeader org="Harvest Collective" strap="Checkout" />
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Row label="Subtotal" value="£42.00" />
              <Divider />
              <Typography variant="body2" sx={{ color: 'text.primary' }}>
                Are you a member of a cooperative organisation? Members get 10% off.
              </Typography>
              <Button variant="contained" fullWidth sx={primaryBtnSx}>
                Verify my co-op membership
              </Button>
              <Button variant="outlined" fullWidth sx={secondaryBtnSx}>
                Continue without discount
              </Button>
            </Box>
          </Box>
        </PhoneFrame>
      </FlankedPhone>

      {/* STEP 2 */}
      <Typography variant="overline" sx={stepLabelSx}>
        Step 2 — One tap, verified
      </Typography>

      <FlankedPhone
        ux={
          <>
            One tap and the discount is applied — she proved her membership without creating an
            account or sharing an email.
          </>
        }
        backend={
          <>
            The same credential also gets Sarah into{' '}
            <BlueLink href="https://open.coop/">The Co-operative Network</BlueLink>'s annual
            conference at member rate, the cooperative legal helpline, and discounts at other
            suppliers in the network. Value travels with her, in her vault — not locked to any
            supplier.
          </>
        }
      >
        <PhoneFrame>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <ScreenHeader org="Harvest Collective" strap="Checkout" />
            <Box sx={{ flex: 1, overflow: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  p: 1.5,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(46,125,50,0.1)',
                  border: '1px solid',
                  borderColor: 'success.main',
                }}
              >
                <VerifiedUser sx={{ color: 'success.main', fontSize: 20 }} />
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.dark', letterSpacing: '0.04em' }}>
                  CO-OP MEMBER VERIFIED
                </Typography>
              </Box>
              <Row label="10% member discount applied" value="−£4.20" />
              <Divider />
              <Row label="Total" value="£37.80" />
              <Button variant="contained" fullWidth startIcon={<Check />} sx={primaryBtnSx}>
                Complete order
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                No account created. No email captured. No data retained by Harvest Collective.
              </Typography>
              <MyTermsChip />
            </Box>
          </Box>
        </PhoneFrame>
      </FlankedPhone>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 5 }}>
        Every community Sarah joins adds value through the credentials stored in her vault — and
        that value travels with her. Her credentials are not locked to a supplier and do not
        expose her data by default.
      </Typography>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 2 }}>
        A note on cost: <GlossaryAside term="KYC" /> processes — the identity checks organisations
        run to verify who they're dealing with — are slow, expensive, and create personal-data
        liabilities. A mid-sized cooperative can spend thousands of pounds a year on manual
        verification, onboarding forms, reference-chasing and data compliance. Verifiable
        credentials eliminate this: the work of verification has already been done by the issuing
        community, cryptographically signed, and is instantly checkable. No forms. No manual
        review. No personal data stored.
      </Typography>

      <OrgValueLine>
        Harvest Collective offers verified member discounts with zero fraud risk and without
        handling personal data — avoiding the ongoing KYC costs that come with storing and
        managing customer identity data.
      </OrgValueLine>
    </Section>
  );
}
