import { Box, Typography, Card } from '@mui/material';
import { PhoneAndroid, LinkedIn, MailOutline } from '@mui/icons-material';
import React from 'react';

const sources = [
  { name: 'Mobile contacts', icon: <PhoneAndroid sx={{ fontSize: 28 }} />, desc: "Import from your phone's contacts", enabled: true },
  { name: 'Gmail', icon: <MailOutline sx={{ fontSize: 28 }} />, desc: 'Import your Gmail contacts', enabled: false },
  { name: 'LinkedIn', icon: <LinkedIn sx={{ fontSize: 28 }} />, desc: 'Import your LinkedIn connections', enabled: false },
];

interface ImportScreenProps {
  onImport?: () => void;
}

/** Step 05 — Import contacts */
export const ImportScreen = ({ onImport }: ImportScreenProps) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box sx={{ px: 2, pt: 1.5, pb: 0.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Import
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Choose a source to import your contacts from
        </Typography>
      </Box>

      {/* Source list */}
      <Box sx={{ flex: 1, overflow: 'auto', px: 2, py: 1 }}>
        {sources.map((source) => (
          <Card
            key={source.name}
            onClick={source.enabled ? onImport : undefined}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              p: 1.5,
              mb: 1,
              cursor: source.enabled ? 'pointer' : 'default',
              opacity: source.enabled ? 1 : 0.6,
              '&:hover': source.enabled ? { borderColor: '#0066CC', bgcolor: 'action.hover' } : {},
            }}
          >
            <Box sx={{ display: 'flex', flexShrink: 0, color: 'text.secondary' }}>
              {source.icon}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {source.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {source.desc}
              </Typography>
            </Box>
            {!source.enabled && (
              <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.disabled', whiteSpace: 'nowrap', fontWeight: 500 }}>
                V2
              </Typography>
            )}
          </Card>
        ))}
      </Box>
    </Box>
  );
};
