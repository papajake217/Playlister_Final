import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import {Modal} from '@mui/material/';
import {Button} from '@mui/material';
import AuthContext from '../auth';
import { Alert } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: "#e1e4cb",
    border: 5,
    borderRadius: 2,
    borderColor: '#000000',
    boxShadow: 24,
    p: 4,
    fontFamily: 'Monospace',
    
}

export default function MUIAccountErrorModal(){
    const { auth } = useContext(AuthContext);
    let result = "";
    let error = false;
    if (auth.error) {
        error = true;
        result = auth.error
    }
    // function handleDeleteList(event) {
    //     store.deleteMarkedList();
    // }
    function handleCloseModal(event) {
        auth.closeAccountErrorModal();
    }


    return (
        <Modal open={error !== false}>
            <Alert sx={style} severity = "error">
                <div className="modal-dialog">
                    <header className="modal-header">
                    {result}
                    </header>
                    <div id="dialog-no-button">
                        <Button id="dialog-no-button" className="modal-button" onClick = {handleCloseModal}>
                            Cancel

                        </Button>
                    </div>
                </div>


            </Alert>

        </Modal>
    );

}