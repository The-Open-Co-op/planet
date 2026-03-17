import { forwardRef, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  LinearProgress,
  Collapse,
  Switch,
} from '@mui/material';
import {
  Warning,
  DeleteForever,
  Lock,
  Fingerprint,
  Hub,
  Description,
  PhotoLibrary,
  Chat,
  ExpandMore,
  ChevronRight,
  Sync,
  Add,
  FileUpload,
  FileDownload,
} from '@mui/icons-material';
import type { PersonhoodCredentials } from '@/types/personhood';

interface AccountSettingsProps {
  personhoodCredentials: PersonhoodCredentials;
}

interface VaultCategory {
  icon: React.ReactNode;
  label: string;
  items: number;
  size: string;
  color: string;
}

const vaultCategories: VaultCategory[] = [
  { icon: <Fingerprint />, label: 'Your DID', items: 1, size: '2 KB', color: '#0066CC' },
  { icon: <Hub />, label: 'Trust Graph', items: 47, size: '128 KB', color: '#7c3aed' },
  { icon: <Description />, label: 'Documents', items: 12, size: '245 MB', color: '#059669' },
  { icon: <PhotoLibrary />, label: 'Media', items: 487, size: '41.8 GB', color: '#f59e0b' },
  { icon: <Chat />, label: 'Messages', items: 2847, size: '12.1 GB', color: '#8b5cf6' },
];

const totalUsed = 54.4;
const totalCapacity = 256;

export const AccountSettings = forwardRef<HTMLDivElement, AccountSettingsProps>(
  (_, ref) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [backupDialogOpen, setBackupDialogOpen] = useState(false);
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [selectedTier, setSelectedTier] = useState<string | null>(null);

    const handleDeleteAccount = () => {
      setShowDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
      if (deleteConfirmation.toLowerCase() === 'delete my account') {
        alert('Account deletion would be processed. This is a demo.');
        setShowDeleteDialog(false);
        setDeleteConfirmation('');
      }
    };

    const handleCancelDelete = () => {
      setShowDeleteDialog(false);
      setDeleteConfirmation('');
    };

    return (
      <Box ref={ref}>
        {/* Encryption Status */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Lock sx={{ fontSize: 20, color: '#22c55e' }} />
              <Typography variant="body2" sx={{ fontWeight: 600, color: '#22c55e' }}>
                Encryption Active
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Typography variant="caption" color="text.secondary">End-to-end encryption with AES-256</Typography>
              <Typography variant="caption" color="text.secondary">W3C Data Integrity 1.0 proofs</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Storage & Backup */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            {/* Storage bar */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Storage</Typography>
              <Typography variant="caption" color="text.secondary">
                {totalUsed} GB / {totalCapacity} GB
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(totalUsed / totalCapacity) * 100}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'action.hover',
                '& .MuiLinearProgress-bar': { bgcolor: '#0066CC', borderRadius: 3 },
                mb: 2,
              }}
            />

            {/* Laptop sync toggle */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
              borderTop: '1px solid',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}>
              <Typography variant="body2">Sync with your laptop</Typography>
              <Switch size="small" defaultChecked />
            </Box>

            {/* Backup your Vault */}
            <Box sx={{ py: 1.25, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Button
                size="small"
                variant="outlined"
                fullWidth
                startIcon={<Add sx={{ fontSize: 16 }} />}
                onClick={() => setBackupDialogOpen(true)}
                sx={{ textTransform: 'none', fontSize: '0.75rem', borderColor: '#0066CC', color: '#0066CC' }}
              >
                Backup your Vault
              </Button>
            </Box>

            {/* Import / Export */}
            <Box sx={{ display: 'flex', gap: 1, pt: 1.5 }}>
              <Button
                size="small"
                variant="outlined"
                fullWidth
                startIcon={<FileUpload sx={{ fontSize: 16 }} />}
                sx={{ textTransform: 'none', fontSize: '0.75rem', borderColor: '#0066CC', color: '#0066CC' }}
              >
                Import
              </Button>
              <Button
                size="small"
                variant="outlined"
                fullWidth
                startIcon={<FileDownload sx={{ fontSize: 16 }} />}
                sx={{ textTransform: 'none', fontSize: '0.75rem', borderColor: '#0066CC', color: '#0066CC' }}
              >
                Export
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Data Categories */}
        <Card sx={{ mb: 2 }}>
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            {vaultCategories.map((cat, i) => {
              const isExpanded = expandedCategory === cat.label;
              return (
                <Box key={cat.label}>
                  {i > 0 && <Box sx={{ borderTop: '1px solid', borderColor: 'divider' }} />}
                  {cat.label === 'Your DID' ? (
                    <>
                      <Box
                        onClick={() => setExpandedCategory(isExpanded ? null : cat.label)}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1.5,
                          px: 2,
                          py: 1.25,
                          cursor: 'pointer',
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
                      >
                        <Box sx={{ color: cat.color, display: 'flex' }}>
                          {cat.icon}
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {cat.label}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
                          {cat.items} items · {cat.size}
                        </Typography>
                        {isExpanded ? (
                          <ExpandMore fontSize="small" color="action" />
                        ) : (
                          <ChevronRight fontSize="small" color="action" />
                        )}
                      </Box>
                      <Collapse in={isExpanded}>
                        <Box sx={{ px: 2, pb: 1.5, pt: 0.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            p: 1,
                            bgcolor: 'action.hover',
                            borderRadius: 1,
                          }}>
                            <Lock sx={{ fontSize: 14, color: '#22c55e' }} />
                            <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
                              Encrypted and stored locally
                            </Typography>
                          </Box>
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<Sync sx={{ fontSize: 16 }} />}
                            sx={{ textTransform: 'none', fontSize: '0.75rem', alignSelf: 'flex-start' }}
                          >
                            Refresh DID
                          </Button>
                        </Box>
                      </Collapse>
                    </>
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        px: 2,
                        py: 1.25,
                      }}
                    >
                      <Box sx={{ color: cat.color, display: 'flex' }}>
                        {cat.icon}
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {cat.label}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {cat.items} items · {cat.size}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </CardContent>
        </Card>


        {/* Danger Zone */}
        <Card sx={{ border: 1, borderColor: 'error.main' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Warning color="error" sx={{ fontSize: 24 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'error.main' }}>
                  Danger Zone
                </Typography>
              </Box>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Deleting your account will permanently remove all your data, connections, and profile information. This cannot be undone.
            </Typography>

            <Button
              variant="outlined"
              color="error"
              size="small"
              startIcon={<DeleteForever />}
              onClick={handleDeleteAccount}
              sx={{ textTransform: 'none' }}
            >
              Delete My Account
            </Button>
          </CardContent>
        </Card>

        {/* Backup Vault Dialog */}
        <Dialog
          open={backupDialogOpen}
          onClose={() => { setBackupDialogOpen(false); setSelectedProvider(null); setSelectedTier(null); }}
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ pb: 0.5 }}>
            Backup your Vault
            <Typography variant="body2" color="text.secondary">
              Choose a hosting provider and plan
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
              {/* Provider selection */}
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Hosting provider
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { id: 'openco-op', name: 'The Open Co-op', desc: 'UK-based cooperative' },
                  { id: 'firstperson', name: 'First Person Co-op', desc: 'Privacy-first cooperative' },
                  { id: 'danube', name: 'Danube Tech', desc: 'European infrastructure' },
                ].map((provider) => (
                  <Box
                    key={provider.id}
                    onClick={() => setSelectedProvider(provider.id)}
                    sx={{
                      p: 1.5,
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: selectedProvider === provider.id ? '#0066CC' : 'divider',
                      bgcolor: selectedProvider === provider.id ? 'rgba(0,102,204,0.04)' : 'transparent',
                      cursor: 'pointer',
                      '&:hover': { borderColor: '#0066CC' },
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {provider.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {provider.desc}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Pricing tiers */}
              {selectedProvider && (
                <>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Plan
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {[
                      { id: 'basic', price: '£2', label: 'Basic', storage: '10 GB' },
                      { id: 'standard', price: '£5', label: 'Standard', storage: '50 GB' },
                      { id: 'premium', price: '£10', label: 'Premium', storage: '250 GB' },
                    ].map((tier) => (
                      <Box
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        sx={{
                          flex: 1,
                          p: 1.25,
                          borderRadius: 1.5,
                          border: '1px solid',
                          borderColor: selectedTier === tier.id ? '#0066CC' : 'divider',
                          bgcolor: selectedTier === tier.id ? 'rgba(0,102,204,0.04)' : 'transparent',
                          cursor: 'pointer',
                          textAlign: 'center',
                          '&:hover': { borderColor: '#0066CC' },
                        }}
                      >
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#0066CC' }}>
                          {tier.price}
                        </Typography>
                        <Typography variant="caption" sx={{ display: 'block', fontWeight: 500 }}>
                          {tier.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.6rem' }}>
                          {tier.storage} / month
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => { setBackupDialogOpen(false); setSelectedProvider(null); setSelectedTier(null); }}
              color="inherit"
              size="small"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              disabled={!selectedProvider || !selectedTier}
              onClick={() => {
                console.log('Backup selected:', selectedProvider, selectedTier);
                setBackupDialogOpen(false);
                setSelectedProvider(null);
                setSelectedTier(null);
              }}
              sx={{ bgcolor: '#0066CC', '&:hover': { bgcolor: '#004C99' }, textTransform: 'none' }}
            >
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Account Dialog */}
        <Dialog
          open={showDeleteDialog}
          onClose={handleCancelDelete}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ color: 'error.main' }}>
            Delete Account
          </DialogTitle>
          <DialogContent>
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                This action is permanent and cannot be undone!
              </Typography>
              <Typography variant="body2">
                All of your data will be permanently deleted.
              </Typography>
            </Alert>

            <Typography variant="body2" sx={{ mb: 2 }}>
              To confirm, type{' '}
              <Typography component="span" sx={{ fontWeight: 600, fontFamily: 'monospace' }}>
                delete my account
              </Typography>
            </Typography>

            <TextField
              fullWidth
              value={deleteConfirmation}
              onChange={(e) => setDeleteConfirmation(e.target.value)}
              placeholder="delete my account"
              variant="outlined"
              size="small"
            />
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button onClick={handleCancelDelete} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              disabled={deleteConfirmation.toLowerCase() !== 'delete my account'}
              startIcon={<DeleteForever />}
            >
              Delete Account
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
);

AccountSettings.displayName = 'AccountSettings';
