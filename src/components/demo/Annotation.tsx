import { Box, Typography } from '@mui/material';

export interface AnnotationItem {
  /** Which side of the phone: left or right */
  side: 'left' | 'right';
  /** Vertical position as percentage from top (0-100) */
  top: number;
  /** Title of the annotation */
  title: string;
  /** Description text */
  description: string;
  /** Optional tag for tech/background detail */
  tag?: string;
  /** If true, shows a downward arrow indicating content is below the fold */
  pointDown?: boolean;
}

interface AnnotationProps {
  annotation: AnnotationItem;
  category?: 'ui' | 'protocol';
}

const COLORS = {
  ui: '#0066CC',
  protocol: '#660000',
};

export const Annotation = ({ annotation, category = 'ui' }: AnnotationProps) => {
  const isLeft = annotation.side === 'left';
  const color = COLORS[category];

  return (
    <Box
      sx={{
        position: 'absolute',
        top: `${annotation.top}%`,
        [isLeft ? 'right' : 'left']: '100%',
        [isLeft ? 'mr' : 'ml']: 8,
        width: 200,
        textAlign: isLeft ? 'right' : 'left',
        transform: 'translateY(-50%)',
      }}
    >
      {/* Connector line */}
      {annotation.pointDown ? (
        // Dot at text, horizontal line towards phone, then vertical down 15px off phone edge
        <Box sx={{ position: 'absolute', top: '50%', [isLeft ? 'right' : 'left']: -52 }}>
          {/* Dot at text end */}
          <Box sx={{
            position: 'absolute',
            top: -3,
            [isLeft ? 'left' : 'right']: 0,
            width: 7,
            height: 7,
            borderRadius: '50%',
            bgcolor: color,
            opacity: 0.3,
          }} />
          {/* Horizontal line */}
          <Box sx={{ width: 40, height: '1px', bgcolor: color, opacity: 0.3 }} />
          {/* Vertical segment + arrow */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            [isLeft ? 'right' : 'left']: -5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Box sx={{ width: '1px', height: 60, bgcolor: color, opacity: 0.3 }} />
            <Box sx={{
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: `7px solid ${color}`,
              opacity: 0.6,
            }} />
          </Box>
        </Box>
      ) : (
        // Standard horizontal connector
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            [isLeft ? 'right' : 'left']: -52,
            width: 40,
            height: '1px',
            bgcolor: color,
            opacity: 0.3,
            '&::after': {
              content: '""',
              position: 'absolute',
              [isLeft ? 'left' : 'right']: 0,
              top: -3,
              width: 7,
              height: 7,
              borderRadius: '50%',
              bgcolor: color,
            },
          }}
        />
      )}
      {annotation.tag && (
        <Typography
          variant="caption"
          sx={{
            color,
            fontWeight: 700,
            fontSize: '0.6rem',
            textTransform: 'uppercase',
            letterSpacing: 1,
            display: 'block',
            mb: 0.25,
          }}
        >
          {annotation.tag}
        </Typography>
      )}
      <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 0.25, color }}>
        {annotation.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line', fontSize: '0.8rem' }}>
        {annotation.description}
      </Typography>
    </Box>
  );
};
