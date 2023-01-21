import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import Statusbar from './Statusbar';
import EditToolbar from './EditToolbar'

import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import { Icon, TextField } from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = useState('');
    const [pageOpen, setPageOpen] = useState(0); 
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileMenu, setProfileMenu] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const handleGuest = () =>{
        const registerUser = auth.registerUser('Guest','User','Guest@Guest.com','Guest12345','Guest12345');
        if (registerUser != 1) auth.loginUser('Guest@Guest.com','Guest12345');
        setAnchorEl(null);
    }


    const menuId = 'primary-search-account-menu';
    // const loggedOutMenu = (
    //     <Menu
    //         anchorEl={anchorEl}
    //         anchorOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //         }}
    //         id={menuId}
    //         keepMounted
    //         transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //         }}
    //         open={isMenuOpen}
    //         onClose={handleMenuClose}
    //     >
            
    //         <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
    //         <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
    //         <MenuItem onClick={handleGuest}><Link to='/'>Continue as Guest</Link></MenuItem>

    //     </Menu>
    // );


    let searchStyle = {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',

    }


    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    let editToolbar = "";
    let menu = null;
    if (auth.loggedIn) {
        menu = loggedInMenu;
        if (store.currentList) {
            editToolbar = <EditToolbar />;
        }
    }
    
    function getAccountMenu(loggedIn) {
        let userInitials = auth.getUserInitials();
        console.log("userInitials: " + userInitials);
        if (loggedIn) 
            return <div>{userInitials}</div>;
        else
            return <AccountCircle />;
    }


    function handleHomeButton(){
        store.switchPages(0)
        store.loadIdNamePairs();
        setPageOpen(0);
    }


    function HandleAllListsButton(){
        store.switchPages(1);
        setPageOpen(1);
        store.clearPairs();
    }

    function handleUserButton(){
        store.switchPages(2);
        setPageOpen(2);
        store.clearPairs();
    }



    function handleKeyDown(e){
        if(e.key === 'Enter'){
            store.performSearch(value,pageOpen);
        }
    }

    let homeIconStyle = null;
    let peopleIconStyle = null;
    let personIconStyle = null;

    if(pageOpen === 0){
        homeIconStyle = {'bgcolor':'lightgreen'}
    } else if(pageOpen === 1){
        peopleIconStyle = {'bgcolor':'lightgreen'}
    } else if(pageOpen === 2){
        personIconStyle = {'bgcolor':'lightgreen'}
    }



   if(auth.loggedIn){
    return (
        
        <Box >
            <Box>
            <AppBar position="static" >
                <Toolbar sx={{bgcolor:'#5d8573'}}>
                    
                   <h1 id="logo-header">Playlister</h1> 
                        
                    
                    {/* <Statusbar />  */}
                    <Box sx={{ flexGrow: 1 }}>{}</Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            { getAccountMenu(auth.loggedIn) }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
             </Box>

             <div id="secondaryToolbar">
                <div id='toolbarButtons'>
                <IconButton to='/' onClick={handleHomeButton} sx={homeIconStyle}>
                   
                    <HomeIcon></HomeIcon>
                    
                </IconButton>

            
                <IconButton onClick={HandleAllListsButton} sx={peopleIconStyle}>
                    <PeopleIcon></PeopleIcon>
                </IconButton>


                <IconButton onClick={handleUserButton} sx={personIconStyle}>
                    <PersonIcon></PersonIcon>
                </IconButton>

                </div>
                <div id='searchBar'>
                <TextField id="outlined-basic" label="Search" variant="outlined" size="small" sx={{width:'40%'}}
                 value={value}
                 onChange={event => setValue(event.target.value)}
                 onKeyDown={handleKeyDown}/>

                

               
                <IconButton sx={{float:"right"}}>
                    <SortIcon></SortIcon>
                    
                    </IconButton>
                    
               


                
                </div>

                
                
             </div>
        </Box>
    );
        } else{
            return <></>
        }
}


