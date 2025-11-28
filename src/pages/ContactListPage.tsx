import {useState, useEffect, useMemo} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {
  Typography, 
  Box, 
  TextField, 
  InputAdornment, 
  Button, 
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { StandardPage } from '@/components/layout/StandardPage';
import {
  Search as SearchIcon,
  Settings as ManageIcon,
  Add,
  PersonAdd,
  FileUpload,
  Send as InviteIcon,
  Info,
  KeyboardArrowDown,
  ArrowBack
} from '@mui/icons-material';
import {useContacts} from '@/hooks/contacts/useContacts';
import {useContactDragDrop} from '@/hooks/contacts/useContactDragDrop';
import {useRelationshipCategories} from '@/hooks/useRelationshipCategories';
import {
  ContactFilters,
  ContactGrid,
  MergeDialogs,
  FloatingActions
} from '@/components/contacts';
import {resolveFrom} from "@/utils/contactUtils";
import {useMergeContacts} from "@/hooks/contacts/useMergeContacts.ts";

const ContactListPage = () => {
  const currentUserGroupIds = useMemo(() => ['group1', 'group2', 'group3'], []);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // State
  const [isManageMode, setIsManageMode] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addMenuAnchor, setAddMenuAnchor] = useState<null | HTMLElement>(null);
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false);
  const [useAI, setUseAI] = useState(false);
  const [isManualMergeMode, setIsManualMergeMode] = useState(false);
  const [selectedContactsForMerge, setSelectedContactsForMerge] = useState<string[]>([]);
  const [isMerging, setIsMerging] = useState(false);
  const [mergeProgress, setMergeProgress] = useState(0);
  const [isManualMerge, setIsManualMerge] = useState(false);
  const [noDuplicatesFound, setNoDuplicatesFound] = useState(false);

  const {
    contacts,
    contactNuris,
    isLoading,
    isLoadingMore,
    error,
    addFilter,
    clearFilters,
    filters,
    hasMore,
    loadMore,
    totalCount,
    setIconFilter,
    updateContact,
    reloadContacts
  } = useContacts();

  const {getDuplicatedContacts, mergeContacts} = useMergeContacts();
  const {getCategoriesArray, getCategoryIcon} = useRelationshipCategories();

  useEffect(() => {
    addFilter("currentUserGroupIds", currentUserGroupIds);
  }, [addFilter, currentUserGroupIds]);

  // Handle contact categorization from drag and drop
  useEffect(() => {
    const handleContactCategorized = async (event: CustomEvent) => {
      const { contactId, category } = event.detail;
      try {
        await updateContact(contactId, {
          relationshipCategory: category
        });
        console.log(`Updated contact ${contactId} relationship category to ${category}`);
      } catch (error) {
        console.error('Failed to update contact category:', error);
      }
    };

    window.addEventListener('contactCategorized', handleContactCategorized as EventListener);
    
    return () => {
      window.removeEventListener('contactCategorized', handleContactCategorized as EventListener);
    };
  }, [updateContact]);

  // Handle contact interactions
  const handleContactClick = (contactId: string) => {
    if (isManageMode || isManualMergeMode) return;
    navigate(`/contacts/${contactId}`);
  };

  const handleSelectContact = (nuri: string) => {
    if (isManualMergeMode) {
      handleToggleContactForMerge(nuri);
    } else if (isManageMode) {
      handleToggleContactSelection(nuri);
    }
  };

  const handleToggleContactSelection = (contact: string) => {
    setSelectedContacts(prev => {
      const isSelected = prev.some(c => c === contact);
      if (isSelected) {
        return prev.filter(c => c !== contact);
      }
      return [...prev, contact];
    });
  };

  const isContactSelected = (nuri: string) => {
    return selectedContacts.some(c => c === nuri);
  };

  // Add menu handlers
  const handleAddMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAddMenuAnchor(event.currentTarget);
  };

  const handleAddMenuClose = () => {
    setAddMenuAnchor(null);
  };

  const handleAddContact = () => {
    navigate('/contacts/create');
    handleAddMenuClose();
  };

  const handleImportContacts = () => {
    navigate('/import');
    handleAddMenuClose();
  };

  const handleInviteContact = () => {
    // TODO: Implement invite functionality
    console.log('Invite contact');
    handleAddMenuClose();
  };

  // Search handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      addFilter('searchQuery', value.trim());
    } else {
      // Remove search filter if empty
      const newFilters = {...filters};
      delete newFilters.searchQuery;
      clearFilters();
      Object.entries(newFilters).forEach(([key, val]) => {
        if (key !== 'searchQuery') addFilter(key, val);
      });
    }
  };

  // Manage mode handlers
  const handleToggleManageMode = () => {
    setIsManageMode(!isManageMode);
    setSelectedContacts([]);
  };

  // Merge functionality (keeping existing logic)
  const handleMergeContacts = () => setIsMergeDialogOpen(true);
  const handleCloseMergeDialog = () => {
    setIsMergeDialogOpen(false);
    setUseAI(false);
  };

  const handleAutoMerge = () => {
    setIsMergeDialogOpen(false);
    autoMerge();
  };

  const handleManualMerge = () => {
    setIsMergeDialogOpen(false);
    setIsManualMergeMode(true);
  };

  const handleToggleContactForMerge = (contact: string) => {
    setSelectedContactsForMerge(prev => {
      const isSelected = prev.some(c => c === contact);
      if (isSelected) {
        return prev.filter(c => c !== contact);
      }
      return [...prev, contact];
    });
  };

  const isContactSelectedForMerge = (contact: string) => {
    return selectedContactsForMerge.some(c => c === contact);
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
  };

  const dragDrop = useContactDragDrop({
    selectedContactNuris: selectedContacts
  });

  const relationshipCategories = getCategoriesArray().filter(cat => cat.id !== 'uncategorized');

  return (
    <StandardPage 
      title={isManageMode ? 'Manage Contacts' : 'Contacts'}
      actions={!isManageMode ? (
        <>
          <Button
            onClick={handleToggleManageMode}
            sx={{ 
              mr: 1,
              minWidth: { xs: 'auto', md: 'auto' },
              px: { xs: 1, md: 2 },
              border: { xs: 'none', md: '1px solid' },
              borderColor: { md: 'rgba(0, 0, 0, 0.23)' },
              '&:hover': {
                border: { xs: 'none', md: '1px solid' },
                borderColor: { md: 'rgba(0, 0, 0, 0.87)' },
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <ManageIcon sx={{ fontSize: { xs: 20, md: 18 } }} />
            <Box component="span" sx={{ display: { xs: 'none', md: 'inline' }, ml: 1 }}>
              Manage
            </Box>
          </Button>
          <Button
            onClick={handleAddMenuOpen}
            sx={{
              minWidth: { xs: 'auto', md: 'auto' },
              px: { xs: 1, md: 2 },
              backgroundColor: { xs: 'transparent', md: 'primary.main' },
              color: { xs: 'primary.main', md: 'white' },
              border: { xs: 'none', md: 'none' },
              '&:hover': {
                backgroundColor: { xs: 'rgba(25, 118, 210, 0.04)', md: 'primary.dark' }
              }
            }}
          >
            <Add sx={{ fontSize: { xs: 20, md: 18 } }} />
            <Box component="span" sx={{ display: { xs: 'none', md: 'inline' }, ml: 1 }}>
              Add
            </Box>
            <KeyboardArrowDown sx={{ display: { xs: 'none', md: 'inline' }, ml: 0.5, fontSize: 16 }} />
          </Button>
        </>
      ) : (
        <Button
          onClick={handleToggleManageMode}
          sx={{
            minWidth: { xs: 'auto', md: 'auto' },
            px: { xs: 1, md: 2 },
            border: { xs: 'none', md: '1px solid' },
            borderColor: { md: 'rgba(0, 0, 0, 0.23)' },
            '&:hover': {
              border: { xs: 'none', md: '1px solid' },
              borderColor: { md: 'rgba(0, 0, 0, 0.87)' },
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          <ArrowBack sx={{ fontSize: { xs: 20, md: 18 } }} />
          <Box component="span" sx={{ display: { xs: 'none', md: 'inline' }, ml: 1 }}>
            Back
          </Box>
        </Button>
      )}
    >
      {/* Search Bar with Relationship Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel>Relationships</InputLabel>
          <Select
            value={filters.relationshipFilter || 'all'}
            label="Relationships"
            onChange={(e) => addFilter('relationshipFilter', e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            {getCategoriesArray()
              .filter(category => category.id !== 'uncategorized')
              .sort((a, b) => a.name.localeCompare(b.name))
              .map(category => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            <MenuItem value="uncategorized">None</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Relationship Categories - Show in Manage Mode */}
      {isManageMode && (
        <Box sx={{ mb: 3, p: 2, border: 1, borderColor: 'divider', borderRadius: 2 }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 1
          }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
              Relationships
            </Typography>
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <Info fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="caption" sx={{ mb: 2, color: 'text.secondary', display: 'block' }}>
            Drag and drop contacts into a category to automatically set sharing permissions.
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 1 }}>
            {relationshipCategories.map((category) => (
              <Box
                key={category.id}
                onDragOver={(e) => dragDrop.handleDragOver(e, category.id)}
                onDragLeave={dragDrop.handleDragLeave}
                onDrop={(e) => dragDrop.handleDrop(e, category.id)}
                sx={{
                  minHeight: 80,
                  border: 2,
                  borderColor: dragDrop.dragOverCategory === category.id ? category.color : 'divider',
                  borderStyle: dragDrop.dragOverCategory === category.id ? 'solid' : 'dashed',
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  cursor: 'pointer',
                  backgroundColor: dragDrop.dragOverCategory === category.id ? `${category.color}10` : 'transparent',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    borderColor: category.color,
                    backgroundColor: `${category.color}08`,
                  },
                }}
              >
                <Box sx={{ color: category.color, mb: 0.5 }}>
                  {getCategoryIcon(category.id)}
                </Box>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    textAlign: 'center', 
                    fontSize: '0.7rem', 
                    fontWeight: 500
                  }}
                >
                  {category.name}
                </Typography>
                {(category.count ?? 0) > 0 && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: 'text.secondary', 
                      fontSize: '0.6rem',
                      mt: 0.5
                    }}
                  >
                    {category.count}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      )}


      {/* Contact Grid */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
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
              {searchQuery ? 'No contacts found' : 'No contacts yet'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery ? 'Try adjusting your search terms.' : 'Import some contacts to get started!'}
            </Typography>
          </Box>
        ) : (
          <ContactGrid
            contacts={contacts}
            contactNuris={contactNuris}
            isLoading={isLoading}
            error={error}
            isLoadingMore={isLoadingMore}
            onLoadMore={loadMore}
            hasMore={hasMore}
            isSelectionMode={isManageMode}
            isManualMergeMode={isManualMergeMode}
            isMultiSelectMode={isManageMode}
            filters={filters}
            onContactClick={handleContactClick}
            onSelectContact={handleSelectContact}
            isContactSelected={isContactSelected}
            isContactSelectedForMerge={isContactSelectedForMerge}
            onSelectAll={() => {}} // TODO: Implement select all
            hasSelection={selectedContacts.length > 0}
            totalCount={totalCount}
            contactCount={contactNuris.length}
            dragDrop={isManageMode ? dragDrop : undefined}
            onSetIconFilter={setIconFilter}
            onMergeContacts={handleMergeContacts}
          />
        )}
      </Box>
        
      {/* Add Menu */}
        <Menu
          anchorEl={addMenuAnchor}
          open={Boolean(addMenuAnchor)}
          onClose={handleAddMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleAddContact}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            <ListItemText>Add Contact</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleImportContacts}>
            <ListItemIcon>
              <FileUpload fontSize="small" />
            </ListItemIcon>
            <ListItemText>Import Contacts</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleInviteContact}>
            <ListItemIcon>
              <InviteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Invite Contact</ListItemText>
          </MenuItem>
        </Menu>

        {/* Existing Dialogs */}
        <MergeDialogs
          isMergeDialogOpen={isMergeDialogOpen}
          isMerging={isMerging}
          mergeProgress={mergeProgress}
          useAI={useAI}
          isManualMerge={isManualMerge}
          noDuplicatesFound={noDuplicatesFound}
          onCloseMergeDialog={handleCloseMergeDialog}
          onAutoMerge={handleAutoMerge}
          onManualMerge={handleManualMerge}
          onSetUseAI={setUseAI}
        />

        <FloatingActions
          isMultiSelectMode={isManageMode}
          isManualMergeMode={isManualMergeMode}
          selectedContactsCount={selectedContacts.length}
          selectedContactsForMergeCount={selectedContactsForMerge.length}
          onCreateGroup={() => {}} // Remove group functionality
          onMergeSelected={() => {}} // TODO: Implement merge selected
          onCancelManualMerge={() => setIsManualMergeMode(false)}
        />
    </StandardPage>
  );
};

export default ContactListPage;