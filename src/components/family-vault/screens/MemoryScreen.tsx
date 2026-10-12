import { useCallback, useRef, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { WarningAmber, Download, Add } from '@mui/icons-material';
import { VaultScreen, VaultCard, GroupLabel, Pill, FV_BLUE } from '../familyVaultKit';
import { FAMILY, MEMORY_COLOR } from '../familyVaultData';
import type { MemoryEntry, MemoryCategory, PersonId } from '../familyVaultData';
import { useFamilyVault } from '../familyVaultContext';
import { useVaultNav } from '../vaultNav';

/**
 * Step 3 — what the vault remembers, as distinct from the records it holds.
 *
 * Every entry shows where it came from, when, and whether the family said it
 * or the assistant worked it out; every entry can be corrected or removed.
 * That is the point of the screen: people can see how they are represented,
 * and change it.
 */

const ORDER: MemoryCategory[] = ['Goals', 'Preferences', 'Constraints', 'Accessibility', 'Facts'];

const personName = (id: string) => FAMILY.find((p) => p.id === id)?.name.split(' ')[0] || '';

const EntryCard = ({ entry }: { entry: MemoryEntry }) => {
  const { memory, correctMemory, removeMemory } = useFamilyVault();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(entry.text);

  const clash = entry.contradicts ? memory.find((m) => m.id === entry.contradicts) : undefined;

  return (
    <VaultCard accent={clash ? '#B45309' : undefined}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1 }}>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          {editing ? (
            <TextField
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              size="small"
              fullWidth
              autoFocus
              multiline
              sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
            />
          ) : (
            <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.35 }}>
              {entry.text}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
            {personName(entry.about)} · {entry.source} · {entry.on}
            {entry.confidence ? ` · confidence: ${entry.confidence}` : ''}
          </Typography>
        </Box>
        <Pill
          label={entry.declared ? 'DECLARED' : 'INFERRED'}
          color={entry.declared ? '#2E7D32' : '#B45309'}
        />
      </Box>

      {entry.teenVisible && (
        <Typography variant="caption" sx={{ display: 'block', mt: 0.5, color: FV_BLUE, fontWeight: 600 }}>
          Alice can see and correct this too
        </Typography>
      )}

      {entry.sharedWith?.length ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
          Shared with {entry.sharedWith.join(', ')}
        </Typography>
      ) : null}

      {clash && (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, mt: 0.75 }}>
          <WarningAmber sx={{ fontSize: 14, color: '#B45309', mt: '2px' }} />
          <Typography variant="caption" sx={{ color: '#B45309', lineHeight: 1.4 }}>
            This disagrees with “{clash.text}”. Which is right?
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 1.5, mt: 0.75, flexWrap: 'wrap' }}>
        {editing ? (
          <>
            <Button
              size="small"
              variant="contained"
              onClick={() => {
                correctMemory(entry.id, draft.trim() || entry.text);
                setEditing(false);
              }}
              sx={{ textTransform: 'none', fontWeight: 700, py: 0.25, bgcolor: FV_BLUE }}
            >
              Save
            </Button>
            <Button
              size="small"
              onClick={() => {
                setDraft(entry.text);
                setEditing(false);
              }}
              sx={{ textTransform: 'none', py: 0.25, color: 'text.secondary' }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              variant="outlined"
              onClick={() => setEditing(true)}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                py: 0.15,
                fontSize: '0.7rem',
                color: FV_BLUE,
                borderColor: FV_BLUE,
              }}
            >
              Correct
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => removeMemory(entry.id)}
              sx={{
                textTransform: 'none',
                fontWeight: 700,
                py: 0.15,
                fontSize: '0.7rem',
                color: 'text.secondary',
                borderColor: 'divider',
              }}
            >
              No longer true
            </Button>
          </>
        )}
      </Box>
    </VaultCard>
  );
};

export const MemoryScreen = () => {
  const { memory, addMemory } = useFamilyVault();
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState('');
  const [draftCategory, setDraftCategory] = useState<MemoryCategory>('Goals');
  const [draftAbout, setDraftAbout] = useState<PersonId>('alice');
  const { setView } = useVaultNav();
  const [filter, setFilter] = useState<MemoryCategory | 'All'>('All');

  // Click-and-drag to scroll the filters sideways — same as the feeds demo.
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0 });

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
    el.scrollLeft = dragState.current.scrollLeft - (e.clientX - dragState.current.startX);
  }, []);

  const onMouseUp = useCallback(() => {
    dragState.current.dragging = false;
    const el = scrollRef.current;
    if (el) {
      el.style.cursor = 'grab';
      el.style.userSelect = '';
    }
  }, []);

  const shown = filter === 'All' ? memory : memory.filter((m) => m.category === filter);

  return (
    <VaultScreen
      title="Family Memory"
      tab="vault"
      onBack={() => setView('home')}
      chips={
        <Box
          ref={scrollRef}
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
          {(['All', ...ORDER] as const).map((c) => {
            const on = filter === c;
            const tint = c === 'All' ? FV_BLUE : MEMORY_COLOR[c];
            return (
              <Box
                key={c}
                onClick={() => {
                  if (!dragState.current.dragging) setFilter(c);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1,
                  py: 0.4,
                  borderRadius: 10,
                  border: '1.5px solid',
                  borderColor: on ? tint : 'divider',
                  bgcolor: on ? `${tint}12` : 'transparent',
                  flexShrink: 0,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  '&:hover': { borderColor: tint },
                }}
              >
                {c !== 'All' && (
                  <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: tint, flexShrink: 0 }} />
                )}
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: on ? 700 : 500,
                    color: on ? tint : 'text.primary',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {c}
                </Typography>
              </Box>
            );
          })}
        </Box>
      }
    >
      {adding ? (
        <VaultCard accent={FV_BLUE}>
          <TextField
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="What should the vault remember?"
            size="small"
            fullWidth
            autoFocus
            multiline
            sx={{ '& .MuiInputBase-input': { fontSize: '0.8rem' } }}
          />

          <Typography
            variant="caption"
            sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mt: 1, mb: 0.5 }}
          >
            ABOUT
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            {(['maria', 'daniel', 'alice', 'ethan'] as const).map((id) => {
              const person = FAMILY.find((p) => p.id === id)!;
              const on = draftAbout === id;
              return (
                <Box
                  key={id}
                  onClick={() => setDraftAbout(id)}
                  sx={{
                    px: 1,
                    py: 0.4,
                    borderRadius: 10,
                    border: '1.5px solid',
                    borderColor: on ? FV_BLUE : 'divider',
                    bgcolor: on ? `${FV_BLUE}12` : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: on ? 700 : 500 }}>
                    {person.name.split(' ')[0]}
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Typography
            variant="caption"
            sx={{ fontWeight: 800, color: 'text.secondary', display: 'block', mt: 1, mb: 0.5 }}
          >
            KIND
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
            {ORDER.map((c) => {
              const on = draftCategory === c;
              return (
                <Box
                  key={c}
                  onClick={() => setDraftCategory(c)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    px: 1,
                    py: 0.4,
                    borderRadius: 10,
                    border: '1.5px solid',
                    borderColor: on ? MEMORY_COLOR[c] : 'divider',
                    bgcolor: on ? `${MEMORY_COLOR[c]}12` : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <Box sx={{ width: 7, height: 7, borderRadius: '50%', bgcolor: MEMORY_COLOR[c] }} />
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: on ? 700 : 500 }}>{c}</Typography>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', gap: 1, mt: 1.5 }}>
            <Button
              variant="contained"
              size="small"
              disabled={!draft.trim()}
              onClick={() => {
                addMemory(draftCategory, draftAbout, draft.trim());
                setDraft('');
                setAdding(false);
              }}
              sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
            >
              Remember this
            </Button>
            <Button
              size="small"
              onClick={() => {
                setDraft('');
                setAdding(false);
              }}
              sx={{ textTransform: 'none', color: 'text.secondary' }}
            >
              Cancel
            </Button>
          </Box>
        </VaultCard>
      ) : (
        <Button
          variant="outlined"
          fullWidth
          startIcon={<Add sx={{ fontSize: 16 }} />}
          onClick={() => setAdding(true)}
          sx={{ textTransform: 'none', fontWeight: 700, borderColor: FV_BLUE, color: FV_BLUE }}
        >
          Add to Memory
        </Button>
      )}

      {ORDER.map((category) => {
        const entries = shown.filter((m) => m.category === category);
        if (!entries.length) return null;
        return (
          <Box key={category} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  bgcolor: MEMORY_COLOR[category],
                  flexShrink: 0,
                }}
              />
              <GroupLabel>{category.toUpperCase()}</GroupLabel>
            </Box>
            {entries.map((e) => (
              <EntryCard key={e.id} entry={e} />
            ))}
          </Box>
        );
      })}

      <Button
        variant="outlined"
        fullWidth
        startIcon={<Download sx={{ fontSize: 16 }} />}
        sx={{ textTransform: 'none', fontWeight: 700, mt: 0.5 }}
      >
        Export everything
      </Button>
    </VaultScreen>
  );
};
