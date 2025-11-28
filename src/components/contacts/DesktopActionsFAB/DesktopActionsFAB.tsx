import { useState } from 'react';
import { 
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import { Add, CloudDownload, QrCode, Settings, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface DesktopActionsFABProps {
  onManageContacts?: () => void;
}

export const DesktopActionsFAB = ({ onManageContacts }: DesktopActionsFABProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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

  const handleManageContacts = () => {
    if (onManageContacts) {
      onManageContacts();
    } else {
      navigate('/contacts/manage');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {/* Manage Contacts Button */}
      <Button
        variant="outlined"
        startIcon={<Settings fontSize="small" />}
        onClick={handleManageContacts}
        sx={{
          borderRadius: 2,
          textTransform: 'none',
          height: 40,
          fontSize: '0.875rem'
        }}
      >
        Manage
      </Button>

      {/* Add Actions Dropdown */}
      <Button
        variant="contained"
        onClick={handleClick}
        endIcon={<ExpandMore />}
        sx={{ 
          borderRadius: 2,
          textTransform: 'none',
          height: 40,
          pl: 2,
          pr: 1.5
        }}
      >
        <Add sx={{ mr: 0.5, fontSize: 20 }} />
        Add
      </Button>

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