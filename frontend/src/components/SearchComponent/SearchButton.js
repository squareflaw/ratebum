import React from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import agent from '../../agent'
import Button from '../Button'
import ConfirmationDialog from '../ConfirmationDialog'

import {
    ADD_TO_RADAR,
    DELETE_FROM_RADAR
} from '../../constants/actionType'

export const SearchButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const [noteValue, setNoteValue] = React.useState('');
    const [isButtonDisable, setIsButtonDisable] = React.useState(true);
    const [disabledButtonText, setDisabledButtonText] = React.useState('Saved');

    const handleAddItem = (id, itemType) => {
        const payload = agent.radar.add(id, itemType, noteValue)
        props.onAdd(payload)
    }


    const handleChange = e => {
        setNoteValue(e.target.value)
    }

    const handleOnMouseOver = () =>{
        setDisabledButtonText('Remove')
        setIsButtonDisable(false)
    }
    const handleOnMouseOut = () =>{
        setDisabledButtonText('Saved')
        setIsButtonDisable(true)
    }

    const handleClickOpenDialog = () => {
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleDeleteConfirmation = (id) => {
        const payload = agent.radar.delete(id)
        props.deleteItem(id, payload)
        setOpen(false)
    }

    if(props.isInRadar){
        return (
            <React.Fragment>      
                <Button 
                    text={disabledButtonText} 
                    onMouseOver={handleOnMouseOver}
                    onMouseOut={handleOnMouseOut}
                    disable={isButtonDisable} 
                    func={handleClickOpenDialog}
                />
                <ConfirmationDialog
                    open={open}
                    onConfirm={() => handleDeleteConfirmation(props.id)}
                    confirmLabel="Remove"
                    onDeny={handleCloseDialog}
                    denyLabel="Cancel"
                    title={"Remove item from radar?"}
                />
            </React.Fragment>
        )
    }
    return (
    <>
        <Button
            text="Add"
            disable={false}
            // func={() => handleAddItem(props.id, props.itemType)}
                func={handleClickOpenDialog}
        />
        <Dialog open={open} fullWidth onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Note about this</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="note"
                    type="text"
                    fullWidth
                    value={noteValue}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button 
                    func={() => handleAddItem(props.id, props.itemType)}
                    color="primary" 
                    text='Save' 
                />
            </DialogActions>
        </Dialog>
    </>
    )

}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
    onAdd: payload =>
        dispatch({ type: ADD_TO_RADAR, payload }),
    deleteItem: (id, payload) =>
        dispatch({ type: DELETE_FROM_RADAR, id, payload }),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchButton)
