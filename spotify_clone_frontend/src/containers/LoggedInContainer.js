import React, { useState, useEffect, Children , useContext, useLayoutEffect, useRef} from 'react';
import { Howl,Howler } from 'howler';
import spotify_logo from '../assets/images/spotify_logo_white.svg';
import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/shared/TextWithHover';
import songContext from "../contexts/SongContext";
import CreatePlaylistModal from '../modals/CreatePlaylistModal';
import AddToPlaylistModal from '../modals/AddToPlaylistModal';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';
import { useNavigate } from 'react-router-dom';

const LoggedInContainer = ({children , curActiveScreen}) =>{
    const [div1Width, setDiv1Width] = useState(300); 
    const [isResizing, setIsResizing] = useState(false);
    const [initialMouseX, setInitialMouseX] = useState(0);
    const Navigate =useNavigate();

    useEffect(() => {
        const handleMouseMove = (e) => {
        if (isResizing) {
            const widthChange = e.clientX - initialMouseX;
            const newWidth = div1Width + widthChange;
            setDiv1Width(newWidth);
            setInitialMouseX(e.clientX); // Update the initialMouseX for the next move
        }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, div1Width, initialMouseX]);

    const handleMouseDown = (e) => {
        setIsResizing(true);
        setInitialMouseX(e.clientX);
    };

    
    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        // the following if statement will prevent the useEffect from running on the first render.
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSong && currentSong.track]);

    const addSongToPlaylist = async (playlistId) => {
        const songId = currentSong._id;

        const payload = {playlistId, songId};
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/add/song",
            payload
        );
        if(response._id){
            setAddToPlaylistModalOpen(false)
        }
    };

    const playSound = () =>{
        if(!soundPlayed){
            return;
        }
        soundPlayed.play();
    }

    const changeSong = (songSrc) => {
        if (soundPlayed instanceof Howl) {
          soundPlayed.stop(); // Stop the currently playing sound
        }
      
        let sound = new Howl({
          src: [songSrc],
          html5: true
        });
      
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };
      

    const pauseSound = (songSrc) => {
        soundPlayed.pause();
    }
    
    const togglePlayPause = () => {
        if( isPaused ){
            playSound(currentSong.track);
            setIsPaused(false);
        }else{
            pauseSound();
            setIsPaused(true);
        }
    }

    const [createPlaylistModalOpen , setCreatePlaylistModalOpen] = useState(false);
    const [addToPlaylistModalOpen , setAddToPlaylistModalOpen] = useState(false);

    return (
        <div>
            <div className="w-full h-screen bg-black">
                { createPlaylistModalOpen && <CreatePlaylistModal closeModal={ () => {setCreatePlaylistModalOpen(false)}}/>}
                { addToPlaylistModalOpen && <AddToPlaylistModal 
                    closeModal={ () => {setAddToPlaylistModalOpen(false)}} 
                    addSongToPlaylist={addSongToPlaylist}    
                />}
                <div className= {`${currentSong?"h-9/10":"h-full"} w-full flex`}>
                    {/* This is the left panel */}
                    <div
                        className="bg-app-black flex lg:flex-col justify-between pb-10 rounded-md m-2"
                        style={{
                            width: div1Width + 'px',
                            minWidth: 'fit-content',
                            maxWidth: '20vw',
                            flexShrink: 0
                        }}
                    >
                        <div>
                            <div className='LogoDiv p-6'>
                                <img src={spotify_logo} alt='spotify logo' width={125}/>
                            </div>
                            <div className='py-5'>
                                <IconText 
                                    iconName={"material-symbols:home"} 
                                    displayText={"Home"}
                                    targetLink={"/home"}
                                    active={curActiveScreen==="home"}
                                />
                                <IconText 
                                    iconName={"material-symbols:search"} 
                                    displayText={"Search"}
                                    targetLink={"/search"}
                                    active={curActiveScreen==="search"}
                                />
                                <IconText 
                                    iconName={"icomoon-free:books"} 
                                    displayText={"Library"}
                                    targetLink={"/library"}
                                    active={curActiveScreen==="library"}
                                />
                                <IconText 
                                    iconName={"material-symbols:library-music-sharp"} 
                                    displayText={"My Music"}
                                    targetLink={"/myMusic"}
                                    active={curActiveScreen==="myMusic"}
                                />
                            </div>
                            <div className='pt-5'>
                                <IconText 
                                    iconName={"material-symbols:add-box"} 
                                    displayText={"Create Playlist"}
                                    onClick={ () => {setCreatePlaylistModalOpen(true)}}
                                />
                                <IconText 
                                    iconName={"mdi:heart"} 
                                    displayText={"Liked Songs"}
                                />
                            </div>
                        </div>
                        
                        <div className='px-5'>
                            <div className='border border-gray-100 text-white w-3/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer'>
                                <Icon icon="carbon:earth-europe-africa" />
                                <div className='ml-2 text-sm font-semibold'>
                                    English
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-1 cursor-col-resize hover:border-r border-solid border-white'
                        onMouseDown={handleMouseDown}
                    >
                        {/* Resizable handle for the gap */}
                    </div>
                    
                    {/* This is the right panel */}
                    <div className="bg-app-black w-screen m-2 rounded-md overflow-auto">
                        <div className="navbar top-0 w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end z-10">
                            <div className="w-1/2 flex h-full">
                                <div className="w-2/3 flex justify-around items-center">
                                    <TextWithHover displayText={"Premium"} />
                                    <TextWithHover displayText={"Support"} />
                                    <TextWithHover displayText={"Download"} />
                                    <div className="h-1/2 border-r border-white"></div>
                                </div>
                                <div className="w-1/3 flex justify-around h-full items-center">
                                    <TextWithHover displayText={"Upload Song"} onClick={() => {Navigate("/uploadSong")}}/>
                                    <div className="bg-white w-10 h-10 flex items-center justify-center rounded-full font-semibold cursor-pointer hover:font-bold transform transition-transform hover:scale-105">
                                        AC
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="content p-8 pt-0 overflow-auto">
                            {children}
                        </div>
                    </div>

                </div>
                {
                    currentSong &&
                    <div className='w-99/100 mx-2 h-1/10 bg-app-black rounded-md flex'>
                        <div className='w-1/4 flex items-center'>
                            <div className='w-full h-full bg-black bg-opacity-30 text-white flex items-center px-2'>
                                <img
                                    src={currentSong.thumbnail}
                                    alt='CurrentSongThumbnail'
                                    className='h-14 w-14 rounded'
                                />
                                <div className='pl-4'>
                                    <div className='text-sm hover:underline cursor-pointer'>{currentSong.name}</div>
                                    <div className='text-xs text-gray-500 hover:underline cursor-pointer'>{currentSong.artist.firstName + " " + currentSong.artist.lastName}</div>
                                </div>
                            </div>
                        </div>

                        <div className='w-1/2 h-full flex justify-center items-center bg-black bg-opacity-30 text-white flex-col'>
                            <div className='flex w-1/3 justify-between items-center'>
                                <Icon icon="ph:shuffle-fill" fontSize={27} className='cursor-pointer text-gray-500 hover:text-white'/>
                                <Icon icon="mdi:skip-previous-outline" fontSize={33} className='cursor-pointer text-gray-500 hover:text-white'/>
                                <Icon icon={isPaused ? "ic:outline-play-circle-filled" : "ic:outline-pause-circle-filled"} 
                                    fontSize={40} 
                                    className='cursor-pointer text-gray-500 hover:text-white' 
                                    onClick= {() =>{
                                        togglePlayPause();
                                    }}
                                />
                                <Icon icon="mdi:skip-next-outline" fontSize={33} className='cursor-pointer text-gray-500 hover:text-white'/>
                                <Icon icon="ic:twotone-repeat" fontSize={27} className='cursor-pointer text-gray-500 hover:text-white'/>
                            </div>
                            <div>
                            </div>
                        </div>

                        <div className='w-1/4 flex justify-end items-center bg-black bg-opacity-30 text-white pr-4 space-x-4 '>
                            <Icon icon="ic:round-playlist-add" fontSize={35} className='cursor-pointer text-gray-500 hover:text-white' onClick={ () => {setAddToPlaylistModalOpen(true)}}/>
                            <Icon icon="ph:heart-bold" fontSize={27} className='cursor-pointer text-gray-500 hover:text-white'/>
                        </div>

                    </div>  
                }
            </div>    
        </div>
    );
};


export default LoggedInContainer;




  


      


