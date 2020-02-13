import React from 'react'
import { connect } from 'react-redux'
import agent from '../../agent'
import Button from '../Button'
import ConfirmationDialog from '../ConfirmationDialog'

import {
    ADD_TO_RADAR,
    DELETE_FROM_RADAR
} from '../../constants/actionType'

export const SearchButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const [isButtonDisable, setIsButtonDisable] = React.useState(props.isInRadar);
    const [disabledButtonText, setDisabledButtonText] = React.useState('Saved');

    const handleAddItem = (id, itemType) => {
        const payload = agent.radar.add(id, itemType)
        props.onAdd(payload)
    }

    const handleOnMouseOver = () =>{
        setDisabledButtonText('Remove')
        setIsButtonDisable(false)
    }
    const handleOnMouseOut = () =>{
        setDisabledButtonText('Saved')
        setIsButtonDisable(props.isInRadar)
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
        <Button
            text="Add"
            disable={false}
            func={() => handleAddItem(props.id, props.itemType)}
        />
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
