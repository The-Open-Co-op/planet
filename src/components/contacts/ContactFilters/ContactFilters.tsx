import { Box, useMediaQuery, useTheme } from '@mui/material';
import type { ContactsFilters } from '@/hooks/contacts/useContacts';
import type { UseContactDragDropReturn } from '@/hooks/contacts/useContactDragDrop';
import { ContactFiltersDesktop } from './ContactFiltersDesktop';
import { ContactFiltersMobile } from './ContactFiltersMobile';

interface ContactFiltersProps {
  filters: ContactsFilters;
  isSelectionMode: boolean;
  isManualMergeMode: boolean;
  onAddFilter: (key: keyof ContactsFilters, value: ContactsFilters[keyof ContactsFilters]) => void;
  onClearFilters: () => void;
  dragDrop?: UseContactDragDropReturn;
}

export const ContactFilters = ({
  filters,
  onAddFilter,
  onClearFilters,
  dragDrop,
}: ContactFiltersProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const showClearFilters = filters.relationshipFilter !== 'all' ||
    filters.planetStatusFilter !== 'all' ||
    filters.accountFilter !== 'all' ||
    filters.cardAssignmentFilter !== 'all' ||
    filters.groupFilter !== 'all' ||
    (filters.searchQuery || "").length > 0 ||
    filters.sortBy !== 'mostActive';

  return (
    <Box sx={{ px: 0, flexShrink: 0 }}>
      {isMobile ? (
        <ContactFiltersMobile
          filters={filters}
          showClearFilters={showClearFilters}
          onAddFilter={onAddFilter}
          onClearFilters={onClearFilters}
          dragDrop={dragDrop}
        />
      ) : (
        <ContactFiltersDesktop
          filters={filters}
          showClearFilters={showClearFilters}
          onAddFilter={onAddFilter}
          onClearFilters={onClearFilters}
        />
      )}
    </Box>
  );
};