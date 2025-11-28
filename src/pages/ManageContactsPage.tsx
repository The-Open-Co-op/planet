import {useState, useEffect, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {Typography, Box, Button, Checkbox, useTheme, useMediaQuery, Divider, IconButton} from '@mui/material';
import {ArrowBack, CallMerge, Info} from '@mui/icons-material';
import {useContacts} from '@/hooks/contacts/useContacts';
import {useContactDragDrop} from '@/hooks/contacts/useContactDragDrop';
import {ContactCard, MergeDialogs} from '@/components/contacts';
import {Grid} from '@mui/system';
import {Waypoint} from 'react-waypoint';
import {useMergeContacts} from "@/hooks/contacts/useMergeContacts";
import {useRelationshipCategories} from '@/hooks/useRelationshipCategories';

const ManageContactsPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currentUserGroupIds = useMemo(() => ['group1', 'group2', 'group3'], []);
  const {getCategoriesArray, getCategoryIcon} = useRelationshipCategories();

  const {
    contacts,
    contactNuris,
    isLoading,
    isLoadingMore,
    error,
    addFilter,
    hasMore,
    loadMore,
    updateContact,
    reloadContacts
  } = useContacts();

  const {getDuplicatedContacts, mergeContacts} = useMergeContacts();

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [isManualMerge, setIsManualMerge] = useState(false);
  const [noDuplicatesFound, setNoDuplicatesFound] = useState(false);

  useEffect(() => {
    addFilter("currentUserGroupIds", currentUserGroupIds);
  }, [addFilter, currentUserGroupIds]);

  useEffect(() => {
    const handleContactCategorized = (event: CustomEvent) => {
      const {contactId, category} = event.detail;
      updateContact(contactId, {relationshipCategory: category});
      setSelectedContacts([]);
    };

    window.addEventListener('contactCategorized', handleContactCategorized as EventListener);
    return () => {
      window.removeEventListener('contactCategorized', handleContactCategorized as EventListener);
    };
  }, [updateContact]);

  const handleToggleContactSelection = (contact: string) => {
    setSelectedContacts(prev => {
      const isSelected = prev.some(c => c === contact);
      if (isSelected) {
        return prev.filter(c => c !== contact);
      }
      return [...prev, contact];
    });
  };

  const hasSelection = selectedContacts.length > 0;

  const handleSelectAll = () => {
    if (hasSelection) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contactNuris);
    }
  };

  const isContactSelected = (nuri: string) => {
    return selectedContacts.some(c => c === nuri);
  };

  const handleMergeContacts = () => {
    if (selectedContacts.length >= 2) {
      // If contacts are selected, merge them directly
      startMergeProcess(selectedContacts);
      setSelectedContacts([]);
    } else {
      // If no contacts selected, show the dialog
      setIsMergeDialogOpen(true);
    }
  };
  const handleCloseMergeDialog = () => {
    setIsMergeDialogOpen(false);
    setUseAI(false);
  };

  const handleAutoMerge = () => {
    setIsMergeDialogOpen(false);
    autoMerge();
  };

  const autoMerge = () => {
    setIsMerging(true);
    setMergeProgress(0);
    (async () => {
      const duplicatedContacts = await getDuplicatedContacts();
      if (duplicatedContacts.length === 0) {
        setNoDuplicatesFound(true);
        setMergeProgress(100);
        setTimeout(() => {
          setIsMerging(false);
          setNoDuplicatesFound(false);
        }, 2000);
        return;
      }
      setMergeProgress(50);
      const interval = Math.ceil(50 / duplicatedContacts.length);
      for (const contactsToMerge of duplicatedContacts) {
        await mergeContacts(contactsToMerge);
        setMergeProgress(prev => Math.min(prev + interval, 99));
      }
      reloadContacts();
      setMergeProgress(100);
      setIsMerging(false);
    })();
  }

  const startMergeProcess = (contactsToMerge: string[]) => {
    setIsMerging(true);
    setMergeProgress(0);
    setIsManualMerge(true);

    // Simulate merge process
    (async () => {
      try {
        await mergeContacts(contactsToMerge);
        setMergeProgress(100);
        reloadContacts();
        setTimeout(() => {
          setIsMerging(false);
          setIsManualMerge(false);
        }, 1000);
      } catch (error) {
        console.error('Error merging contacts:', error);
        setIsMerging(false);
        setIsManualMerge(false);
      }
    })();
  };


  const dragDrop = useContactDragDrop({
    selectedContactNuris: selectedContacts
  });



  return (
    <Box sx={{
      height: {md: 'calc(100vh - 100px)', xs: '100vh'},
      width: '100%',
      maxWidth: {xs: '100vw', md: '100%'},
      overflow: 'hidden',
      boxSizing: 'border-box',
      p: {xs: 2, md: 2},
      mx: {xs: 0, md: 'auto'},
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Main Content Area */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          borderBottom: 1,
          borderColor: 'divider',
          pb: 2,
          flexShrink: 0
        }}>
          <Button
            startIcon={<ArrowBack/>}
            onClick={() => navigate('/contacts')}
            sx={{
              textTransform: 'none',
              color: 'text.primary',
              minWidth: { xs: 'auto', md: 'auto' },
              px: { xs: 1, md: 2 }
            }}
          >
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              Back to Contacts
            </Box>
          </Button>
          <Typography variant="h5" sx={{flexGrow: 1}}>
            Manage Contacts
          </Typography>
        </Box>

        {/* Mobile Relationships Section */}
        {isMobile && (
          <Box sx={{ px: 2, pt: 0, pb: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              mb: 0.5 
            }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: '0.8rem' }}>
                Relationships
              </Typography>
              <IconButton
                size="small" 
                onClick={() => console.log('Info clicked')}
                sx={{ 
                  color: 'text.secondary',
                  p: 0.25,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                <Info sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
            <Typography variant="caption" sx={{ mb: 1, color: 'text.secondary', fontSize: '0.65rem', lineHeight: 1.1, display: 'block' }}>
              Drag and drop contacts into a category to automatically set sharing permissions.
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0.75, mb: 1 }}>
              {getCategoriesArray().filter(cat => cat.id !== 'uncategorized').map((category) => (
                <Box
                  key={category.id}
                  data-category-id={category.id}
                  onDragOver={(e) => dragDrop.handleDragOver(e, category.id)}
                  onDragLeave={dragDrop.handleDragLeave}
                  onDrop={(e) => dragDrop.handleDrop(e, category.id)}
                  sx={{
                    minHeight: 50,
                    border: 2,
                    borderColor: dragDrop.dragOverCategory === category.id ? category.color : 'divider',
                    borderStyle: dragDrop.dragOverCategory === category.id ? 'solid' : 'dashed',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 0.5,
                    cursor: 'pointer',
                    backgroundColor: dragDrop.dragOverCategory === category.id ? `${category.color}10` : 'transparent',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: category.color,
                      backgroundColor: `${category.color}08`,
                    },
                  }}
                >
                  <Box sx={{ color: category.color, mb: 0.25 }}>
                    {getCategoryIcon(category.id)}
                  </Box>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      textAlign: 'center', 
                      fontSize: '0.6rem', 
                      fontWeight: 500,
                      lineHeight: 1.1
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ mb: 0.5 }} />
          </Box>
        )}

        {/* Actions Bar */}
        <Box sx={{
          mb: { xs: 1, md: 2 },
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, md: 2 },
          flexWrap: 'wrap',
          flexShrink: 0,
          minHeight: { xs: 36, md: 'auto' }
        }}>
        <Button
          variant="text"
          onClick={handleSelectAll}
          size="small"
          sx={{
            fontSize: { xs: '0.8rem', md: '0.875rem' },
            textTransform: 'none',
            color: 'primary.main',
            fontWeight: 500,
            minHeight: { xs: 32, md: 'auto' },
            py: { xs: 0.5, md: 1 }
          }}
        >
          {hasSelection ? 'Deselect All' : 'Select All'}
        </Button>

        <Box sx={{flexGrow: 1}}/>

        <Button
          variant="contained"
          startIcon={<CallMerge/>}
          onClick={handleMergeContacts}
          size={isMobile ? 'small' : 'medium'}
          sx={{
            textTransform: 'none',
            fontSize: { xs: '0.8rem', md: '0.875rem' },
            minHeight: { xs: 32, md: 'auto' },
            py: { xs: 0.5, md: 1 }
          }}
        >
          Merge Contacts
        </Button>
      </Box>



        {/* Drag Feedback */}
        {dragDrop.draggedContactNuri && (
          <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            px: 3,
            py: 1.5,
            borderRadius: 3,
            fontSize: '1.1rem',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            zIndex: 10000,
            pointerEvents: 'none',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '2px solid rgba(255,255,255,0.2)',
            animation: 'pulse 1.5s ease-in-out infinite'
          }}>
            {dragDrop.dragOverCategory 
              ? `Add to ${dragDrop.getCategoryDisplayName(dragDrop.dragOverCategory)}`
              : 'Drag to a category'
            }
          </Box>
        )}

        {/* Contact List */}
        <Box 
          sx={{
            flex: 1,
            overflow: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px'
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '4px',
              '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.3)'
              }
            }
          }}>
        {error ? (
          <Box sx={{textAlign: 'center', py: 8}}>
            <Typography variant="h6" color="error" gutterBottom>
              Error loading contacts
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {error.message}
            </Typography>
          </Box>
        ) : isLoading ? (
          <Box sx={{textAlign: 'center', py: 8}}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Loading contacts...
            </Typography>
          </Box>
        ) : contactNuris.length === 0 ? (
          <Box sx={{textAlign: 'center', py: 8}}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No contacts yet
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={1}>
            {contactNuris.map((nuri) => (
              <Grid size={{xs: 12}} key={nuri}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                  <Checkbox
                    checked={isContactSelected(nuri)}
                    onChange={() => handleToggleContactSelection(nuri)}
                    sx={{
                      mt: 0.5,
                      p: 0.5,
                      '& .MuiSvgIcon-root': {fontSize: 20}
                    }}
                  />
                  <ContactCard
                    contacts={contacts}
                    nuri={nuri}
                    isSelectionMode={false}
                    isManualMergeMode={false}
                    isMultiSelectMode={true}
                    isSelected={isContactSelected(nuri)}
                    onContactClick={() => {}}
                    onSelectContact={() => handleToggleContactSelection(nuri)}
                    dragDrop={dragDrop}
                    onSetIconFilter={() => {}}
                  />
                </Box>
              </Grid>
            ))}

            {/* Infinite scroll waypoint */}
            {hasMore && !isLoading && !isLoadingMore && (
              <Waypoint onEnter={loadMore}/>
            )}
          </Grid>
        )}
        </Box>

        <MergeDialogs
          isMergeDialogOpen={isMergeDialogOpen}
          isMerging={isMerging}
          mergeProgress={mergeProgress}
          useAI={useAI}
          isManualMerge={isManualMerge}
          noDuplicatesFound={noDuplicatesFound}
          onCloseMergeDialog={handleCloseMergeDialog}
          onAutoMerge={handleAutoMerge}
          onSetUseAI={setUseAI}
          onManualMerge={() => {}}
        />
      </Box>
    </Box>
  );
};

export default ManageContactsPage;