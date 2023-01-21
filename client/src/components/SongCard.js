import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            store.showEditSongModal(index, song);
            
        }
    }

    // function handleKeyDown(event){
    //     console.log(event)
    //     if (store.currentList != null && event.ctrlKey){
    //         event.preventDefault();
    //         if(event.keyCode == 90 && store.canUndo()){
    //             store.undo();
    //         } else{
    //             if(event.keyCode == 89 && store.canRedo()){
    //                 store.redo();
    //             }
    //         }
    //     }
    // }

   

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}   
        >
            
            <div id='songcardcontainer'>
            <div id='songcardcontainerchild'>
            {index + 1}.
            
                {song.title} by {song.artist}
            
            </div>

            <IconButton>
                <HighlightOffIcon onClick={handleRemoveSong}></HighlightOffIcon>
                </IconButton>
                </div>
        </div>
    );
}

export default SongCard;