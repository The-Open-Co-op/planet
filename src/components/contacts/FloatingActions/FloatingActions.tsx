import { Box } from '@mui/material';
import { Button } from '@/components/ui';
import { Close, CallMerge } from '@mui/icons-material';

interface FloatingActionsProps {
  isManualMergeMode: boolean;
  selectedContactsForMergeCount: number;
  onMergeSelected: () => void;
  onCancelManualMerge: () => void;
}

export const FloatingActions = ({
  isManualMergeMode,
  selectedContactsForMergeCount,
  onMergeSelected,
  onCancelManualMerge
}: FloatingActionsProps) => {
  return (
    <>
      {/* Floating Action Button for Group Creation - Hidden until implemented */}
      {/* TODO: Re-enable when group functionality is implemented
      {isMultiSelectMode && selectedContactsCount > 0 && (
        <Fab
          color="primary"
          onClick={onCreateGroup}
          variant="extended"
          sx={{
            position: 'fixed',
            bottom: { xs: 80, md: 90 }, // Mobile: 80px, Desktop: 90px to clear bottom nav
            right: 24,
            zIndex: 1000,
            backgroundColor: '#1976d2',
            color: 'white',
            '&:hover': {
              backgroundColor: '#1565c0'
            }
          }}
        >
          <Check sx={{ mr: 1 }} />
          Add to group
        </Fab>
      )} */}

      {/* Manual Merge Mode Controls */}
      {isManualMergeMode && (
        <Box sx={{
          position: 'fixed',
          bottom: { xs: 80, md: 90 }, // Mobile: 80px, Desktop: 90px to clear bottom nav
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 2,
          zIndex: 1000,
        }}>
          <Button
            variant="contained"
            onClick={onCancelManualMerge}
            startIcon={<Close />}
            sx={{
              backgroundColor: 'grey.600',
              color: 'white',
              '&:hover': {
                backgroundColor: 'grey.700'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onMergeSelected}
            disabled={selectedContactsForMergeCount < 2}
            startIcon={<CallMerge />}
          >
            Merge ({selectedContactsForMergeCount})
          </Button>
        </Box>
      )}
    </>
  );
};