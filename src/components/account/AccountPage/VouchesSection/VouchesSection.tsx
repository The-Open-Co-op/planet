import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  alpha,
  useTheme,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import {
  VerifiedUser,
  CheckCircle,
  Cancel,
  Edit,
} from '@mui/icons-material';
import type { Vouch } from '@/types/notification';
import type { RCardType } from '@/types/rcard';

interface ReceivedVouch extends Vouch {
  status: 'accepted' | 'rejected';
  assignedToCards?: RCardType[];
  /** Resolved display name for the issuer */
  issuerName?: string;
  /** Avatar URL for the issuer */
  issuerAvatar?: string;
}

interface VouchesSectionProps {
  cardName: string;
}

export const VouchesSection = ({ cardName }: VouchesSectionProps) => {
  const theme = useTheme();
  const [editingVouch, setEditingVouch] = useState<ReceivedVouch | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedCards, setSelectedCards] = useState<RCardType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<'accepted' | 'rejected'>('accepted');

  // Mock vouch data - filtered for this specific card
  const [receivedVouches, setReceivedVouches] = useState<ReceivedVouch[]>([
    {
      id: 'v1',
      issuer: 'user-456',
      subject: 'did:example:currentuser',
      trustArea: 'React Development',
      confidenceScore: 0.95,
      comment: 'Exceptional React skills and clean code practices. Always delivers high-quality components.',
      issuanceDate: '2026-03-09T14:30:00Z',
      status: 'accepted',
      assignedToCards: ['Business', 'Community'],
      issuerName: 'Sarah Johnson',
      issuerAvatar: '/api/placeholder/40/40',
    },
    {
      id: 'v2',
      issuer: 'user-789',
      subject: 'did:example:currentuser',
      trustArea: 'Leadership',
      confidenceScore: 0.88,
      comment: 'Great leadership skills during challenging projects.',
      issuanceDate: '2026-03-02T10:00:00Z',
      status: 'accepted',
      assignedToCards: ['Family'],
      issuerName: 'Mike Chen',
      issuerAvatar: '/api/placeholder/40/40',
    },
  ]);

  // Filter vouches for this specific card
  const filteredVouches = receivedVouches.filter(vouch =>
    vouch.status === 'accepted' && vouch.assignedToCards?.includes(cardName as RCardType)
  );

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const getTopicTag = (vouch: ReceivedVouch) => {
    const skill = vouch.trustArea.toLowerCase();
    if (skill.includes('react')) return 'React';
    if (skill.includes('leadership')) return 'Leadership';
    if (skill.includes('typescript')) return 'TypeScript';
    if (skill.includes('javascript')) return 'JavaScript';
    if (skill.includes('python')) return 'Python';
    if (skill.includes('design')) return 'Design';
    if (skill.includes('management')) return 'Management';
    return vouch.trustArea; // fallback to full trust area name
  };

  const handleEditVouch = (vouch: ReceivedVouch) => {
    setEditingVouch(vouch);
    setSelectedCards(vouch.assignedToCards || []);
    setSelectedStatus(vouch.status);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    if (editingVouch) {
      const updatedVouch = {
        ...editingVouch,
        status: selectedStatus,
        assignedToCards: selectedStatus === 'accepted' ? selectedCards : undefined
      };

      // Update local state
      setReceivedVouches(prev =>
        prev.map(v => v.id === editingVouch.id
          ? { ...v, status: selectedStatus, assignedToCards: selectedStatus === 'accepted' ? selectedCards : undefined }
          : v
        )
      );

      console.log('Updated vouch status and rCard assignments:', updatedVouch);
    }
    setShowEditDialog(false);
    setEditingVouch(null);
    setSelectedCards([]);
    setSelectedStatus('accepted');
  };

  const handleCardSelectionChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedCards(typeof value === 'string' ? value.split(',') as RCardType[] : value as RCardType[]);
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Vouches for {cardName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Vouches assigned to this profile card
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Received Vouches for this card */}
          {filteredVouches.map((vouch) => (
            <Box key={vouch.id}>
              <Box sx={{
                display: 'flex',
                gap: 2,
                p: 2,
                bgcolor: alpha(theme.palette.success.main, 0.04),
                borderRadius: 2,
                border: 1,
                borderColor: alpha(theme.palette.success.main, 0.2),
              }}>
                <Avatar src={vouch.issuerAvatar} sx={{ width: 40, height: 40 }}>
                  {(vouch.issuerName || vouch.issuer).charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    <VerifiedUser sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {vouch.trustArea}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      • {formatRelativeTime(new Date(vouch.issuanceDate))}
                    </Typography>
                    <Box sx={{ ml: 'auto', display: 'flex', gap: 0.5 }}>
                      <CheckCircle sx={{ color: 'success.main', fontSize: 18 }} />
                      <IconButton size="small" onClick={() => handleEditVouch(vouch)}>
                        <Edit sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        "{vouch.comment}" - <strong>{vouch.issuerName || vouch.issuer}</strong>
                      </Typography>
                      <Chip
                        label={getTopicTag(vouch)}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}

          {/* Empty state */}
          {filteredVouches.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                No vouches assigned to this profile card yet.
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onClose={() => setShowEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          Edit Vouch
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {editingVouch && (
              <>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                  {editingVouch.trustArea}
                </Typography>

                {/* Status Selection */}
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={selectedStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value as 'accepted' | 'rejected';
                      setSelectedStatus(newStatus);
                      // Clear cards when changing to rejected
                      if (newStatus === 'rejected') {
                        setSelectedCards([]);
                      }
                    }}
                    input={<OutlinedInput label="Status" />}
                  >
                    <MenuItem value="accepted">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                        Accepted
                      </Box>
                    </MenuItem>
                    <MenuItem value="rejected">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Cancel sx={{ color: 'error.main', fontSize: 20 }} />
                        Rejected
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>

                {/* rCard Assignment - only show if status is accepted */}
                {selectedStatus === 'accepted' && (
                  <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Select which rCards this vouch should appear on:
                    </Typography>

                    <FormControl fullWidth>
                      <InputLabel>rCards</InputLabel>
                      <Select<RCardType[]>
                        multiple
                        value={selectedCards}
                        onChange={handleCardSelectionChange}
                        input={<OutlinedInput label="rCards" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} size="small" />
                            ))}
                          </Box>
                        )}
                      >
                        {(['Friends', 'Family', 'Community', 'Business'] as RCardType[]).map((card) => (
                          <MenuItem key={card} value={card}>
                            {card}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </>
                )}

                {selectedStatus === 'rejected' && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                    Rejected vouches will not appear on any rCards.
                  </Typography>
                )}
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
