import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  LinearProgress
} from '@mui/material';
import {CloudDownload} from '@mui/icons-material';
import {StandardPage} from '@/components/layout/StandardPage';
import {dataService} from '@/services/dataService';
import type {Contact} from '@/types/contact';
import {isNextGraphEnabled} from '@/utils/featureFlags';
import {useSaveContacts} from '@/hooks/contacts/useSaveContacts';
import {ImportSourceConfig, ImportSourceRegistry} from '@/utils/importSourceRegistry';

// NextGraph-enabled import component
const NextGraphImportPage = () => {
  const {saveContacts} = useSaveContacts();

  return <ImportPageContent saveContactsFn={saveContacts} isNextGraph={true}/>;
};

// Mock mode import component
const MockImportPage = () => {
  const mockSaveContacts = async () => {
    // No-op for mock mode
  };

  return <ImportPageContent saveContactsFn={mockSaveContacts} isNextGraph={false}/>;
};

// Main import page logic
const ImportPageContent = ({saveContactsFn, isNextGraph}: {
  saveContactsFn: (contacts: Contact[]) => Promise<void>,
  isNextGraph: boolean
}) => {
  const [importSources, setImportSources] = useState<ImportSourceConfig[]>([]);
  const [selectedSource, setSelectedSource] = useState<ImportSourceConfig | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setImportComplete] = useState(false);
  const [, setImportedCount] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [loginCredentials, setLoginCredentials] = useState({email: '', password: ''});
  const navigate = useNavigate();

  useEffect(() => {
    const sources = ImportSourceRegistry.getAllSources();
    setImportSources(sources);
  }, []);

  const handleImportClick = (source: ImportSourceConfig) => {
    setSelectedSource(source);
    setIsDialogOpen(true);
  };

  const handleConfirmImport = async () => {
    if (!selectedSource) return;

    // For Contacts and Mock Data, import directly
    if (selectedSource.type === 'contacts' || selectedSource.type === 'mockdata') {
      setIsDialogOpen(false);
      setIsImporting(true);
      startImportProcess();
      return;
    }

    // For LinkedIn/Gmail, validate credentials first
    if (!loginCredentials.email || !loginCredentials.password) {
      return;
    }

    setIsDialogOpen(false);
    setIsImporting(true);
    startImportProcess();
  };

  const startImportProcess = async () => {
    setImportProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setImportProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setIsImporting(false);
            navigate('/contacts', { state: { refresh: true } });
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    try {
      if (selectedSource!.type === 'mockdata') {
        const socialContacts = await dataService.getContacts(false);
        socialContacts.forEach(el => {
            delete el["@id"];
          }
        );

        if (isNextGraph) {
          await saveContactsFn(socialContacts);
          // Add a small delay to ensure NextGraph has processed the data
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        // For mock mode, no additional persistence needed
        setImportedCount(socialContacts.length);
      } else {
        const importedContacts = await dataService.importFromSource(selectedSource!.type);
        setImportedCount(importedContacts.length);
      }

      setImportComplete(true);
      setIsLoading(false);

      setTimeout(() => {
        setIsDialogOpen(false);
        // Navigate and force a refresh by adding a timestamp
        navigate(`/contacts?refreshed=${Date.now()}`);
      }, 2000);
    } catch (error) {
      console.error('Import failed:', error);
      clearInterval(progressInterval);
      setIsImporting(false);
    }
  };

  const handleCloseDialog = () => {
    if (!isLoading) {
      setIsDialogOpen(false);
      setSelectedSource(null);
      setImportComplete(false);
      setImportedCount(0);
      setLoginCredentials({email: '', password: ''});
    }
  };

  const getSourceIcon = (sourceId: string) => {
    const icon = ImportSourceRegistry.getIcon(sourceId);
    if (icon) {
      return React.cloneElement(icon, {sx: {fontSize: 40}});
    }
    return <CloudDownload sx={{fontSize: 40}}/>;
  };

  return (
    <StandardPage title="Import">
      <Typography variant="body2" sx={{color: 'text.secondary', mb: 2}}>
        Choose a source to import your contacts from
      </Typography>

      <Grid container spacing={2}>
        {importSources.map((source) => (
          <Grid size={{xs: 12, md: 4}} key={source.type}>
            <Card
              onClick={() => source.isAvailable && handleImportClick(source)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
                cursor: source.isAvailable ? 'pointer' : 'default',
                opacity: source.isAvailable ? 1 : 0.5,
                transition: 'all 0.2s ease-in-out',
                '&:hover': source.isAvailable ? {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover',
                } : {},
              }}
            >
              <Box sx={{ display: 'flex', flexShrink: 0 }}>
                {getSourceIcon(source.type)}
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {source.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {source.description}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Platform-specific import dialogs */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedSource?.type === 'contacts'
            ? 'Import Mobile Contacts'
            : selectedSource?.type === 'mockdata'
            ? 'Load Sample Data'
            : `Sign in to ${selectedSource?.name}`
          }
        </DialogTitle>
        <DialogContent>
          {selectedSource?.type === 'contacts' ? (
            <Box sx={{py: 1}}>
              <Typography variant="body2" sx={{mb: 1}}>
                PLANET will request access to your phone's contacts to import them into your vault.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Your contacts stay on your device and are encrypted in your personal vault. They are never shared without your permission.
              </Typography>
            </Box>
          ) : selectedSource?.type === 'mockdata' ? (
            <Box sx={{py: 1}}>
              <Typography variant="body2" sx={{mb: 1}}>
                This will load a set of sample contacts for testing and demonstration purposes.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Sample data includes fictional contacts with vouches and trust profile assignments. You can clear this data at any time.
              </Typography>
            </Box>
          ) : (
            <Box sx={{py: 1}}>
              <Typography variant="body2" sx={{mb: 2}}>
                Sign in to your {selectedSource?.name} account to import your contacts.
              </Typography>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                size="small"
                value={loginCredentials.email}
                onChange={(e) => setLoginCredentials(prev => ({...prev, email: e.target.value}))}
                sx={{mb: 1.5}}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                size="small"
                value={loginCredentials.password}
                onChange={(e) => setLoginCredentials(prev => ({...prev, password: e.target.value}))}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleConfirmImport}
            variant="contained"
            disabled={selectedSource?.type !== 'contacts' && selectedSource?.type !== 'mockdata' && (!loginCredentials.email || !loginCredentials.password)}
          >
            {selectedSource?.type === 'contacts' ? 'Allow Access'
              : selectedSource?.type === 'mockdata' ? 'Load Data'
              : 'Sign In & Import'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Full-screen importing overlay */}
      <Dialog
        open={isImporting}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column'
          }
        }}
      >
        <Box sx={{p: 3, borderBottom: 1, borderColor: 'divider'}}>
          <Typography variant="h5" sx={{mb: 2, fontWeight: 600}}>
            Importing Contacts
          </Typography>
          <LinearProgress
            variant="determinate"
            value={importProgress}
            sx={{height: 8, borderRadius: 4}}
          />
          <Typography variant="body2" color="text.secondary" sx={{mt: 1}}>
            {Math.round(importProgress)}% complete
          </Typography>
        </Box>

        <Box sx={{
          flex: 1,
          backgroundColor: 'grey.900',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white'
        }}>
          <Typography variant="h6">
            Video Placeholder
          </Typography>
        </Box>
      </Dialog>
    </StandardPage>
  );
};

// Main wrapper component that chooses between NextGraph and Mock modes
const ImportPage = () => {
  const isNextGraph = isNextGraphEnabled();

  if (isNextGraph) {
    return <NextGraphImportPage/>;
  }

  return <MockImportPage/>;
};

export default ImportPage;