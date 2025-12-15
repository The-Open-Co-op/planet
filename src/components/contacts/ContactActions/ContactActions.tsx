import { forwardRef, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material';
import {
  VerifiedUser,
  PersonSearch
} from '@mui/icons-material';
import type { Contact } from '@/types/contact';

export interface ContactActionsProps {
  contact?: Contact | null;
  onConfirmHumanity?: () => void;
}

export const ContactActions = forwardRef<HTMLDivElement, ContactActionsProps>(
  ({ contact, onConfirmHumanity }, ref) => {
    const [humanityDialogOpen, setHumanityDialogOpen] = useState(false);

    if (!contact) return null;


    const handleConfirmHumanity = () => {
      setHumanityDialogOpen(false);
      onConfirmHumanity?.();
    };

    return (
      <Box ref={ref}>

        {/* Humanity Confirmation Dialog */}
        <Dialog
          open={humanityDialogOpen}
          onClose={() => setHumanityDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PersonSearch color="primary" />
            Human Verification Confirmation
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ mb: 2 }}>
              I confirm that I have met this person and that they are human
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This will set their humanity confidence score to level 5 (Verified Human) and indicates 
              you have had direct, in-person confirmation of their identity.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 1 }}>
            <Button 
              onClick={() => setHumanityDialogOpen(false)}
              variant="outlined"
              color="inherit"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmHumanity}
              variant="contained"
              color="primary"
              startIcon={<VerifiedUser />}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
);

ContactActions.displayName = 'ContactActions';