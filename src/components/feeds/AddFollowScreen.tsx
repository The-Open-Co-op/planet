import { useEffect, useMemo, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  CircularProgress,
  Chip,
} from '@mui/material';
import { Search, ArrowBack, Add, CheckCircle, Public } from '@mui/icons-material';
import { FollowOptionsDialog } from '@/components/blog/FollowOptionsDialog';
import { mayaContacts, webCatalog, mayaFeeds } from '@/mocks/feedsDemo';
import type { FollowEntry, FollowSourceType } from '@/mocks/feedsDemo';

interface AddFollowScreenProps {
  onBack?: () => void;
  /** Which feed is being added to. Defaults to friends. */
  feedId?: string;
}

type TabValue = 'contacts' | 'web';

const sourceLabel = (entry: FollowEntry): string => {
  switch (entry.type) {
    case 'contact': return 'Contact';
    case 'profile': return 'PLANET profile';
    case 'blog': return 'FP Blog';
    case 'rss': return 'RSS feed';
  }
};

const SUGGESTED_HASHTAGS: Record<FollowSourceType, string[]> = {
  contact: ['regenerative', 'london', 'community'],
  profile: ['regenerative', 'cooperatives', 'climate'],
  blog: ['regenerative', 'cooperatives', 'governance'],
  rss: ['energy', 'climate', 'community'],
};

/** Curated example searches mapping to specific result IDs from webCatalog */
const WEB_CURATED: Record<string, string[]> = {
  permaculture: ['w-permaculture', 'w-mycelial', 'w-fieldrecords', 'w-dcw'],
  'co-ops': ['w-stir', 'w-indy', 'w-buurtzorg', 'w-doughnut'],
  'co-op': ['w-stir', 'w-indy', 'w-buurtzorg', 'w-doughnut'],
  coops: ['w-stir', 'w-indy', 'w-buurtzorg', 'w-doughnut'],
};

const EXAMPLE_QUERIES = ['permaculture', 'co-ops'];

const getWebResults = (query: string): FollowEntry[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  if (WEB_CURATED[q]) {
    return WEB_CURATED[q]
      .map((id) => webCatalog.find((e) => e.id === id))
      .filter((e): e is FollowEntry => Boolean(e));
  }
  return webCatalog.filter((e) =>
    e.name.toLowerCase().includes(q) ||
    (e.agentName ?? '').toLowerCase().includes(q) ||
    (e.rssUrl ?? '').toLowerCase().includes(q),
  );
};

export const AddFollowScreen = ({ onBack, feedId = 'friends' }: AddFollowScreenProps) => {
  const [tab, setTab] = useState<TabValue>('contacts');
  const [search, setSearch] = useState('');
  const [webQuery, setWebQuery] = useState('');
  const [webLoading, setWebLoading] = useState(false);
  const [added, setAdded] = useState<Record<string, string[]>>({});
  const [pending, setPending] = useState<FollowEntry | null>(null);

  const targetFeed = mayaFeeds.find((f) => f.id === feedId) ?? mayaFeeds[0];

  const filteredContacts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return mayaContacts;
    return mayaContacts.filter((c) =>
      c.name.toLowerCase().includes(q) ||
      (c.agentName ?? '').toLowerCase().includes(q),
    );
  }, [search]);

  const webResults = useMemo(() => getWebResults(webQuery), [webQuery]);

  // Fake network search delay after Go is pressed
  useEffect(() => {
    if (!webQuery.trim()) {
      setWebLoading(false);
      return;
    }
    setWebLoading(true);
    const t = setTimeout(() => setWebLoading(false), 700);
    return () => clearTimeout(t);
  }, [webQuery]);

  const handleGo = () => {
    const q = search.trim();
    if (!q) return;
    setWebQuery(q);
  };

  const handleExampleQuery = (q: string) => {
    setSearch(q);
    setWebQuery(q);
  };

  const renderRow = (entry: FollowEntry) => {
    const isAdded = added[entry.id] !== undefined;
    return (
      <Box
        key={entry.id}
        sx={{
          px: 2,
          py: 1.25,
          borderBottom: '1px solid',
          borderColor: 'divider',
          display: 'flex',
          alignItems: 'center',
          gap: 1.25,
        }}
      >
        <Avatar
          src={entry.avatar}
          sx={{
            width: 36,
            height: 36,
            bgcolor: entry.avatar ? undefined : '#e5e7eb',
            color: '#4b5563',
            fontSize: '0.85rem',
            fontWeight: 600,
          }}
        >
          {entry.name[0]}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.2 }}>
            {entry.name}
          </Typography>
          <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary' }}>
            {sourceLabel(entry)}
          </Typography>
          {isAdded && added[entry.id].length > 0 && (
            <Typography sx={{ fontSize: '0.6rem', color: '#2e7d32', mt: 0.25, fontWeight: 600 }}>
              Following {added[entry.id].map((t) => `#${t}`).join(' ')}
            </Typography>
          )}
          {isAdded && added[entry.id].length === 0 && (
            <Typography sx={{ fontSize: '0.6rem', color: '#2e7d32', mt: 0.25, fontWeight: 600 }}>
              Following all posts
            </Typography>
          )}
        </Box>
        {isAdded ? (
          <Button
            size="small"
            variant="outlined"
            disabled
            startIcon={<CheckCircle sx={{ fontSize: 14 }} />}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              borderColor: '#2e7d32',
              color: '#2e7d32',
              fontSize: '0.65rem',
            }}
          >
            Added
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            startIcon={<Add sx={{ fontSize: 14 }} />}
            onClick={() => setPending(entry)}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              bgcolor: '#0066CC',
              fontSize: '0.65rem',
              '&:hover': { bgcolor: '#0052a3' },
            }}
          >
            Follow
          </Button>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ px: 1, pt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton size="small" onClick={onBack} aria-label="Back">
          <ArrowBack sx={{ fontSize: 18 }} />
        </IconButton>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: '0.95rem' }}>Find sources to follow</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>
              Adding to
            </Typography>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: targetFeed.color }} />
            <Typography sx={{ fontSize: '0.65rem', fontWeight: 700 }}>
              {targetFeed.name} Feed
            </Typography>
          </Box>
        </Box>
      </Box>

      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="fullWidth"
        sx={{
          minHeight: 32,
          borderBottom: '1px solid',
          borderColor: 'divider',
          mt: 0.5,
          '& .MuiTab-root': { minHeight: 32, fontSize: '0.7rem', textTransform: 'none', fontWeight: 600, py: 0.5 },
          '& .Mui-selected': { color: '#0066CC !important' },
          '& .MuiTabs-indicator': { bgcolor: '#0066CC' },
        }}
      >
        <Tab label="Contacts" value="contacts" />
        <Tab label="Web" value="web" />
      </Tabs>

      <Box sx={{ px: 2, py: 1, flexShrink: 0, display: 'flex', gap: 0.75, alignItems: 'center' }}>
        <TextField
          fullWidth
          size="small"
          placeholder={tab === 'contacts' ? 'Filter your contacts…' : 'Search the web…'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (tab === 'web' && e.key === 'Enter') {
              e.preventDefault();
              handleGo();
            }
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ fontSize: 18, color: 'text.disabled' }} />
                </InputAdornment>
              ),
              sx: { fontSize: '0.82rem' },
            },
          }}
        />
        {tab === 'web' && (
          <Button
            variant="contained"
            size="small"
            onClick={handleGo}
            disabled={!search.trim()}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              bgcolor: '#0066CC',
              minWidth: 0,
              px: 1.5,
              '&:hover': { bgcolor: '#0052a3' },
            }}
          >
            Go
          </Button>
        )}
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {tab === 'contacts' ? (
          filteredContacts.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                No contacts match "{search}".
              </Typography>
            </Box>
          ) : (
            filteredContacts.map(renderRow)
          )
        ) : !webQuery.trim() ? (
          <Box sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.25 }}>
            <Public sx={{ fontSize: 36, color: 'text.disabled' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700 }}>
              Search the public web
            </Typography>
            <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', lineHeight: 1.5, maxWidth: 240 }}>
              Murmurations for PLANET profiles &amp; blogs · FeedSearch and Feedly for RSS.
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', justifyContent: 'center', mt: 0.5 }}>
              <Typography sx={{ fontSize: '0.62rem', color: 'text.disabled', mr: 0.25 }}>Try:</Typography>
              {EXAMPLE_QUERIES.map((q) => (
                <Chip
                  key={q}
                  label={q}
                  size="small"
                  onClick={() => handleExampleQuery(q)}
                  sx={{
                    height: 20,
                    fontSize: '0.62rem',
                    fontWeight: 600,
                    bgcolor: 'rgba(0,102,204,0.08)',
                    color: '#0066CC',
                    '&:hover': { bgcolor: 'rgba(0,102,204,0.16)' },
                  }}
                />
              ))}
            </Box>
          </Box>
        ) : webLoading ? (
          <Box sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            <CircularProgress size={24} sx={{ color: '#0066CC' }} />
            <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
              Searching Murmurations · FeedSearch · Feedly…
            </Typography>
          </Box>
        ) : webResults.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
              No web results for "{webQuery}".
            </Typography>
          </Box>
        ) : (
          webResults.map(renderRow)
        )}
      </Box>

      <FollowOptionsDialog
        open={Boolean(pending)}
        onClose={() => setPending(null)}
        authorName={pending?.name ?? ''}
        suggestedHashtags={pending ? SUGGESTED_HASHTAGS[pending.type] : []}
        initial={{ all: true, hashtags: [] }}
        onSave={({ all, hashtags }) => {
          if (pending) setAdded((prev) => ({ ...prev, [pending.id]: all ? [] : hashtags }));
        }}
      />
    </Box>
  );
};
