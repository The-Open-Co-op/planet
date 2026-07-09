import { Box, Typography } from '@mui/material';
import { CredentialCard } from './CredentialCard';
import { SARAH_VAULT } from './trustDemoData';
import type { DemoCredential } from './trustDemoData';

interface CredentialVaultProps {
  /** Credentials to display. Defaults to Sarah's founding set. */
  credentials?: DemoCredential[];
  /** Header label above the stack. */
  title?: string;
  /** Optional one-line caption under the title. */
  caption?: string;
}

/**
 * The reusable credential vault — a scrollable stack of tappable credential
 * cards. Shared by the Trust Layer demo (§1) and the PNM demo's Vault step so
 * both render the same spec'd credentials from one source of truth.
 */
export const CredentialVault = ({
  credentials = SARAH_VAULT,
  title = 'Credentials',
  caption,
}: CredentialVaultProps) => {
  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 1.5 }}>
      <Typography
        variant="overline"
        sx={{ color: 'text.secondary', fontWeight: 700, display: 'block', px: 0.5, mb: caption ? 0.25 : 1 }}
      >
        {title}
      </Typography>
      {caption && (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', px: 0.5, mb: 1 }}>
          {caption}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {credentials.map((c) => (
          <CredentialCard key={c.id} credential={c} />
        ))}
      </Box>
    </Box>
  );
};
