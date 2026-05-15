import { Box, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material';
import type { FeedConfig } from '@/mocks/feedsDemo';

interface FeedSelectorProps {
  feeds: FeedConfig[];
  selectedId: string;
  onChange: (id: string) => void;
  /** If true, includes a + Add new feed option at the bottom */
  showAddOption?: boolean;
  onAddNew?: () => void;
  label?: string;
}

export const FeedSelector = ({
  feeds,
  selectedId,
  onChange,
  showAddOption,
  onAddNew,
  label = 'Feed',
}: FeedSelectorProps) => {
  return (
    <FormControl fullWidth size="small">
      <InputLabel sx={{ bgcolor: 'background.default', px: 0.5 }}>{label}</InputLabel>
      <Select
        value={selectedId}
        label={label}
        onChange={(e) => {
          const v = e.target.value;
          if (v === '__add__') {
            onAddNew?.();
            return;
          }
          onChange(v);
        }}
      >
        {feeds.map((f) => (
          <MenuItem key={f.id} value={f.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: f.color }} />
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>{f.name}</Typography>
            </Box>
          </MenuItem>
        ))}
        {showAddOption && (
          <MenuItem value="__add__">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0066CC' }}>
              <Add sx={{ fontSize: 16 }} />
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 500 }}>Add new feed</Typography>
            </Box>
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
