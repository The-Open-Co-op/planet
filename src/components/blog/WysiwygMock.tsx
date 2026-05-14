import { Box, Typography, IconButton, Divider } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatQuote,
  Title,
  FormatListBulleted,
  FormatListNumbered,
  Image as ImageIcon,
} from '@mui/icons-material';
import type { ReactNode } from 'react';

interface WysiwygMockProps {
  children: ReactNode;
}

export const WysiwygMock = ({ children }: WysiwygMockProps) => (
  <Box sx={{ borderRadius: 1.5, border: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
    <Box sx={{ display: 'flex', alignItems: 'center', px: 0.5, py: 0.25, gap: 0 }}>
      {[Title, FormatBold, FormatItalic, FormatQuote, FormatListBulleted, FormatListNumbered, ImageIcon].map(
        (Icon, i) => (
          <IconButton key={i} size="small" sx={{ p: 0.5 }}>
            <Icon sx={{ fontSize: 16, color: 'text.secondary' }} />
          </IconButton>
        )
      )}
      <Box sx={{ flex: 1 }} />
      <Typography sx={{ fontSize: '0.55rem', color: 'text.disabled', pr: 1 }}>
        saved as .md
      </Typography>
    </Box>
    <Divider />
    <Box sx={{ p: 1.5 }}>{children}</Box>
  </Box>
);
