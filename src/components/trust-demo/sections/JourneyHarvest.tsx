import { Box, Typography, Button, Divider } from '@mui/material';
import { Check, VerifiedUser } from '@mui/icons-material';
import { Section } from '@/components/trust-demo/SectionTracker';
import { PhoneFrame } from '@/components/demo/PhoneFrame';
import { FlankedPhone } from '@/components/trust-demo/FlankedPhone';
import { MyTermsChip } from '@/components/trust-demo/MyTermsChip';
import {
  SectionHeading,
  OrgValueLine,
  OC_BLUE,
} from '@/components/trust-demo/sectionKit';
import { MobileWebScreen } from '@/components/trust-demo/MobileWebScreen';

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

const BasketItem = ({ name, price }: { name: string; price: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Box sx={{ width: 26, height: 26, borderRadius: 0.75, bgcolor: 'grey.100', flexShrink: 0 }} />
    <Typography variant="body2" sx={{ flex: 1, minWidth: 0, fontWeight: 500 }} noWrap>
      {name}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 700 }}>
      {price}
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
          <MobileWebScreen url="harvestcollective.coop/checkout" siteName="Harvest Collective" accent="#BE185D">
            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
              Your basket
            </Typography>
            <BasketItem name="Organic porridge oats · 1kg" price="£7.00" />
            <BasketItem name="Fairtrade coffee beans · 500g" price="£9.50" />
            <BasketItem name="Wholewheat pasta · 500g" price="£6.00" />
            <BasketItem name="Cold-pressed olive oil · 1L" price="£12.50" />
            <BasketItem name="Mixed nuts · 750g" price="£7.00" />
            <Divider />
            <Row label="Subtotal" value="£42.00" />
            <Box
              sx={{
                mt: 0.5,
                p: 1.5,
                borderRadius: 1.5,
                bgcolor: 'rgba(0,102,204,0.06)',
                border: '1px solid',
                borderColor: 'rgba(0,102,204,0.2)',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
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
          </MobileWebScreen>
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
            The same credential also gets Sarah into her national Co-op network's annual
            conference at member rate, the cooperative legal helpline, and discounts at other
            suppliers in the network. Value travels with her, in her vault — not locked to any
            supplier.
          </>
        }
      >
        <PhoneFrame>
          <MobileWebScreen url="harvestcollective.coop/checkout" siteName="Harvest Collective" accent="#BE185D">
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
          </MobileWebScreen>
        </PhoneFrame>
      </FlankedPhone>

      <Typography variant="body1" sx={{ color: 'text.secondary', mt: 5 }}>
        Every community Sarah joins adds value through the credentials stored in her vault — and
        that value travels with her. Her credentials are not locked to a supplier and do not
        expose her data by default.
      </Typography>

      <OrgValueLine>
        Harvest offers verified member discounts with zero fraud risk and no personal data to
        store — and, again, none of the KYC overhead that comes with storing and managing customer
        identity data.
      </OrgValueLine>
    </Section>
  );
}
