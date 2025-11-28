import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
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

    // For Contacts, show native permission request
    if (selectedSource.name === 'Contacts') {
      setIsDialogOpen(false);
      setIsImporting(true);
      startImportProcess();
      return;
    }

    // For LinkedIn/Gmail, validate credentials first
    if ((selectedSource.name === 'LinkedIn' || selectedSource.name === 'Gmail') &&
      (!loginCredentials.email || !loginCredentials.password)) {
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
            navigate('/contacts');
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
    <Box sx={{height: '100%'}}>
      <Box sx={{mb: 4}}>
        <Typography variant="h4" component="h1" gutterBottom sx={{fontWeight: 700}}>
          Import Your Contacts
        </Typography>
        <Typography variant="body1" sx={{color: 'text.secondary'}}>
          Choose a source to import your contacts from
        </Typography>
      </Box>

      <Box sx={{p: {xs: 2, md: 0}}}>
        <Grid container spacing={3}>
          {importSources.map((source) => (
            <Grid size={{xs: 12, md: 4}} key={source.type}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease-in-out',
                  border: 1,
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4,
                    borderColor: 'primary.main',
                  }
                }}
              >
                <CardContent sx={{flexGrow: 1, textAlign: 'center', p: 3}}>
                  <Box sx={{mb: 3}}>
                    {getSourceIcon(source.type)}
                  </Box>
                  <Typography variant="h6" component="h2" gutterBottom sx={{fontWeight: 600}}>
                    {source.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.6}}>
                    {source.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{justifyContent: 'center', p: 3, pt: 0}}>
                  <Button
                    variant="contained"
                    onClick={() => handleImportClick(source)}
                    disabled={!source.isAvailable}
                    startIcon={<CloudDownload/>}
                    sx={{borderRadius: 2}}
                  >
                    {source.customButtonName ? source.customButtonName : "Import from " + source.name}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Platform-specific import dialogs */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedSource?.name === 'Contacts'
            ? 'Allow NAO Access to Contacts'
            : `Sign in to ${selectedSource?.name}`
          }
        </DialogTitle>
        <DialogContent>
          {selectedSource?.name === 'Contacts' ? (
            <Box sx={{py: 2}}>
              <Typography variant="body1" sx={{mb: 2}}>
                NAO would like to access your contacts to import them into your network.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This will help you connect with people you already know on NAO.
              </Typography>
            </Box>
          ) : (
            <Box sx={{py: 2}}>
              <Typography variant="body1" sx={{mb: 3}}>
                Sign in to your {selectedSource?.name} account to import your contacts.
              </Typography>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={loginCredentials.email}
                onChange={(e) => setLoginCredentials(prev => ({...prev, email: e.target.value}))}
                sx={{mb: 2}}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
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
            disabled={selectedSource?.name !== 'Contacts' && (!loginCredentials.email || !loginCredentials.password)}
          >
            {selectedSource?.name === 'Contacts' ? 'Allow Access' : 'Sign In & Import'}
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
    </Box>
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