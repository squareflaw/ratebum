import React from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { DialogContentText, DialogContent, TextField } from '@material-ui/core';
import Button from '../Button';
import agent from '../../agent';

const MainDiv = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
`

const Title = styled.p`
    font-size:1.5rem;
    padding: 10px;
    color: var(--primary-dark-color);
    text-align: center;
`

const Strong = styled.strong`
    color: var(--primary-dark-color);
`

function SimpleDialog(props) {
  const { onClose, open, deleteItem, date, item } = props;
  const [noteValue, setNoteValue] = React.useState(item.note);

  const handleChange = e => {
    setNoteValue(e.target.value)
    agent.radar.updateNote(item.spotify_id, e.target.value)
  }

  const handleClose = () => {
    onClose('');
  };

    const year = item.album ? item.album.release_date.slice(0, 4) : ''

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} fullWidth>
      <MainDiv>
        {item.item_type === 'artist' ? (
            <Title href={item.artist.spotify_url}>{item.artist.name}</Title>
        ) : (
          <div>
            <Title href={item.album.spotify_url}>{item.album.name}</Title>
            <DialogContentText>Artist: <Strong>{item.artist.name}</Strong></DialogContentText>
            <DialogContentText>Release: <Strong>{year}</Strong></DialogContentText>
          </div>
        )}
        <DialogContentText>Created At: {date}</DialogContentText>
        <DialogContentText>Note: </DialogContentText>
        <TextField
          margin="dense"
          id="note"
          type="text"
          fullWidth
          value={noteValue}
          onChange={handleChange}
        />
        <Button func={deleteItem} text='Delete item' mw style={{alignSelf:'right'}}/>
      </MainDiv>
    </Dialog>
  );
}

export default SimpleDialog