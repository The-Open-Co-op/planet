import {
  Box,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Search,
  Sort,
  SortByAlpha,
  Business,
  TrendingUp,
  LocationOn,
  Label
} from '@mui/icons-material';
import {useState, useCallback, useRef, useEffect} from 'react';
import type {ContactsFilters} from '@/hooks/contacts/useContacts';
import {useRelationshipCategories} from '@/hooks/useRelationshipCategories';

interface DesktopFiltersProps {
  filters: ContactsFilters;
  onAddFilter: (key: keyof ContactsFilters, value: ContactsFilters[keyof ContactsFilters]) => void;
  onClearFilters: () => void;
  showClearFilters?: boolean;
}

export const ContactFiltersDesktop = ({
                                        filters,
                                        onAddFilter,
                                        onClearFilters,
                                        showClearFilters
                                      }: DesktopFiltersProps) => {
  const [sortMenuAnchor, setSortMenuAnchor] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState(filters.searchQuery || '');
  const {getMenuItems} = useRelationshipCategories();
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debouncedSearchChange = useCallback((value: string) => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onAddFilter('searchQuery', value);
    }, 300);
  }, [onAddFilter]);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    debouncedSearchChange(value);
  };

  useEffect(() => {
    setSearchValue(filters.searchQuery || '');
  }, [filters.searchQuery]);

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortMenuAnchor(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortMenuAnchor(null);
  };

  const handleSortChange = (newSortBy: string) => {
    const currentSortBy = filters.sortBy || 'name';
    const currentSortDirection = filters.sortDirection || 'asc';

    if (currentSortBy === newSortBy) {
      onAddFilter('sortDirection', currentSortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      onAddFilter('sortBy', newSortBy);
      onAddFilter('sortDirection', 'asc');
    }
    handleSortClose();
  };

  const getSortDisplayText = () => {
    return 'Sort by';
  };

  return (
    <>
      {/* Desktop Search - Full Width */}
      <TextField
        fullWidth
        placeholder="Search contacts..."
        value={searchValue}
        onChange={(e) => handleSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search/>
            </InputAdornment>
          ),
        }}
        sx={{mb: 2}}
      />

      {/* Desktop Filter and Sort Controls */}
      <Box sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Relationship Filter */}
        <FormControl size="small" sx={{minWidth: 140}}>
          <InputLabel>Relationship</InputLabel>
          <Select
            value={filters.relationshipFilter || 'all'}
            label="Relationship"
            onChange={(e) => onAddFilter('relationshipFilter', e.target.value)}
          >
            {getMenuItems().map(item => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Group Filter */}
        <FormControl size="small" sx={{minWidth: 120}}>
          <InputLabel>Groups</InputLabel>
          <Select
            value={filters.groupFilter || 'all'}
            label="Groups"
            onChange={(e) => onAddFilter('groupFilter', e.target.value)}
          >
            <MenuItem value="all">All Groups</MenuItem>
            <MenuItem value="has_groups">In Groups</MenuItem>
            <MenuItem value="no_groups">No Groups</MenuItem>
            <MenuItem value="groups_in_common">Groups in Common</MenuItem>
          </Select>
        </FormControl>

        {/* Sort Button */}
        <Button
          startIcon={<Sort/>}
          onClick={handleSortClick}
          size="small"
          sx={{
            height: 40,
            border: '1px solid',
            borderColor: 'rgba(0, 0, 0, 0.23)',
            borderRadius: 1,
            color: 'text.primary',
            textDecoration: 'none',
            '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.87)',
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              textDecoration: 'none'
            }
          }}
        >
          {getSortDisplayText()}
        </Button>

        {/* Clear Filters */}
        {showClearFilters && (
          <Button
            variant="text"
            onClick={onClearFilters}
            size="small"
            color="secondary"
          >
            Clear Filters
          </Button>
        )}
      </Box>

      {/* Desktop Sort Menu */}
      <Menu
        anchorEl={sortMenuAnchor}
        open={Boolean(sortMenuAnchor)}
        onClose={handleSortClose}
      >
        <MenuItem disabled={true} onClick={() => handleSortChange('mostActive')}>
          <ListItemIcon><TrendingUp fontSize="small"/></ListItemIcon>
          <ListItemText>Most Active</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSortChange('name')}>
          <ListItemIcon><SortByAlpha fontSize="small"/></ListItemIcon>
          <ListItemText>Name</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSortChange('organization')}>
          <ListItemIcon><Business fontSize="small"/></ListItemIcon>
          <ListItemText>Company</ListItemText>
        </MenuItem>
        <MenuItem disabled={true} onClick={() => handleSortChange('nearMeNow')}>
          <ListItemIcon><LocationOn fontSize="small"/></ListItemIcon>
          <ListItemText>Near Me Now</ListItemText>
        </MenuItem>
        <MenuItem disabled={true} onClick={() => handleSortChange('sharedTags')}>
          <ListItemIcon><Label fontSize="small"/></ListItemIcon>
          <ListItemText>Shared Tags</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};