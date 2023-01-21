import React from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store';
import { useContext,useState } from 'react';
import Box from '@mui/material/Box';
import { Icon, Tabs } from '@mui/material'
import { IconButton } from '@mui/material'
import FastForwardIcon from '@mui/icons-material/FastForward';
import SquareIcon from '@mui/icons-material/Square';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Grid from '@mui/material/Grid';


import Button from '@mui/material/Button'

export default function YouTubePlayer() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    const { store } = useContext(GlobalStoreContext);

    const [currentSong, setCurrentSong] = useState(0);

    let playlist = null;
    
    let player;
    
   
    if(store.listMarkedToPlay && store.listMarkedToPlay.songs){
        playlist = [];
        for(var i=0;i<store.listMarkedToPlay.songs.length;i++){
            playlist.push(store.listMarkedToPlay.songs[i]);
        }
    } 


    console.log(playlist)
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    

    const playerOptions = {
        height: '350',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(play) {
        if (playlist[currentSong] != null){
        let song = playlist[currentSong].youTubeId;
        
        player = play;
        player.cueVideoById(song);
        
        }
        
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        setCurrentSong(currentSong + 1);
    }

    function onPlayerReady(event) {
        loadAndPlayCurrentSong(event.target);
        player = event.target;
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }
    console.log(playlist)

    // // 0: play , 1: stop , 2: back , 3: forward
    // console.log("CONTROL HIT " + store.songControlHit)
    // if(store.songControlHit){
    //     let butt = store.songControlHit;
    //     if(butt == 0){
    //         player.playVideo();
    //     } else if(butt == 1){
    //         player.pauseVideo();
    //     } else if(butt == 2){
    //         if(currentSong > 0){
    //             currentSong -=1;
    //             loadAndPlayCurrentSong(player);
    //         }
    //     } else if(butt == 3){
    //         if(currentSong < playlist.length-2){
    //             currentSong +=1;
    //             loadAndPlayCurrentSong(player);
    //         }
    //     }

    //     store.songControlPressed(null);
    // }


    let title = "";
    let artist = "";

    if(playlist && playlist[currentSong]){
        title = playlist[currentSong].title;
        artist = playlist[currentSong].artist;
    }


    function handlePlay(){
        player.playVideo();
    }

    function handlePause(){
        
        player.pauseVideo();
    }

    function handleBackButton(){
        if(currentSong > 0){
            setCurrentSong(currentSong - 1);
            loadAndPlayCurrentSong(player);
        }
    }

    function handleForwardButton(){
        console.log("FORWARD PUSHED, CURRENT SONG: " + currentSong + " LENGTH: " + playlist.length + "")
        if(currentSong < playlist.length-1){
            setCurrentSong(currentSong + 1);
            loadAndPlayCurrentSong(player);
        }
    }

    if(playlist != null && playlist.length > 0){
    return  <div>
        
        <div id='youtubePlayer'>
        <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />

        </div>      

        <div id="songInfoPlayerGood">
            <p id="now-playing"> Now Playing</p>
            <p> Playlist: {store.listMarkedToPlay.name} </p>
            <p> Song #: {currentSong+1}</p>
            <p> Title: {title}</p>
            <p> Artist: {artist} </p>
            
           
            <div id="playerControls">
            <IconButton aria-label = "FastRewind" onClick={handleBackButton}>
            <FastRewindIcon/>
            </IconButton>
            <IconButton aria-label = "Square" onClick={handlePause}>
            <SquareIcon/>
            </IconButton>
            <IconButton aria-label= "PlayArrow" onClick={handlePlay} >
            <PlayArrowIcon/>
            </IconButton>
            <IconButton aria-label = "FastForward" onClick={handleForwardButton}>
            <FastForwardIcon/>
            </IconButton>
            </div>
        </div>
        </div>
        ;
        
    } else{
        return <div id='emptyPlayer'>

         
             <div id="songInfo">
             <p id="now-playing"> Now Playing</p>
            <p> Playlist:  </p>
            <p> Song #: </p>
            <p> Title: </p>
            <p> Artist: </p>
            
           
            <div id="playerControls">
            <IconButton aria-label = "FastRewind" onClick={handleBackButton}>
            <FastRewindIcon/>
            </IconButton>
            <IconButton aria-label = "Square" onClick={handlePause}>
            <SquareIcon/>
            </IconButton>
            <IconButton aria-label= "PlayArrow" onClick={handlePlay} >
            <PlayArrowIcon/>
            </IconButton>
            <IconButton aria-label = "FastForward" onClick={handleForwardButton}>
            <FastForwardIcon/>
            </IconButton>
            </div>
        </div>
        </div>
           
    }
}