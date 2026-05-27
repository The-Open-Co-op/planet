import { useCallback, useRef, useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Settings } from '@mui/icons-material';
import { FeedPostCard } from './FeedPostCard';
import { mayaFeeds, feedPostsByFeedId } from '@/mocks/feedsDemo';

interface FeedViewScreenProps {
  onEdit?: () => void;
}

export const FeedViewScreen = ({ onEdit }: FeedViewScreenProps) => {
  const [selectedId, setSelectedId] = useState<string>('friends');
  const posts = feedPostsByFeedId[selectedId] ?? [];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    dragState.current = { dragging: true, startX: e.clientX, scrollLeft: el.scrollLeft };
    el.style.cursor = 'grabbing';
    el.style.userSelect = 'none';
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragState.current.dragging) return;
    const el = scrollRef.current;
    if (!el) return;
    const dx = e.clientX - dragState.current.startX;
    el.scrollLeft = dragState.current.scrollLeft - dx;
  }, []);

  const onMouseUp = useCallback(() => {
    dragState.current.dragging = false;
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = 'grab';
      el.style.userSelect = '';
    }
  }, []);

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Box sx={{ px: 1.5, pt: 1.5, pb: 1, flexShrink: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: 0, position: 'relative' }}>
          <Box
            ref={scrollRef}
            onScroll={updateScrollState}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            sx={{
              display: 'flex',
              gap: 0.75,
              overflowX: 'auto',
              cursor: 'grab',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            {mayaFeeds.map((f) => {
              const isSelected = f.id === selectedId;
              const showBadge = !isSelected && !!f.unreadCount;
              return (
                <Box
                  key={f.id}
                  onClick={() => { if (!dragState.current.dragging) setSelectedId(f.id); }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1.25,
                    py: 0.5,
                    borderRadius: 10,
                    border: '1.5px solid',
                    borderColor: isSelected ? f.color : 'divider',
                    bgcolor: isSelected ? `${f.color}12` : 'transparent',
                    transition: 'all 0.15s',
                    flexShrink: 0,
                    '&:hover': { borderColor: f.color, bgcolor: `${f.color}08` },
                  }}
                >
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: f.color, flexShrink: 0 }} />
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      fontWeight: isSelected ? 700 : 500,
                      color: isSelected ? f.color : 'text.primary',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {f.name}
                  </Typography>
                  {showBadge && (
                    <Box
                      sx={{
                        minWidth: 15,
                        height: 15,
                        borderRadius: '50%',
                        bgcolor: f.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Typography sx={{ fontSize: '0.55rem', color: '#fff', fontWeight: 700, lineHeight: 1 }}>
                        {f.unreadCount}
                      </Typography>
                    </Box>
                  )}
                </Box>
              );
            })}
          </Box>
          {canScrollRight && (
            <Box
              sx={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 28,
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.95))',
                pointerEvents: 'none',
              }}
            />
          )}
          {canScrollLeft && (
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 28,
                background: 'linear-gradient(to left, transparent, rgba(255,255,255,0.95))',
                pointerEvents: 'none',
              }}
            />
          )}
        </Box>
        <IconButton
          size="small"
          onClick={onEdit}
          aria-label="Edit feed settings"
          sx={{ border: '1px solid', borderColor: '#0066CC', color: '#0066CC', borderRadius: 1.5, p: 0.5, flexShrink: 0 }}
        >
          <Settings sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {posts.length === 0 ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
              No posts in this feed yet.
            </Typography>
          </Box>
        ) : (
          posts.map((post) => <FeedPostCard key={post.id} post={post} />)
        )}
      </Box>
    </Box>
  );
};
