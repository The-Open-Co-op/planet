import { Tooltip, Box } from '@mui/material';
import { GLOSSARY } from './trustDemoData';

interface GlossaryAsideProps {
  /** A key in GLOSSARY, e.g. "DID", "VMC", "M-DID". */
  term: keyof typeof GLOSSARY;
  /** Override the displayed text (defaults to the term itself). */
  children?: React.ReactNode;
}

/**
 * Inline term with a plain-English tooltip. Use on first mention of any
 * abbreviation (DID, VMC, VRC, …). Renders the full name once, with the
 * abbreviation and an explanation on hover/tap.
 */
export const GlossaryAside = ({ term, children }: GlossaryAsideProps) => {
  const entry = GLOSSARY[term];
  if (!entry) return <>{children ?? term}</>;

  return (
    <Tooltip
      arrow
      enterTouchDelay={0}
      leaveTouchDelay={4000}
      title={
        <Box sx={{ py: 0.5 }}>
          <Box sx={{ fontWeight: 700, mb: 0.5 }}>
            {entry.full} ({term})
          </Box>
          <Box sx={{ fontWeight: 400, lineHeight: 1.5 }}>{entry.plain}</Box>
        </Box>
      }
    >
      <Box
        component="span"
        sx={{
          borderBottom: '1px dotted',
          borderColor: 'text.secondary',
          cursor: 'help',
          fontWeight: 600,
        }}
      >
        {children ?? term}
      </Box>
    </Tooltip>
  );
};
