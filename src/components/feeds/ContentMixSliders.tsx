import { Box, Typography, Slider } from '@mui/material';
import type { ContentCategory } from '@/mocks/feedsDemo';

interface ContentMixSlidersProps {
  mix: Record<ContentCategory, number>;
  onChange: (cat: ContentCategory, value: number) => void;
  color?: string;
}

const CATEGORIES: ContentCategory[] = ['News', 'Events', 'Recommendations', 'Opportunities'];

export const ContentMixSliders = ({ mix, onChange, color = '#0066CC' }: ContentMixSlidersProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
    {CATEGORIES.map((cat) => (
      <Box key={cat} sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Typography sx={{ fontSize: '0.74rem', fontWeight: 500, width: 100, flexShrink: 0 }}>
          {cat}
        </Typography>
        <Slider
          size="small"
          value={mix[cat]}
          min={0}
          max={100}
          onChange={(_, v) => onChange(cat, v as number)}
          sx={{
            color,
            '& .MuiSlider-thumb': { width: 12, height: 12 },
            py: 0.75,
            flex: 1,
          }}
        />
        <Typography sx={{ fontSize: '0.74rem', fontWeight: 600, color: 'text.secondary', width: 30, textAlign: 'right', flexShrink: 0 }}>
          {mix[cat]}%
        </Typography>
      </Box>
    ))}
  </Box>
);
