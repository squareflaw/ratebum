import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import ConfirmationDialog from './ConfirmationDialog'

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleDelete = () => {
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
    props.delete()
    handleCloseDialog()
  }

  return (
    <div>
      <Button 
        aria-controls="simple-menu" 
        aria-haspopup="true" 
        onClick={handleClick} 
        style={{color: '#fff'}}
      >
        <MoreVertIcon color='inherit'/>
        <ConfirmationDialog 
          open={open}
          onConfirm={handleDeleteConfirmation}
          confirmLabel='Delete'
          onDeny={handleCloseDialog}
          denyLabel='Cancel'
          title="Delete item from radar?"
        />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Info</MenuItem>
        <MenuItem onClick={handleClose}>Share</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
