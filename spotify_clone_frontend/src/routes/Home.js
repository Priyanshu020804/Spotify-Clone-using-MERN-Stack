import React, { useState, useEffect } from 'react';
import spotify_logo from '../assets/images/spotify_logo_white.svg';
import { Icon } from '@iconify/react';
import IconText from '../components/shared/IconText';
import TextWithHover from '../components/shared/TextWithHover';
import { useNavigate } from 'react-router-dom';

const focusCardsData = [
    {
        title: "Peaceful Piano",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const spotifyPlaylistsCardData = [
    {
        title: "This is one",
        description: "Relax and indulge with beautiful piano pieces",
        imgUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80",
    },
    {
        title: "Deep Focus",
        description: "Keep calm and focus with this music",
        imgUrl: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1766&q=80",
    },
    {
        title: "Instrumental Study",
        description: "Focus with soft study music in the background.",
        imgUrl: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    },
    {
        title: "Focus Flow",
        description: "Up tempo instrumental hip hop beats",
        imgUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
    {
        title: "Beats to think to",
        description: "Focus with deep techno and tech house",
        imgUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
    },
];

const Home = () =>{
    const [div1Width, setDiv1Width] = useState(300); 
    const [isResizing, setIsResizing] = useState(false);
    const [initialMouseX, setInitialMouseX] = useState(0);

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

    const Navigate = useNavigate();

    return (
        <div>
            <div className="w-full h-screen flex bg-black">
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
                            />
                            <IconText 
                                iconName={"material-symbols:search"} 
                                displayText={"Search"}
                            />
                            <IconText 
                                iconName={"icomoon-free:books"} 
                                displayText={"Library"}
                            />
                        </div>
                        <div className='pt-5'>
                            <IconText 
                                iconName={"material-symbols:add-box"} 
                                displayText={"Create Playlist"}
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
                            <div className="w-3/5 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"} />
                                <TextWithHover displayText={"Support"} />
                                <TextWithHover displayText={"Download"} />
                                <div className="h-1/2 border-r border-white"></div>
                            </div>
                            <div className="w-2/5 flex justify-around h-full items-center">
                                <TextWithHover displayText={"Sign up"} onClick={() => {Navigate("/signup")}}/>
                                <div className="bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer hover:font-bold transform transition-transform hover:scale-105"
                                    onClick={() => {Navigate("/login")}}
                                >
                                    Log in
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="content p-8 pt-0 overflow-auto">
                        <PlaylistView titleText="Focus" cardsData={focusCardsData} />
                        <PlaylistView titleText="Spotify Playlists" cardsData={spotifyPlaylistsCardData} />
                        <PlaylistView titleText="Sound of India" cardsData={focusCardsData} />
                    </div>
                </div>

            </div>        
        </div>
    );
};
 

const PlaylistView = ({titleText, cardsData}) => {
    return (
        <div className="text-white mt-8">
            <div className="text-2xl font-semibold mb-5">{titleText}</div>
            <div className="w-full flex justify-between space-x-4">
                {
                    // cardsData will be an array
                    cardsData.map((item) => {
                        return (
                            <Card
                                title={item.title}
                                description={item.description}
                                imgUrl={item.imgUrl}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

const Card = ({title, description, imgUrl}) => {
    return (
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    );
};

export default Home;




  


      


