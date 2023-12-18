import { useState } from 'react';
import TextInput from '../components/shared/TextInput';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';

const CreatePlaylistModal = ({closeModal}) =>{

    const [playlistname,setPlaylistname] =useState("");
    const [playlistThumbnail,setPlaylistThumbnail] =useState("");

    const createPlaylist = async () =>{
        const response =await makeAuthenticatedPOSTRequest("/playlist/create" , {name:playlistname , thumbnail:playlistThumbnail , songs:[]});
        if(response._id){
            closeModal();
        }
    };

    return (
        <div className="text-white absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
            <div 
                className="bg-app-black w-1/3 rounded-md p-4"  
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className='text-white mb-5 font-semibold text-lg'>Create Playlist</div>
                <div className='space-y-4'>
                    <TextInput
                        label="Name"
                        labelClassName={"text-white"}
                        placeholder="Playlist Name"
                        value={playlistname}
                        setValue={setPlaylistname}
                    />
                    <TextInput
                        label="Thumbnail"
                        labelClassName={"text-white"}
                        placeholder="Playlist Thumbnail"
                        value={playlistThumbnail}
                        setValue={setPlaylistThumbnail}
                    />
                </div>
                <div className='flex justify-center items-center'>
                    <div className='bg-white text-black w-1/3 text-lg py-3 flex items-center justify-center cursor-pointer rounded-full font-semibold hover:font-bold transform transition-transform hover:scale-105 mt-4' onClick={createPlaylist}>
                        Create                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePlaylistModal;