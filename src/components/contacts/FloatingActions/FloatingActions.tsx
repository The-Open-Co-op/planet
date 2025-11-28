import { Box, Fab } from '@mui/material';
import { Button } from '@/components/ui';
import { Check, Close, CallMerge } from '@mui/icons-material';

interface FloatingActionsProps {
  isMultiSelectMode: boolean;
  isManualMergeMode: boolean;
  selectedContactsCount: number;
  selectedContactsForMergeCount: number;
  onCreateGroup: () => void;
  onMergeSelected: () => void;
  onCancelManualMerge: () => void;
}

export const FloatingActions = ({
  isMultiSelectMode,
  isManualMergeMode,
  selectedContactsCount,
  selectedContactsForMergeCount,
  onCreateGroup,
  onMergeSelected,
  onCancelManualMerge
}: FloatingActionsProps) => {
  return (
    <>
      {/* Floating Action Button for Group Creation */}
      {isMultiSelectMode && selectedContactsCount > 0 && (
        <Fab
          color="primary"
          onClick={onCreateGroup}
          variant="extended"
          sx={{
            position: 'fixed',
            bottom: { xs: 104, md: 24 }, // Increased to clear bottom nav (80px + 24px margin)
            right: 24,
            zIndex: 1000,
          }}
        >
          <Check sx={{ mr: 1 }} />
          Add to group
        </Fab>
      )}

      {/* Manual Merge Mode Controls */}
      {isManualMergeMode && (
        <Box sx={{
          position: 'fixed',
          bottom: { xs: 104, md: 24 }, // Increased to clear bottom nav (80px + 24px margin)
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