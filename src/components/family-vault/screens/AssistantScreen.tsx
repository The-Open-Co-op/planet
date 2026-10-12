import { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { AutoAwesome, Lock, CheckCircle, Send } from '@mui/icons-material';
import { VaultScreen, VaultCard, Pill, FV_BLUE } from '../familyVaultKit';
import { ShareSheet } from '../ShareSheet';
import type { ShareTerms } from '../ShareSheet';
import { ASSISTANT } from '../familyVaultData';
import { useFamilyVault } from '../familyVaultContext';
import { useVaultNav } from '../vaultNav';

/**
 * Step 9 — the family's own assistant. Scripted, so it behaves the same in
 * front of an audience: it cites each record it used, separates what the
 * family declared from what it inferred, and asks before anything is shared.
 */

export const AssistantScreen = () => {
  const {
    assistantAsked,
    askAssistant,
    assistantShared,
    shareAssistantDraft,
    inferenceDropped,
    dropInference,
    inferenceCorrection,
    correctInference,
  } = useFamilyVault();
  const { setView } = useVaultNav();
  const [sharing, setSharing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [terms, setTerms] = useState<ShareTerms | null>(null);

  const facts = ASSISTANT.facts.filter((f) => f.declared || !inferenceDropped);

  return (
    <VaultScreen title="Family assistant" tab="chat" onBack={() => setView('home')}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Box
          sx={{
            px: 1.5,
            py: 1,
            borderRadius: 2,
            bgcolor: `${FV_BLUE}14`,
            maxWidth: '85%',
          }}
        >
          <Typography variant="caption" sx={{ color: 'text.primary' }}>
            {ASSISTANT.question}
          </Typography>
        </Box>
      </Box>

      {!assistantAsked ? (
        <Button
          variant="contained"
          fullWidth
          startIcon={<AutoAwesome sx={{ fontSize: 16 }} />}
          onClick={askAssistant}
          sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
        >
          Ask
        </Button>
      ) : (
        <>
          <VaultCard>
            <Typography variant="caption" sx={{ color: 'text.primary', display: 'block', mb: 1 }}>
              {ASSISTANT.intro}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
              {facts.map((f) => {
                const corrected = !f.declared && inferenceCorrection;
                const isEditing = !f.declared && editing;
                return (
                  <Box key={f.text}>
                    {isEditing ? (
                      <TextField
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        size="small"
                        fullWidth
                        autoFocus
                        multiline
                        sx={{ '& .MuiInputBase-input': { fontSize: '0.75rem' } }}
                      />
                    ) : (
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.primary', display: 'block', lineHeight: 1.45 }}
                      >
                        {corrected || f.text}
                      </Typography>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5, flexWrap: 'wrap' }}>
                      <Pill
                        label={f.declared ? 'FROM A RECORD' : corrected ? 'CORRECTED BY MARIA' : 'INFERRED'}
                        color={f.declared || corrected ? '#2E7D32' : '#B45309'}
                      />
                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {corrected ? 'Said by Maria · today' : f.source}
                      </Typography>
                    </Box>

                    {!f.declared && !corrected && (
                      <Box sx={{ display: 'flex', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                        {isEditing ? (
                          <>
                            <Button
                              size="small"
                              variant="contained"
                              disabled={!draft.trim()}
                              onClick={() => {
                                correctInference(draft.trim());
                                setEditing(false);
                              }}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 700,
                                py: 0.15,
                                fontSize: '0.7rem',
                                bgcolor: FV_BLUE,
                              }}
                            >
                              Save
                            </Button>
                            <Button
                              size="small"
                              onClick={() => setEditing(false)}
                              sx={{ textTransform: 'none', py: 0.15, fontSize: '0.7rem', color: 'text.secondary' }}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => {
                                setDraft(f.text);
                                setEditing(true);
                              }}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 700,
                                py: 0.15,
                                fontSize: '0.7rem',
                                color: FV_BLUE,
                                borderColor: FV_BLUE,
                              }}
                            >
                              Correct this
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={dropInference}
                              sx={{
                                textTransform: 'none',
                                fontWeight: 700,
                                py: 0.15,
                                fontSize: '0.7rem',
                                color: 'text.secondary',
                                borderColor: 'divider',
                              }}
                            >
                              Take it out
                            </Button>
                          </>
                        )}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </VaultCard>

          {inferenceDropped && (
            <Typography variant="caption" color="text.secondary">
              Taken out of the draft, and marked as not true in Family Memory.
            </Typography>
          )}
          {inferenceCorrection && (
            <Typography variant="caption" color="text.secondary">
              Your wording replaces the assistant’s, in the draft and in Family Memory.
            </Typography>
          )}

          {assistantShared ? (
            <VaultCard accent="#2E7D32">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                <CheckCircle sx={{ fontSize: 18, color: 'success.main' }} />
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'success.dark' }}>
                  Shared with {terms?.recipients.join(', ')}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                For {terms?.duration.toLowerCase()}
                {terms?.onward ? ', and they may pass it on' : ', and they may not pass it on'}, under
                MyTerms SD-BASE. Logged like any other access, with what it drew on.
              </Typography>
            </VaultCard>
          ) : sharing ? (
            <ShareSheet
              what="the summary"
              onShare={(t) => {
                setTerms(t);
                shareAssistantDraft();
              }}
            />
          ) : (
            <Button
              variant="contained"
              fullWidth
              startIcon={<Send sx={{ fontSize: 14 }} />}
              onClick={() => setSharing(true)}
              sx={{ textTransform: 'none', fontWeight: 700, bgcolor: FV_BLUE, '&:hover': { bgcolor: '#0055AA' } }}
            >
              Share this summary
            </Button>
          )}
        </>
      )}

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.75, mt: 0.5 }}>
        <Lock sx={{ fontSize: 14, color: 'text.disabled', mt: '2px' }} />
        <Typography variant="caption" color="text.secondary">
          {ASSISTANT.note}
        </Typography>
      </Box>
    </VaultScreen>
  );
};
