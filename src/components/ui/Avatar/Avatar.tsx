import {forwardRef} from 'react';
import {Box} from '@mui/material';
import {getContactPhotoStyles} from '@/utils/photoStyles';

export interface AvatarProps {
  name: string;
  profileImage?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
}

const sizeMap = {
  small: {width: 32, height: 32, fontSize: '0.75rem'},
  medium: {width: 44, height: 44, fontSize: '0.875rem'},
  large: {width: 80, height: 80, fontSize: '1.5rem'}
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({name, profileImage, size = 'medium', className, onClick}, ref) => {
    const dimensions = sizeMap[size];
    const photoStyles = profileImage ? getContactPhotoStyles(name) : null;

    // Extract initials from name
    const getInitials = (fullName: string) => {
      const names = fullName.trim().split(' ');
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      }
      return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    return (
      <Box
        ref={ref}
        className={className}
        onClick={onClick}
        sx={{
          width: dimensions.width,
          height: dimensions.height,
          borderRadius: '50%',
          backgroundImage: profileImage ? `url(${profileImage})` : 'none',
          backgroundSize: photoStyles?.backgroundSize || 'cover',
          backgroundPosition: photoStyles?.backgroundPosition || 'center center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: profileImage ? 'transparent' : '#f0f0f0',
          color: '#333',
          border: '1px solid #ddd',
          fontSize: dimensions.fontSize,
          fontWeight: 600,
          flexShrink: 0,
          cursor: onClick ? 'pointer' : 'default',
          mr: {sx: 0, md: 2}
        }}
      >
        {!profileImage && name && getInitials(name)}
      </Box>
    );
  }
);

Avatar.displayName = 'Avatar';