import { useState } from 'react';
import { Box, Typography, Button, Dialog, DialogContent, TextField } from '@mui/material';
import { Mail, CheckCircle } from '@mui/icons-material';

interface ContactFormDialogProps {
  open: boolean;
  onClose: () => void;
  authorName: string;
  authorEmail: string;
}

export const ContactFormDialog = ({ open, onClose, authorName, authorEmail }: ContactFormDialogProps) => {
  const [name, setName] = useState('Sam Chen');
  const [email, setEmail] = useState('sam@example.com');
  const [message, setMessage] = useState(
    'Loved the piece on co-running the garden — would love to talk about how this maps to the energy co-op I work with.',
  );
  const [sent, setSent] = useState(false);

  const handleClose = () => {
    onClose();
    setTimeout(() => setSent(false), 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { borderRadius: 2, m: 2, maxWidth: 320 } }}>
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
          {sent ? <CheckCircle sx={{ fontSize: 28 }} /> : <Mail sx={{ fontSize: 24 }} />}
        </Box>

        {!sent ? (
          <>
            <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 1.5 }}>
              Get in touch with {authorName}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ textAlign: 'left' }}>
              <TextField
                fullWidth
                size="small"
                label="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 1.5 }}
                slotProps={{ input: { sx: { fontSize: '0.78rem' } } }}
              />
              <TextField
                fullWidth
                size="small"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 1.5 }}
                slotProps={{ input: { sx: { fontSize: '0.78rem' } } }}
              />
              <TextField
                fullWidth
                size="small"
                label="Message"
                multiline
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ mb: 1.5 }}
                slotProps={{ input: { sx: { fontSize: '0.72rem' } } }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: 2,
                  mb: 0.75,
                  bgcolor: '#0066CC',
                  '&:hover': { bgcolor: '#0052a3' },
                }}
              >
                Send message
              </Button>
              <Button
                fullWidth
                variant="text"
                size="small"
                onClick={handleClose}
                sx={{ textTransform: 'none', fontSize: '0.72rem' }}
              >
                Cancel
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Typography sx={{ fontWeight: 800, fontSize: '0.95rem', mb: 0.5 }}>
              Message sent
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', mb: 1.5, lineHeight: 1.5 }}>
              Delivered to <strong>{authorEmail}</strong>. {authorName} will see it in their inbox.
            </Typography>
            <Button
              fullWidth
              variant="text"
              size="small"
              onClick={handleClose}
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
