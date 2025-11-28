import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  LinearProgress
} from '@mui/material';
import { AutoFixHigh, CheckCircle } from '@mui/icons-material';

interface MergeDialogsProps {
  isMergeDialogOpen: boolean;
  isMerging: boolean;
  mergeProgress: number;
  useAI: boolean;
  isManualMerge: boolean;
  noDuplicatesFound: boolean;
  onCloseMergeDialog: () => void;
  onAutoMerge: () => void;
  onManualMerge: () => void;
  onSetUseAI: (useAI: boolean) => void;
}

export const MergeDialogs = ({
  isMergeDialogOpen,
  isMerging,
  mergeProgress,
  useAI,
  isManualMerge,
  noDuplicatesFound,
  onCloseMergeDialog,
  onAutoMerge,
  onManualMerge,
  onSetUseAI
}: MergeDialogsProps) => {
  return (
    <>
      {/* Merge Dialog */}
      <Dialog
        open={isMergeDialogOpen}
        onClose={onCloseMergeDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Merge Duplicate Contacts?</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This will automatically identify and merge duplicate contacts in your network.
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={useAI}
                onChange={(e) => onSetUseAI(e.target.checked)}
                color="primary"
              />
            }
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AutoFixHigh sx={{ fontSize: 16 }} />
                Also use AI to merge duplicates?
              </Box>
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseMergeDialog}>Cancel</Button>
          <Button onClick={onManualMerge} variant="outlined">
            Merge Manually
          </Button>
          <Button onClick={onAutoMerge} variant="contained">
            Auto Merge
          </Button>
        </DialogActions>
      </Dialog>

      {/* Merge Progress Dialog */}
      <Dialog
        open={isMerging}
        fullScreen
        PaperProps={{
          sx: {
            backgroundColor: 'background.default',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <Box sx={{ textAlign: 'center', maxWidth: 600, p: 4 }}>
          {noDuplicatesFound ? (
            <>
              <Typography variant="h4" sx={{ 
                mb: 4, 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 2,
                color: 'success.main'
              }}>
                <CheckCircle />
                All Clean!
              </Typography>

              <Typography variant="body2" color="success.main">
                No duplicates found!
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h4" sx={{ 
                mb: 4, 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 2 
              }}>
                {useAI && !isManualMerge && <AutoFixHigh />}
                Merging Contacts
              </Typography>
              
              <LinearProgress 
                variant="determinate" 
                value={mergeProgress} 
                sx={{ height: 8, borderRadius: 4, mb: 2, width: '100%' }}
              />
              
              {!isManualMerge && (
                <Typography variant="body1" sx={{ mb: 4 }}>
                  {useAI 
                    ? "Our AI is identifying duplicate contacts and combining them to give you a cleaner, more organized contact list."
                    : "We're identifying duplicate contacts and combining them to give you a cleaner, more organized contact list."
                  }
                </Typography>
              )}         
              
              <Typography variant="body2" color="text.secondary">
                {Math.round(mergeProgress)}% complete
              </Typography>
            </>
          )}
        </Box>
      </Dialog>
    </>
  );
};