import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import YouTubePlayer from './PlaylistYoutubePlayer';
import AuthContext from '../auth';
import { useContext, useState } from 'react';
export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const style = {
        bgcolor: '#bda8a6',
       
    
    }

    const handleGuest = () =>{
        const registerUser = auth.registerUser('Guest','User','Guest@Guest.com','Guest12345','Guest12345');
        if (registerUser != 1) auth.loginUser('Guest@Guest.com','Guest12345');
        setAnchorEl(null);
    }

    return (
        <div id='splash-screen' >
        
                
            <div> <h1 id="splash-header">Playlister</h1> </div>
            
            {/* <div id='container-buttons'>
            <Button variant="contained" sx={style}> <Link to='/login'>  Sign In </Link> </Button>
            <Button variant="contained" sx={style}> <Link to='/register'>  Register </Link> </Button>
            </div> */}
            
             <div id='splash-features'>
                
                   
                <h1 id='splash-text'> Features </h1>
                <ul id='splash-text'>
                    <li> Create and Share Playlists</li>
                    <li>Playlist Editing Tools </li>
                    <li>Youtube Integration</li>
                    <li>Save Playlists</li>
                    
                </ul>
              </div>
                <div id='splash-buttons'>
                    <Button variant="contained" sx={style}> <Link to='/login'>  Sign In </Link> </Button>
                    <br></br>
                    <br></br>
                    <Button variant="contained" sx={style}> <Link to='/register'>  Register </Link> </Button>
                    <br></br>
                    <br></br>
                    <Button variant="contained" sx={style} onClick={handleGuest}><Link to='/'>Continue as Guest</Link></Button>                
                
                
                
             </div>

             </div>
        
    )
}