import { useState } from 'react';
import { 
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box 
} from '@mui/material';
import { Add, CloudDownload, QrCode, Settings } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface MobileActionsFABProps {
  onManageContacts?: () => void;
}

export const MobileActionsFAB = ({ onManageContacts }: MobileActionsFABProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleManageContacts = () => {
    if (onManageContacts) {
      onManageContacts();
    } else {
      navigate('/contacts/manage');
    }
  };

  const handleAddContact = () => {
    navigate('/contacts/create');
    handleClose();
  };

  const handleInvite = () => {
    navigate('/invite');
    handleClose();
  };

  const handleImport = () => {
    navigate('/import');
    handleClose();
  };

  return (
    <Box sx={{
      display: 'flex',
      gap: 0.5,
      alignItems: 'center'
    }}>
      {/* Manage Contacts Button */}
      <IconButton
        size="small"
        onClick={handleManageContacts}
        sx={{
          width: 40,
          height: 40,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          borderRadius: 1,
          '&:hover': {
            backgroundColor: 'action.hover',
          }
        }}
      >
        <Settings sx={{ fontSize: 20 }} />
      </IconButton>

      {/* Main Add Button */}
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{
          width: 40,
          height: 40,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          borderRadius: 1,
          color: 'text.primary',
          '&:hover': {
            backgroundColor: 'action.hover',
          }
        }}
      >
        <Add sx={{ fontSize: 20 }} />
      </IconButton>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAddContact}>
          <ListItemIcon>
            <Add fontSize="small" />
          </ListItemIcon>
          <ListItemText>Add Contact</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleInvite}>
          <ListItemIcon>
            <QrCode fontSize="small" />
          </ListItemIcon>
          <ListItemText>Invite</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleImport}>
          <ListItemIcon>
            <CloudDownload fontSize="small" />
          </ListItemIcon>
          <ListItemText>Import</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
};