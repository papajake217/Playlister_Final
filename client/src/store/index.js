import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    DELETE_MARKED_LIST:"DELETE_MARKED_LIST",
    SELECT_PLAYLIST_TO_PLAY: "SELECT_PLAYLIST_TO_PLAY",
    ADD_LIKE: "ADD_LIKE",
    ADD_DISLIKE: "ADD_DISLIKE",
    PUBLISH: "PUBLISH",
    LOAD_COMMENTS: "LOAD_COMMENTS",
    POST_COMMENT: "POST_COMMENT",
    SEARCH_PLAYLISTS: "SEARCH_PLAYLISTS",
    SWITCH_PAGES: "SWITCH_PAGES",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        listMarkedForEdit: null,
        playlistPublished: null,
        listMarkedToPlay: null,
        comments: null,
        pageOn: 0,
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }

            case GlobalStoreActionType.DELETE_MARKED_LIST:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null, 
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                })
            }

            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }
            case GlobalStoreActionType.PLAY_SONGS:{
                console.log(" PLAY SONGS HITHTITS")
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: 0,
                    currentSong: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }

           

           
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }

            

            



            case GlobalStoreActionType.PLAY_NEXT_SONG:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex+1,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,

                });
            }

            // case GlobalStoreActionType.INIT_PLAYER:{
            //     return setStore({
            //         currentModal : CurrentModal.NONE,
            //         idNamePairs: store.idNamePairs,
            //         currentList: store.currentList,
            //         currentSongIndex: store.currentSongIndex,
            //         currentSong: store.currentSong,
            //         newListCounter: store.newListCounter,
            //         listNameActive: false,
            //         listIdMarkedForDeletion: null,
            //         listMarkedForDeletion: null,
            //         songControlHit: store.songControlHit,
            //         player: payload,
            //     });
            // }
            


            case GlobalStoreActionType.ADD_LIKE:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }

            case GlobalStoreActionType.ADD_DISLIKE:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }

            case GlobalStoreActionType.REFRESH:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }

            case GlobalStoreActionType.CHANGE_PAGE:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPage: payload,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }

            case GlobalStoreActionType.PLAY_LIST:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    PlaylistPlaying: payload,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }

            case GlobalStoreActionType.PUBLISH:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.pairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    PlaylistPlaying: store.playlistPlaying,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: payload.id,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }


            

            case GlobalStoreActionType.MARK_LIST_FOR_EDIT:{
                console.log("EDITING LIST")
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    PlaylistPlaying: store.PlaylistPlaying,
                    listMarkedForEdit: payload.playlist,
                    listMarkedToPlay: store.listMarkedToPlay,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
            }


            case GlobalStoreActionType.SELECT_PLAYLIST_TO_PLAY:{
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    PlaylistPlaying: store.PlaylistPlaying,
                    listMarkedForEdit: store.listMarkedForEdit,
                    listMarkedToPlay: payload.playlist,
                    playlistPublished: store.playlistPublished,
                    comments: store.comments,
                    pageOn: store.pageOn,
                });
                }


                case GlobalStoreActionType.LOAD_COMMENTS:{
                    return setStore({
                        currentModal : CurrentModal.NONE,
                        idNamePairs: store.idNamePairs,
                        currentList: store.currentList,
                        currentSongIndex: store.currentSongIndex,
                        currentSong: store.currentSong,
                        newListCounter: store.newListCounter,
                        listNameActive: false,
                        listIdMarkedForDeletion: null,
                        listMarkedForDeletion: null,
                        PlaylistPlaying: store.PlaylistPlaying,
                        listMarkedForEdit: payload.playlist,
                        listMarkedToPlay: store.listMarkedToPlay,
                        playlistPublished: store.playlistPublished,
                        comments: payload,
                        pageOn: store.pageOn,
                    })
                }

                case GlobalStoreActionType.POST_COMMENT:{
                    return setStore({
                        currentModal : CurrentModal.NONE,
                        idNamePairs: payload.idNamePairs,
                        currentList: store.currentList,
                        currentSongIndex: store.currentSongIndex,
                        currentSong: store.currentSong,
                        newListCounter: store.newListCounter,
                        listNameActive: false,
                        listIdMarkedForDeletion: null,
                        listMarkedForDeletion: null,
                        PlaylistPlaying: store.PlaylistPlaying,
                        listMarkedForEdit: store.listMarkedForEdit,
                        listMarkedToPlay: payload.playlist,
                        playlistPublished: store.playlistPublished,
                        comments: payload.comments,
                        pageOn: store.pageOn,
                    })
                }

            


                case GlobalStoreActionType.SEARCH_PLAYLISTS:{
                    return setStore({
                        currentModal : CurrentModal.NONE,
                        idNamePairs: payload.idNamePairs,
                        currentList: store.currentList,
                        currentSongIndex: store.currentSongIndex,
                        currentSong: store.currentSong,
                        newListCounter: store.newListCounter,
                        listNameActive: false,
                        listIdMarkedForDeletion: null,
                        listMarkedForDeletion: null,
                        PlaylistPlaying: store.PlaylistPlaying,
                        listMarkedForEdit: store.listMarkedForEdit,
                        listMarkedToPlay: store.listMarkedToPlay,
                        playlistPublished: store.playlistPublished,
                        comments: store.comments,
                        pageOn: store.pageOn,
                    })
                }


                case GlobalStoreActionType.SWITCH_PAGES:{
                    return setStore({
                        currentModal : CurrentModal.NONE,
                        idNamePairs: payload.idNamePairs,
                        currentList: store.currentList,
                        currentSongIndex: store.currentSongIndex,
                        currentSong: store.currentSong,
                        newListCounter: store.newListCounter,
                        listNameActive: false,
                        listIdMarkedForDeletion: null,
                        listMarkedForDeletion: null,
                        PlaylistPlaying: store.PlaylistPlaying,
                        listMarkedForEdit: store.listMarkedForEdit,
                        listMarkedToPlay: store.listMarkedToPlay,
                        playlistPublished: store.playlistPublished,
                        comments: store.comments,
                        pageOn: payload,
                    })
                }

            
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // store.playSong = function (index) {
    //     console.log("STORE.PLAYSONG RUNNING")
    //     storeReducer({
    //         type: GlobalStoreActionType.PLAY_SONGS,
    //         payload: store.currentList.songs[index]
    //     });
    //     console.log("STORE REDUCED PLAYSONG AND RESULT IS " + store.currentSong)
    // }


    store.play_playlist = function(id){

        async function asyncPlayPlaylist(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.listens += 1;
                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {

                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.SELECT_PLAYLIST_TO_PLAY,
                        payload: {playlist:playlist, idNamePairs: pairsArray}
                    });
                }
            }
            getListPairs(playlist)
        }
                    // history.push("/playlist/" + playlist._id);
                    console.log(playlist)
                    console.log(store.listMarkedToPlay);
                   console.log("STORE REDUCED FOR PLAYING PLAYLIST")
                }
            }
        
        asyncPlayPlaylist(id);
        console.log(store.listMarkedToPlay);
    }

        


    store.play_list = function() {
        storeReducer({
            type: GlobalStoreActionType.PLAY_LIST,
            payload: 1
        });
    }

    // changes pages, 0 denotes home page, 1 denotes all lists page, 2 denotes users page
    store.changePage = function(page){
        storeReducer({
            type: GlobalStoreActionType.CHANGE_PAGE,
            payload: page
        })
    }

    

    // store.initPlayer = function(player){
    //     storeReducer({
    //         type: GlobalStoreActionType.INIT_PLAYER,
    //         payload: player
    //     })
    // }


    // Represents when a button is hit for the player:
    // 0: play , 1: stop , 2: back , 3: forward
    store.songControlPressed = function(control){
        console.log("store control beginning: " + control);
        storeReducer({
            type: GlobalStoreActionType.SONG_CONTROL_HIT,
            payload: control
        });

        
    }


    store.publishPlaylist = function(id){

        async function asyncPublishPlaylist(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                
                playlist.published = true;
                playlist.published_date = new Date();
                response = await api.updatePlaylistById(playlist._id, playlist);
                
                if (response.data.success) {

                    response = await api.getPlaylistPairs();

                    if(response.data.success){

                    storeReducer({
                        type: GlobalStoreActionType.PUBLISH,
                        payload: {id: id, pairs: response.data.idNamePairs}
                    });
                }
                    // history.push("/playlist/" + playlist._id);
                   
                }
            }
        }
        asyncPublishPlaylist(id);
        

    }

    store.postComment = function(value){
        
        async function asyncPostComment(value,id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                auth.getLoggedIn();
                let playlist = response.data.playlist;
                playlist.comments.push({
                    author: (auth.user.firstName + " " + auth.user.lastName),
                    comment: value,
                });
                
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    console.log(response)
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.POST_COMMENT,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        comments: playlist.comments,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
                
            }
        }
        asyncPostComment(value,store.listMarkedToPlay._id);
    }

    store.playNextSong = function() {
        storeReducer({
            type: GlobalStoreActionType.PLAY_NEXT_SONG,
        });
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    store.clearPairs = function() {
        storeReducer({
            type: GlobalStoreActionType.SEARCH_PLAYLISTS,
            payload: {idNamePairs: []}
        });
    }


    store.switchPages = function(page){
        storeReducer({
            type: GlobalStoreActionType.SWITCH_PAGES,
            payload: page
        })
    }


    store.performSearch = function(query,pageOpen){
        // pageOpen => 0: homePage   1: allLists    2: users
        async function asyncPerformSearch(query,pageOpen) {
            if(pageOpen == 1){
                let response = await api.searchPlaylistByName(query);
                
                if (response.data.success) {
                    
                    let playlists = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.SEARCH_PLAYLISTS,
                        payload: {idNamePairs: playlists}
                    });
                } else{
                    storeReducer({
                        type: GlobalStoreActionType.SEARCH_PLAYLISTS,
                        payload: {idNamePairs: []}
                    });
                }
            } else if(pageOpen == 2){
                let response = await api.searchPlaylistByUser(query);
                
                if (response.data.success) {
                    
                    let playlists = response.data.idNamePairs;
                    storeReducer({
                        type: GlobalStoreActionType.SEARCH_PLAYLISTS,
                        payload: {idNamePairs: playlists}
                    });
                } else{
                    storeReducer({
                        type: GlobalStoreActionType.SEARCH_PLAYLISTS,
                        payload: {idNamePairs: []}
                    });
                }
            }
        }

        asyncPerformSearch(query,pageOpen);
    }


    store.addLike = function(id){
        
        async function asyncAddLike(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                
                if(playlist.likes == null || playlist.likes == undefined){
                    playlist.likes = 0;
                }
                
                playlist.likes = playlist.likes + 1;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.ADD_LIKE,
                                    payload: {
                                        idNamePairs: pairsArray
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncAddLike(id);
    }

    store.addDislike = function(id){
        
        async function asyncAddLike(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                
                if(playlist.dislikes == null || playlist.dislikes == undefined){
                    playlist.dislikes = 0;
                }
                
                playlist.dislikes = playlist.dislikes + 1;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.ADD_LIKE,
                                    payload: {
                                        idNamePairs: pairsArray
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncAddLike(id);
    }

    

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        const response = await api.createPlaylist(newListName, [], auth.user.email);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let response = await api.getPlaylistPairs();
            if (response.status === 200){
                let pairsArray = response.data.idNamePairs;
            
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: pairsArray
            }
            );
        }

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // history.push("/playlist/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }


    function getCurrentList() {
        return store.currentList;
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.markListForEdit = function (id) {
        async function getListToEdit(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_EDIT,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToEdit(id);
        
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }


    store.unmarkListForDeletion = function () {
        async function unmark() {
            
                
                storeReducer({
                    type: GlobalStoreActionType.HIDE_MODALS,
                    
                });
            }
        
        unmark();
    }

    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.status == 200) {
                store.loadIdNamePairs();
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        console.log('removing')
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                
                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    // history.push("/playlist/" + playlist._id);
                   
                }
            }
        }
        asyncSetCurrentList(id);
    }


    store.loadComments = function(id){

        async function asyncLoadComments(id) {

            let response = await api.getPlaylistById(id);

            if (response.data.success) {

                let playlist = response.data.playlist;
                
                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.LOAD_COMMENTS,
                        payload: playlist.comments
                    });
                    // history.push("/playlist/" + playlist._id);
                   
                }
            }
        }
        asyncLoadComments(id);
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };