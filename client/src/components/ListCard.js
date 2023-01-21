import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import SongCard from './SongCard';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { rgbToHex, Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PublishIcon from '@mui/icons-material/Publish';
import Stack from '@mui/material/Stack';


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected,likes,dislikes } = props;

    function handleLoadList(event, id) {
        event.stopPropagation();
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleCloseList(event){
        event.stopPropagation();
        store.closeCurrentList();
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        console.log(store.currentList);
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let songcardSX ={
        width: '100%',
        backgroundColor: '#c8abd4',
        
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }


    function handleAddSong(){
        store.addNewSong();
    }


    function handleLike(){

    }

    function handleDislike(){

    }


    function handlePublish(event,id){
        console.log("handle publish running");
        store.publishPlaylist(id);
        store.loadIdNamePairs();
        console.log("Published : " + idNamePair.published)
    }
    
    function handlePlayList(event, id){
        event.stopPropagation();
        store.play_list();
        store.setCurrentList(id);
    }


    function selectPlaylistToPlay(event,id){
        event.stopPropagation();
        console.log("hhandle select palylist to play for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.play_playlist(id);
        }
        
        console.log(store.listMarkedToPlay)
    }
    
    let styleSelected = {
            marginTop: '10px', 
            display: 'flex', 
            p: 1,
            backgroundColor:'#e1e4cb',
            borderTopLeftRadius:'20px', 
            borderTopRightRadius: '20px'
        }

    if(store.listMarkedToPlay && store.listMarkedToPlay._id === idNamePair._id){
        styleSelected = {
            marginTop: '10px', 
            display: 'flex', 
            p: 1,
            backgroundColor:'#34ebc9',
            borderTopLeftRadius:'20px', 
            borderTopRightRadius: '20px'
        }
    }

    let publishInfo = "";
    if(idNamePair.published && idNamePair.published_date){
        var dateInfo = Date(idNamePair.published_date).split(" ");
        var month = dateInfo[1];
        var day = dateInfo[2];
        var year = dateInfo[3];
        publishInfo = "Published: " + month + " " + day + ", " + year;
    }




    

    let cardElement = null;

    console.log(idNamePair)

    if(store.currentList != null && store.currentList._id === idNamePair._id){
    console.log(idNamePair);
    cardElement =
    <div>
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={styleSelected}
            style={{ width: '100%', fontSize: '48pt' }}
            button
            onClick={(event) => {selectPlaylistToPlay(event,idNamePair._id)}}
        >
            <Box sx={{ p: 1, flexGrow: 1,fontSize:'35%' }}>
            <Stack>
                <ListItem>{idNamePair.name}</ListItem>
                <ListItem sx={{fontSize:'50%'}}> {' by ' + idNamePair.author} </ListItem>
                <ListItem sx={{fontSize:'60%'}}>{publishInfo}</ListItem>
            </Stack>
            
            </Box>
           
            <Stack spacing={-4}>
                <ListItem>
            <IconButton onClick={(event) => {
                event.stopPropagation();
                store.addLike(idNamePair._id);
            }}
            disabled={idNamePair.published}>
                <ThumbUpIcon/>
            </IconButton>

            
            <div id='likes'>
            {idNamePair.likes}
            </div>
            <IconButton onClick={(event) => {
                event.stopPropagation();
                store.addDislike(idNamePair._id)
            }}
            disabled={idNamePair.published}>
                <ThumbDownIcon/>
            </IconButton>

            <div id='likes'>
            {idNamePair.dislikes}
            </div>

            

            <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon/>
                </IconButton>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleCloseList}>
                    <KeyboardDoubleArrowUpIcon/>
                </IconButton>
            </Box>
            </ListItem>

            <ListItem>
                <div id='likes'>
            Listens: {idNamePair.listens}
            </div>
            </ListItem>
            </Stack>
        </ListItem>
        <div id='playlist-controls'>
            
        


        <List 
            style={songcardSX}
            
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
         <div id='ListControls'>
            <Tooltip title='Add Song'>
         <IconButton color="primary" onClick={handleAddSong}>
            <AddIcon></AddIcon>
         </IconButton>
            </Tooltip>

            <Tooltip title='Undo'>
         <IconButton color="primary" onClick={store.undo}>
            <UndoIcon></UndoIcon>
            </IconButton>
            </Tooltip>

            <Tooltip title='Redo'>
            <IconButton color="primary" onClick={store.redo}>
                <RedoIcon></RedoIcon>
                </IconButton>
            </Tooltip> 
            
            <Box sx = {{float:'right'}}>
                <Tooltip title='Publish'>
            <IconButton onClick={(event) => {
                handlePublish(event, idNamePair._id)}}>
                <PublishIcon></PublishIcon>
            </IconButton>
            </Tooltip>

            <Tooltip title='Delete'>
            <IconButton size = "large"  onClick={(event) => {
                handleDeleteList(event, idNamePair._id)
            }} aria-label='delete'>
                <DeleteIcon sx={{}}/>
            </IconButton>
            </Tooltip>
            </Box>
            
         </div>


         { modalJSX }
         
         </div>
         </div>
    } else{
        cardElement = 
        
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={styleSelected}
            style={{ width: '100%', fontSize: '48pt' }}
            button
            onClick={(event) => {selectPlaylistToPlay(event,idNamePair._id)}}
            
        >
    <Box sx={{ p: 1, flexGrow: 1,fontSize:'35%' }}>
            <Stack>
                <ListItem>{idNamePair.name}</ListItem>
                <ListItem sx={{fontSize:'50%'}}> {' by ' + idNamePair.author} </ListItem>
                <ListItem sx={{fontSize:'60%'}}>{publishInfo}</ListItem>
            </Stack>
            </Box>
            
            <Stack spacing={-4}>
            <ListItem>
            <IconButton onClick={(event) => {
                event.stopPropagation();
                store.addLike(idNamePair._id);
            }
            }
            disabled={idNamePair.published}>
                <ThumbUpIcon/>
            </IconButton>

            
            <div id='likes'>
            {idNamePair.likes}
            </div>
            
            <IconButton onClick={(event) => {
                event.stopPropagation();
                store.addDislike(idNamePair._id)
            }}
            disabled={idNamePair.published}>
                <ThumbDownIcon/>
            </IconButton>

            <div id='likes'>
            {idNamePair.dislikes}
            </div>

           
            
            <Box sx={{ p: 1 }}>
            <IconButton onClick={(event) => {
                handleLoadList(event, idNamePair._id)
            }}
            disabled={idNamePair.published}>
                    <KeyboardDoubleArrowDownIcon/>
                </IconButton>
            </Box>
            </ListItem>

            <ListItem>
                <div id='likes'>
            Listens: {idNamePair.listens}
            </div>
            </ListItem>

            </Stack>
        </ListItem>
    }
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;