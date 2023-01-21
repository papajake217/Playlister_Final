import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import YouTubePlayer from './PlaylistYoutubePlayer'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import MUIRemoveSongModal from './MUIRemoveSongModal';
import { Icon, Tabs } from '@mui/material'
import { IconButton } from '@mui/material'
import FastForwardIcon from '@mui/icons-material/FastForward';
import SquareIcon from '@mui/icons-material/Square';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Comments from './Comments'

export default function PlayerComments(){
    const { store } = useContext(GlobalStoreContext);
    const [selection,setSelection] = useState(0);


    // if selection == 0 then the player tab is selected, else the comment tab is selected


    // handle clicking of the player tab
    function handlePlayerClick(){
        setSelection(0);
    }

    // handle clicking on the comment tab
    function handleCommentClick(){
        setSelection(1);
    }

    //// 0: play , 1: stop , 2: back , 3: forward
    function handlePlayButton(){
        store.songControlPressed(0);
    }

    
    function handleStopButton(){
        store.songControlPressed(1);
    }

    function handleForwardButton(){
        store.songControlPressed(3);
    }

    function handleBackButton(){
        store.songControlPressed(2);
    }

    
    let title = "";
    let artist = "";
    let index = "";
    let playlist = "";
    
    if(store.currentSong){
        title = store.currentSong.title;
        artist = store.currentSong.artist;
        index = store.currentSongIndex + 1;
        if(store.currentList){
        playlist = store.currentList.name;
        }
    }
    
    
    // if player is selected
    if(selection == 0){
        return (
            
            <div>
            
            <div id="playerCommentSelector">

            <Button variant = "contained" onClick={handlePlayerClick}> Player </Button>
            <Button variant="contained" onClick={handleCommentClick}> Comments </Button>
            </div>

           
            <YouTubePlayer></YouTubePlayer>
            


            </div>
           
        )
    } else{

        return <div>
            
            <div id="playerCommentSelector">

            <Button variant = "contained" onClick={handlePlayerClick}> Player </Button>
            <Button variant="contained" onClick={handleCommentClick}> Comments </Button>
            </div>

           <div id = 'commentContainerDiv'>
            <Comments></Comments>
            </div>
            <div>

            </div>
            


            </div>
    }
    


}