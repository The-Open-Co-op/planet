import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Paper
} from '@mui/material';
import { Search } from '@mui/icons-material';

interface GroupSearchProps {
  groupId: string;
  groupName?: string;
}

export const GroupSearch = ({ groupId, groupName }: GroupSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log(`Searching in group ${groupId}: "${searchQuery}"`);
      // TODO: Implement search logic here
      // This would typically make an API call to search posts, messages, docs in the group
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 300px)',
        px: 3,
        py: 4
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          fontWeight: 600,
          textAlign: 'center',
          color: 'text.primary'
        }}
      >
        Search this Group
      </Typography>

      <Paper
        sx={{
          width: '100%',
          maxWidth: 600,
          p: 3,
          borderRadius: 2,
          boxShadow: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' }
          }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Search in ${groupName || 'this group'}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: '1.1rem',
                '& input': {
                  py: 1.5
                }
              }
            }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            disabled={!searchQuery.trim()}
            sx={{
              minWidth: { xs: '100%', sm: 100 },
              fontSize: '1rem',
              fontWeight: 600,
              py: 1.5
            }}
          >
            Go
          </Button>
        </Box>

        {/* Placeholder for search results */}
        {/* This would be populated after search is implemented */}
        <Box sx={{ mt: 3 }}>
          {searchQuery && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
              Enter a search term and click "Go" to search posts, messages, and documents in this group.
            </Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};