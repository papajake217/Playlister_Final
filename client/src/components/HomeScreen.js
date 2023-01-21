import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import YouTubePlayer from './PlaylistYoutubePlayer'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import MUIRemoveSongModal from './MUIRemoveSongModal';
import PlayerComments from './PlayerComments'
import { IconButton, Tooltip } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store && store.idNamePairs) {
        listCard = 
            <List sx={{ width: '90%', left: '5%', fontFamily:'monospace' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        likes={pair.likes}
                        dislikes={pair.dislikes}
                        />
                ))
            }
            </List>;
    }
    return (
        <div>
        <div id="playlist-selector">
            <div id="list-selector-heading">
            {/* <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab> */}
                
            </div>
            <div id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
                <MUIRemoveSongModal></MUIRemoveSongModal>
                
            </div>
            

                
        </div>

        <div id='rightSide'>
                <PlayerComments></PlayerComments>
                </div>

           
                <Tooltip title="Create New List">
            <IconButton onClick={store.createNewList} disabled={store.pageOn != 0}>
            <AddCircleIcon></AddCircleIcon>
            </IconButton>
            </Tooltip>
        </div>
        )
}

export default HomeScreen;