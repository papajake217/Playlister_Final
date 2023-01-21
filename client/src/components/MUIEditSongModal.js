import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '30%',
    left: '30%',
    transform: 'translate(1,1)',
    width: 500,
    bgcolor: '#e1e4cb',
    border: '#e1e4cb',
    boxShadow: 24,
    borderRadius: 3,
    p: 0.5,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.currentModal === "EDIT_SONG"}
        >
            <Box sx={style}>
            <div
            id="edit-song-modal"
            className="modal-dialog"
            data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                className="modal-root">
                    
                <div
                    id="edit-song-modal-header"
                    className="modal-header">Edit Song</div>
                
                <div
                    id="edit-song-modal-content"
                    className="modal-center">
                        <table>
                    <tr>
                    <td id="title-prompt" className="modal-edit-dialog">Title:</td>
                    
                    <td><input 
                        id="edit-song-modal-title-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={title} 
                        onChange={handleUpdateTitle} />
                        </td>
                        
                        </tr>
                        <tr>
                    <td id="artist-prompt" className="modal-edit-dialog">Artist:</td>
                    <td>
                    <input 
                        id="edit-song-modal-artist-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={artist} 
                        onChange={handleUpdateArtist} />
                        </td>
                        </tr>
                        <tr>
                    <td id="you-tube-id-prompt" className="modal-edit-dialog">YouTube Id:</td>
                    <td>
                    <input 
                        id="edit-song-modal-youTubeId-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={youTubeId} 
                        onChange={handleUpdateYouTubeId} />
                        
                        </td>
                        </tr>
                    </table>  
                      
                </div>
                
                
                
                <div className="modal-south">
                    <input 
                        type="button" 
                        id="edit-song-confirm-button" 
                        className="modal-button" 
                        value='Confirm' 
                        onClick={handleConfirmEditSong} />
                    <input 
                        type="button" 
                        id="edit-song-cancel-button" 
                        className="modal-button" 
                        value='Cancel' 
                        onClick={handleCancelEditSong} />

                </div>
                </div>
                </div>
            </Box>
            
        </Modal>
    );
}