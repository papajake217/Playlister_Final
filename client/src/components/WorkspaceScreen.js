import { useContext,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import AppBanner from './AppBanner.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    useEffect(() => {
        document.addEventListener("keydown", keydownHandler);
        return () => document.removeEventListener("keydown", keydownHandler);
      });

    if(store.currentList == null){
        store.history.push('/')
        console.log('redirected to home')
        // must return null 
        return null
    }
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    function keydownHandler(event){
        console.log(event)
        if (store.currentList != null && event.ctrlKey){
            event.preventDefault();
            if(event.keyCode == 90 && store.canUndo()){
                store.undo();
            } else{
                if(event.keyCode == 89 && store.canRedo()){
                    store.redo();
                }
            }
        }
        
    }

    // document.addEventListener('keydown',handleKeyDown);
    const style = {
        width: '50%',
        float:'left'
    }

    return (
        
        <div id='playlist-controls'>
            
        <Box sx={style}>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'lavender' }}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
         </List>            
         { modalJSX }
         </Box>
         </div>
    )
}


export default WorkspaceScreen;