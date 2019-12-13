import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import ConfirmationDialog from './ConfirmationDialog'

export default function SimpleMenu(props) {
  const RADAR_DELETE_MESSAGE = "Delete item from your radar?";
  const LINEUP_DELETE_MESSAGE = "Delete member from your lineup?";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [confirmationMessage, setConfirmationMessage] = React.useState(
    RADAR_DELETE_MESSAGE
  );

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleAddItem = () => {
    handleClose()
    props.addItem()
  }

  const handleAddLineupMember = () => {
    handleClose()
    props.addLineupMember()
  }

  const handleDeleteItem = () => {
    handleClose()
    setConfirmationMessage(RADAR_DELETE_MESSAGE);
    handleClickOpenDialog()
  }

  const handleDeleteLineupMember = () => {
    handleClose()
    setConfirmationMessage(LINEUP_DELETE_MESSAGE);
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
    if (confirmationMessage === RADAR_DELETE_MESSAGE) {
      props.deleteItem()
    }
    if (confirmationMessage === LINEUP_DELETE_MESSAGE) {
      props.deleteLineupMember()
    }
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
          title={confirmationMessage}
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleAddItem}>Add to Radar</MenuItem>
        <MenuItem onClick={handleAddLineupMember}>Add to Lineup</MenuItem>
        <MenuItem onClick={handleDeleteItem}>Remove from Radar</MenuItem>
        <MenuItem onClick={handleDeleteLineupMember}>Remove from Lineup</MenuItem>
      </Menu>
    </div>
  );
}
