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
import {useContacts, type ContactsFilters} from '@/hooks/contacts/useContacts';
import {useContactDragDrop} from '@/hooks/contacts/useContactDragDrop';
import {useRelationshipCategories} from '@/hooks/useRelationshipCategories';
import {
  ContactGrid,
  MergeDialogs,
  FloatingActions
} from '@/components/contacts';
import {useMergeContacts} from "@/hooks/contacts/useMergeContacts.ts";

const ContactListPage = () => {
  const currentUserGroupIds = useMemo(() => ['group1', 'group2', 'group3'], []);
  const navigate = useNavigate();
  useSearchParams();
  
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
  const [isManualMerge] = useState(false);
  const [noDuplicatesFound, setNoDuplicatesFound] = useState(false);

  const {
    contacts,
    contactNuris,
    isLoading,
    error,
    addFilter,
    clearFilters,
    filters,
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
      console.log(`🔄 Attempting to assign Trust Profile ${category} to contact ${contactId}`);
      
      try {
        // Get current contact to preserve existing assignments
        const currentContact = contacts.find(c => c['@id'] === contactId);
        
        // Only allow Trust Profile assignment for invited/member contacts
        if (currentContact?.planetStatus?.value !== 'member' && currentContact?.planetStatus?.value !== 'invited') {
          console.log(`❌ Cannot assign Trust Profile to non-invited contact ${contactId}. Contact must be invited to PLANET first.`);
          return;
        }
        
        const existingAssignments = currentContact?.rCardAssignments || [];
        
        // Map category names to RCardType
        const categoryToCardType: { [key: string]: string } = {
          'friends': 'Friends',
          'family': 'Family', 
          'community': 'Community',
          'business': 'Business'
        };
        
        const cardType = categoryToCardType[category];
        if (!cardType) {
          console.error(`Unknown category: ${category}`);
          return;
        }
        
        // Check if already assigned
        const isAlreadyAssigned = existingAssignments.some(a => a.cardType === cardType);
        if (isAlreadyAssigned) {
          console.log(`Trust Profile ${cardType} already assigned to contact ${contactId}`);
          return;
        }
        
        // Create new assignment
        const newAssignment = {
          cardType: cardType as any,
          assignedAt: new Date(),
          assignedBy: 'current-user'
        };
        
        const updatedAssignments = [...existingAssignments, newAssignment];
        
        await updateContact(contactId, {
          rCardAssignments: updatedAssignments
        });
        console.log(`✅ Successfully assigned Trust Profile ${cardType} to contact ${contactId}`);
        
        // Reload contacts to reflect the changes
        console.log('🔄 Reloading contacts to show updated Trust Profile assignment...');
        reloadContacts();
      } catch (error) {
        console.error(`❌ Failed to assign Trust Profile for ${contactId}:`, error);
      }
    };

    window.addEventListener('contactCategorized', ((event: Event) => {
      handleContactCategorized(event as CustomEvent);
    }) as EventListener);
    
    return () => {
      window.removeEventListener('contactCategorized', ((event: Event) => {
        handleContactCategorized(event as CustomEvent);
      }) as EventListener);
    };
  }, [updateContact, reloadContacts, contacts]);

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
        if (key !== 'searchQuery') addFilter(key as keyof ContactsFilters, val);
      });
    }
  };

  // Manage mode handlers
  const handleToggleManageMode = () => {
    const newManageMode = !isManageMode;
    setIsManageMode(newManageMode);
    setSelectedContacts([]);
    
    // Filter out ME contact when in manage mode
    addFilter('excludeMe', newManageMode);
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
      title={isManageMode ? (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleToggleManageMode}
            size="small"
            sx={{ 
              mr: 1,
              ml: -1,
              color: 'text.primary'
            }}
          >
            <ArrowBack />
          </IconButton>
          Manage Contacts
        </Box>
      ) : 'Contacts'}
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
              backgroundColor: { xs: 'transparent', md: 'white' },
              color: { xs: 'black', md: 'black' },
              border: { xs: 'none', md: '1px solid black' },
              '&:hover': {
                backgroundColor: { xs: 'rgba(0, 0, 0, 0.04)', md: 'rgba(0, 0, 0, 0.04)' }
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
      ) : null}
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
          isManualMergeMode={isManualMergeMode}
          selectedContactsForMergeCount={selectedContactsForMerge.length}
          onMergeSelected={() => {}} // TODO: Implement merge selected
          onCancelManualMerge={() => setIsManualMergeMode(false)}
        />
    </StandardPage>
  );
};

export default ContactListPage;