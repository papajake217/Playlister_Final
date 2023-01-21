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
import CommentCard from './CommentCard';
import List from '@mui/material/List';

export default function Comments(){
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = useState('');
   

    const handleKeyDown = event => {
        if (event.key === 'Enter') {
          store.postComment(value)
          setValue('');
        }
        
      };
      

      let comments = [];
      if(store.listMarkedToPlay){
        
        for(var i=0;i<store.listMarkedToPlay.comments.length;i++){
            comments.push(store.listMarkedToPlay.comments[i]);
        }

      }

      


    let inputStyle = {
        
    }

    let commentCards = ""
    if(store && store.listMarkedToPlay && store.listMarkedToPlay.comments) {
        commentCards = 
        <Box >
        <List >
            {
        store.listMarkedToPlay.comments.map((comment)=>(
        <CommentCard 
        comment={comment}
        />))
        
        }
        </List>
        </Box>;
        
    }
    

    return(
        <div>

            <div>
                {commentCards}
            </div>



        <div style={{position: 'absolute', bottom: '5%',width:'40%'}}>
        <TextField id="filled-basic" label="leave a comment" variant="filled" onKeyDown={handleKeyDown}
        value={value}
          onChange={event => setValue(event.target.value)}
          style={{width:'100%'}}
           />
          </div>
          </div>
    );


}