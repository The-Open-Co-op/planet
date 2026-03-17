import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Checkbox,
  Radio,
  RadioGroup,
  Typography,
  Box,
  Chip,
  alpha,
} from '@mui/material';
import { useTrustProfiles } from '@/hooks/useTrustProfiles';
import * as Icons from '@mui/icons-material';

interface RCardSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (rCardIds: string[]) => void;
  contactName?: string;
  multiSelect?: boolean;
  title?: string;
  description?: string;
  submitLabel?: string;
}

export const RCardSelectionModal = ({
  open,
  onClose,
  onSelect,
  contactName,
  multiSelect = true,
  title: customTitle,
  description: customDescription,
  submitLabel,
}: RCardSelectionModalProps) => {
  const { activeProfiles } = useTrustProfiles();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);

  const handleConfirm = () => {
    onSelect(selectedCards);
    onClose();
  };

  const handleToggleCard = (cardId: string) => {
    if (multiSelect) {
      setSelectedCards(prev =>
        prev.includes(cardId)
          ? prev.filter(id => id !== cardId)
          : [...prev, cardId]
      );
    } else {
      setSelectedCards([cardId]);
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCards([event.target.value]);
  };

  const handleSelectAll = () => {
    setSelectedCards(activeProfiles.map(p => p.id));
  };

  const handleDeselectAll = () => {
    setSelectedCards([]);
  };

  const allSelected = selectedCards.length === activeProfiles.length;

  const getIcon = (iconName: string, size = 18) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon sx={{ fontSize: size }} /> : <Icons.PersonOutline sx={{ fontSize: size }} />;
  };

  const firstName = contactName?.split(' ')[0] || contactName;

  const ProfileOption = ({ card, selected, onClick }: {
    card: typeof activeProfiles[0];
    selected: boolean;
    onClick: () => void;
  }) => {
    const cardColor = card.color || '#6b7280';
    return (
      <Box
        onClick={onClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          py: 1,
          px: 0.5,
          cursor: 'pointer',
          borderRadius: 1,
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        {multiSelect ? (
          <Checkbox checked={selected} size="small" sx={{ p: 0.5 }} />
        ) : (
          <Radio checked={selected} size="small" sx={{ p: 0.5 }} />
        )}
        <Chip
          icon={getIcon(card.icon || 'PersonOutline', 16) || undefined}
          label={card.name}
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: alpha(cardColor, 0.08),
            borderColor: alpha(cardColor, 0.2),
            color: cardColor,
            fontWeight: 500,
            '& .MuiChip-icon': { color: cardColor },
            pointerEvents: 'none',
          }}
        />
      </Box>
    );
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ pb: 0.5 }}>
        {customTitle || 'Assign to...'}
        {(customDescription || contactName) && (
          <Typography variant="body2" color="text.secondary">
            {customDescription || `Assign ${firstName}'s Vouch to your profiles:`}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Box>
          {multiSelect && (
            <Box
              onClick={allSelected ? handleDeselectAll : handleSelectAll}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 0.5,
                px: 0.5,
                cursor: 'pointer',
                borderRadius: 1,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <Checkbox
                checked={allSelected}
                indeterminate={selectedCards.length > 0 && selectedCards.length < activeProfiles.length}
                size="small"
                sx={{ p: 0.5 }}
              />
              <Typography variant="body2" fontWeight={600}>
                Select All
              </Typography>
            </Box>
          )}
          {multiSelect ? (
            activeProfiles.map((card) => (
              <ProfileOption
                key={card.id}
                card={card}
                selected={selectedCards.includes(card.id)}
                onClick={() => handleToggleCard(card.id)}
              />
            ))
          ) : (
            <RadioGroup
              value={selectedCards[0] || ''}
              onChange={handleRadioChange}
            >
              {activeProfiles.map((card) => (
                <ProfileOption
                  key={card.id}
                  card={card}
                  selected={selectedCards[0] === card.id}
                  onClick={() => setSelectedCards([card.id])}
                />
              ))}
            </RadioGroup>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          disabled={selectedCards.length === 0}
        >
          {submitLabel || 'Assign'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
