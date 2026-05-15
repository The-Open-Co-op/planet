import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Share,
  CheckCircle,
  Public,
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
} from '@mui/icons-material';
import { useTrustProfiles } from '@/hooks/useTrustProfiles';

const ICON_MAP: Record<string, React.ElementType> = {
  Public,
  FamilyRestroom,
  Favorite,
  Business,
  Groups,
};

/** Mocked contact counts per profile name */
const CONTACT_COUNTS: Record<string, number> = {
  Public: 0,
  Family: 4,
  Friends: 12,
  Business: 8,
  Community: 18,
};

interface ShareRecommendationDialogProps {
  open: boolean;
  onClose: () => void;
}

export const ShareRecommendationDialog = ({ open, onClose }: ShareRecommendationDialogProps) => {
  const { activeProfiles } = useTrustProfiles();
  const groups = activeProfiles.filter((p) => p.name !== 'Public');
  const [selected, setSelected] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setSelected([]);
      setSent(false);
    }
  }, [open]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const totalContacts = selected.reduce((sum, id) => {
    const p = groups.find((x) => x.id === id);
    return sum + (p ? CONTACT_COUNTS[p.name] ?? 0 : 0);
  }, 0);

  const handleSend = () => {
    setSent(true);
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 2, m: 2, maxWidth: 320 } }}>
      <DialogContent sx={{ p: 2.5, textAlign: 'center' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: sent ? '#2e7d32' : '#0066CC',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 1.25,
          }}
        >
          {sent ? <CheckCircle sx={{ fontSize: 28 }} /> : <Share sx={{ fontSize: 24 }} />}
        </Box>

        {!sent ? (
          <>
            <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 0.5 }}>
              Share as a recommendation
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>
              Pick which groups to share this post with.
            </Typography>

            <Box sx={{ textAlign: 'left', mb: 1.5 }}>
              {groups.map((p) => {
                const Icon = ICON_MAP[p.icon || 'Public'] ?? Public;
                const color = p.color || '#6b7280';
                const count = CONTACT_COUNTS[p.name] ?? 0;
                const isSelected = selected.includes(p.id);
                return (
                  <FormControlLabel
                    key={p.id}
                    control={
                      <Checkbox
                        size="small"
                        checked={isSelected}
                        onChange={() => toggle(p.id)}
                        sx={{
                          p: 0.5,
                          color,
                          '&.Mui-checked': { color },
                        }}
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, flex: 1 }}>
                        <Icon sx={{ fontSize: 14, color }} />
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color }}>
                          {p.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.62rem', color: 'text.disabled', ml: 'auto' }}>
                          {count} {count === 1 ? 'contact' : 'contacts'}
                        </Typography>
                      </Box>
                    }
                    sx={{ display: 'flex', ml: 0, mr: 0, width: '100%', py: 0.25 }}
                  />
                );
              })}
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handleSend}
              disabled={selected.length === 0}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                borderRadius: 2,
                mb: 0.75,
                bgcolor: '#0066CC',
                '&:hover': { bgcolor: '#0052a3' },
              }}
            >
              {selected.length === 0
                ? 'Pick a group'
                : `Send to ${totalContacts} ${totalContacts === 1 ? 'contact' : 'contacts'}`}
            </Button>
            <Button
              fullWidth
              variant="text"
              size="small"
              onClick={onClose}
              sx={{ textTransform: 'none', fontSize: '0.72rem' }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 0.5 }}>
              Recommendation sent
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>
              {totalContacts} {totalContacts === 1 ? 'contact' : 'contacts'} will see this post in their feed as a recommendation from you.
            </Typography>
            <Button
              fullWidth
              variant="text"
              size="small"
              onClick={onClose}
              sx={{ textTransform: 'none', fontSize: '0.72rem' }}
            >
              Close
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
