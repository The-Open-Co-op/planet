import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Chip } from '@mui/material';
import { Lock, Fingerprint } from '@mui/icons-material';
import type { AnnotationItem } from '@/components/demo/Annotation';

type AnnotationWithCategory = AnnotationItem & { category: 'ui' | 'protocol' };

// Mock 12-word mnemonic
const MNEMONIC_WORDS = [
  'ocean', 'harvest', 'gentle', 'carbon',
  'bridge', 'mountain', 'silver', 'echo',
  'forest', 'crystal', 'thunder', 'compass',
];

// Words for the verification word bank (includes correct + decoys)
const WORD_BANK = [
  'ocean', 'bridge', 'crystal', // correct
  'river', 'valley', 'golden', 'copper', 'whisper', 'ember', // decoys
];

type Phase = 'phrase' | 'verify' | 'security';

interface RecoveryPhraseScreenProps {
  onComplete?: () => void;
  setDynamicAnnotations?: (annotations: AnnotationWithCategory[] | null) => void;
}

const verifyAnnotations: AnnotationWithCategory[] = [
  {
    side: 'left', top: 40, category: 'ui',
    title: 'Verification step',
    description: 'User selects 3 randomly chosen words from a word bank to confirm they saved the phrase.',
    tag: 'UX',
  },
];

const securityAnnotations: AnnotationWithCategory[] = [
  {
    side: 'right', top: 50, category: 'ui',
    title: 'Biometric / PIN',
    description: 'Face ID, fingerprint, or 6-digit PIN for day-to-day access. Framed as "Secure your PLANET app".',
    tag: 'UX',
  },
];

export const RecoveryPhraseScreen = ({ onComplete, setDynamicAnnotations }: RecoveryPhraseScreenProps) => {
  const [phase, setPhase] = useState<Phase>('phrase');
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [pin, setPin] = useState('');
  const [pinConfirm, setPinConfirm] = useState('');
  const pinMatch = pin.length === 6 && pin === pinConfirm;
  const [biometric, setBiometric] = useState<'face' | 'pin' | null>(null);

  useEffect(() => {
    if (phase === 'verify') {
      setDynamicAnnotations?.(verifyAnnotations);
    } else if (phase === 'security') {
      setDynamicAnnotations?.(securityAnnotations);
    } else {
      setDynamicAnnotations?.(null);
    }
  }, [phase, setDynamicAnnotations]);

  const verifyTargets = [
    { index: 0, word: 'ocean' },
    { index: 4, word: 'bridge' },
    { index: 9, word: 'crystal' },
  ];

  const isVerified = verifyTargets.every(t => selectedWords.includes(t.word));

  const handleWordSelect = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(prev => prev.filter(w => w !== word));
    } else if (selectedWords.length < 3) {
      setSelectedWords(prev => [...prev, word]);
    }
  };

  const renderAllWords = () => (
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0.75, my: 1.5 }}>
      {MNEMONIC_WORDS.map((word, i) => (
        <Box
          key={word}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            px: 1.5,
            py: 0.75,
            bgcolor: 'action.hover',
            borderRadius: 1,
          }}
        >
          <Typography sx={{ color: 'text.disabled', fontWeight: 700, fontSize: '0.75rem', width: 18, textAlign: 'right' }}>
            {i + 1}
          </Typography>
          <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'monospace' }}>
            {word}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      p: 3,
    }}>
      {/* Phrase display - all 12 words */}
      {phase === 'phrase' && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Lock sx={{ fontSize: 20, color: '#0066CC' }} />
            <Typography variant="subtitle2" sx={{ color: '#0066CC', fontWeight: 700 }}>
              Recovery Phrase
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5, lineHeight: 1.5 }}>
            Write these words down in order. This is your master key which you can use to install PLANET on another device — if lost, your identity and all credentials are unrecoverable.
          </Typography>

          {renderAllWords()}

          <Box sx={{ flex: 1 }} />

          <Button
            variant="outlined"
            fullWidth
            onClick={() => setPhase('verify')}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              borderColor: '#0066CC',
              color: '#0066CC',
              '&:hover': { borderColor: '#004C99', bgcolor: 'rgba(0,102,204,0.08)' },
            }}
          >
            I've written them down
          </Button>
        </>
      )}

      {/* Verify */}
      {phase === 'verify' && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography
              variant="body2"
              onClick={() => { setPhase('phrase'); setSelectedWords([]); }}
              sx={{ color: 'text.secondary', cursor: 'pointer', '&:hover': { color: 'text.primary' } }}
            >
              ← Back
            </Typography>
            <Box sx={{ flex: 1 }} />
            <Lock sx={{ fontSize: 20, color: '#0066CC' }} />
            <Typography variant="subtitle2" sx={{ color: '#0066CC', fontWeight: 700 }}>
              Verify
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.5 }}>
            Select word #{verifyTargets[0].index + 1}, #{verifyTargets[1].index + 1}, and #{verifyTargets[2].index + 1} from your recovery phrase.
          </Typography>

          {/* Selected slots */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {verifyTargets.map((target, i) => (
              <Box
                key={target.index}
                sx={{
                  flex: 1,
                  py: 1,
                  px: 1,
                  borderRadius: 1.5,
                  border: '1px solid',
                  borderColor: selectedWords[i] === target.word ? '#22c55e' : 'rgba(255,255,255,0.2)',
                  bgcolor: selectedWords[i] ? 'rgba(255,255,255,0.06)' : 'transparent',
                  textAlign: 'center',
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                  #{target.index + 1}
                </Typography>
                <Typography sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'monospace' }}>
                  {selectedWords[i] || '—'}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Word bank */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {WORD_BANK.sort().map((word) => {
              const isSelected = selectedWords.includes(word);
              return (
                <Chip
                  key={word}
                  label={word}
                  onClick={() => handleWordSelect(word)}
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 500,
                    bgcolor: isSelected ? 'rgba(0,102,204,0.12)' : 'action.hover',
                    color: isSelected ? '#0066CC' : 'text.primary',
                    border: '1px solid',
                    borderColor: isSelected ? '#0066CC' : 'divider',
                    '&:hover': { bgcolor: 'action.selected' },
                  }}
                />
              );
            })}
          </Box>

          <Box sx={{ flex: 1 }} />

          <Button
            variant="outlined"
            fullWidth
            disabled={!isVerified}
            onClick={() => setPhase('security')}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              borderColor: '#4DA6FF',
              color: '#0066CC',
              bgcolor: 'rgba(0,102,204,0.08)',
              '&:hover': { borderColor: '#004C99', bgcolor: 'rgba(0,102,204,0.12)' },
              '&.Mui-disabled': { borderColor: 'divider', color: 'text.disabled' },
            }}
          >
            Verify
          </Button>
        </>
      )}

      {/* Security setup */}
      {phase === 'security' && (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Fingerprint sx={{ fontSize: 20, color: '#0066CC' }} />
            <Typography variant="subtitle2" sx={{ color: '#0066CC', fontWeight: 700 }}>
              Secure your PLANET app
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.5 }}>
            Choose how to unlock PLANET day-to-day.
          </Typography>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<Fingerprint />}
            onClick={() => setBiometric('face')}
            sx={{
              mb: 1,
              py: 1.5,
              textTransform: 'none',
              justifyContent: 'flex-start',
              borderRadius: 2,
              borderColor: biometric === 'face' ? '#0066CC' : 'divider',
              bgcolor: biometric === 'face' ? 'rgba(0,102,204,0.08)' : 'transparent',
              color: biometric === 'face' ? '#0066CC' : 'text.primary',
              '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.04)' },
            }}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>Face ID / Fingerprint</Typography>
              <Typography variant="caption" color="text.secondary">Recommended</Typography>
            </Box>
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<Lock />}
            onClick={() => setBiometric('pin')}
            sx={{
              mb: 1.5,
              py: 1.5,
              textTransform: 'none',
              justifyContent: 'flex-start',
              borderRadius: 2,
              borderColor: biometric === 'pin' ? '#0066CC' : 'divider',
              bgcolor: biometric === 'pin' ? 'rgba(0,102,204,0.08)' : 'transparent',
              color: biometric === 'pin' ? '#0066CC' : 'text.primary',
              '&:hover': { borderColor: '#0066CC', bgcolor: 'rgba(0,102,204,0.04)' },
            }}
          >
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>6-digit PIN</Typography>
              <Typography variant="caption" color="text.secondary">Alternative</Typography>
            </Box>
          </Button>

          {/* PIN entry */}
          {biometric === 'pin' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                type="password"
                inputProps={{ maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' }}
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: 'text.primary',
                    bgcolor: 'action.hover',
                    '& fieldset': { borderColor: 'divider' },
                    '&.Mui-focused fieldset': { borderColor: '#0066CC' },
                    letterSpacing: 8,
                    '& input::placeholder': { fontSize: '0.7rem', letterSpacing: 0, opacity: 0.4 },
                  },
                }}
              />
              <TextField
                fullWidth
                size="small"
                type="password"
                inputProps={{ maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' }}
                placeholder="Confirm"
                value={pinConfirm}
                onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, ''))}
                error={pinConfirm.length === 6 && pin !== pinConfirm}
                helperText={pinConfirm.length === 6 && pin !== pinConfirm ? 'PINs do not match' : ''}
                sx={{
                  mb: 1,
                  '& .MuiOutlinedInput-root': {
                    color: 'text.primary',
                    bgcolor: 'action.hover',
                    '& fieldset': { borderColor: 'divider' },
                    '&.Mui-focused fieldset': { borderColor: '#0066CC' },
                    letterSpacing: 8,
                    '& input::placeholder': { fontSize: '0.7rem', letterSpacing: 0, opacity: 0.4 },
                  },
                }}
              />
            </Box>
          )}

          <Box sx={{ flex: 1 }} />

          <Button
            variant="outlined"
            fullWidth
            disabled={!biometric || (biometric === 'pin' && !pinMatch)}
            onClick={onComplete}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              borderRadius: 2,
              borderColor: '#4DA6FF',
              color: '#0066CC',
              bgcolor: 'rgba(0,102,204,0.08)',
              '&:hover': { borderColor: '#004C99', bgcolor: 'rgba(0,102,204,0.12)' },
              '&.Mui-disabled': { borderColor: 'divider', color: 'text.disabled' },
            }}
          >
            Connect with Sarah
          </Button>
        </>
      )}
    </Box>
  );
};
