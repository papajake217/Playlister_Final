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
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';

export default function CommentCard(props){
    const { store } = useContext(GlobalStoreContext);
    const { comment } = props;

    let cardStyle = {
        backgroundColor: 'lightBlue',
        width: '80%',
        borderStyle: 'solid',
        borderRadius: '5px',
        overflowY: 'scroll',

    }

    console.log(comment)
    return(
        <ListItem >
            <Box sx={cardStyle}>
                
                <p id='username'> {comment.author} </p>
                <p id='commentCards'>
                {comment.comment}
                </p>
            </Box>
            </ListItem>
    )


}