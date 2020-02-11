import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import ConfirmationDialog from '../ConfirmationDialog'

export default function SimpleMenu(props) {
  const RADAR_DELETE_MESSAGE = "Delete item from your radar?";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = event => {
    if (open) return
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = () => {
    handleClose()
    handleClickOpenDialog()
  }


  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    handleClose()
    setOpen(false);
  };

  const handleDeleteConfirmation = () => {
    props.deleteItem()
    handleCloseDialog()
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ color: "#fff" }}
      >
        <MoreVertIcon color="inherit" />
        <ConfirmationDialog
          open={open}
          onConfirm={handleDeleteConfirmation}
          confirmLabel="Delete"
          onDeny={handleCloseDialog}
          denyLabel="Cancel"
          title={RADAR_DELETE_MESSAGE}
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >s
        <MenuItem onClick={handleDeleteItem}>Remove from Radar</MenuItem>
      </Menu>
    </div>
  );
}
