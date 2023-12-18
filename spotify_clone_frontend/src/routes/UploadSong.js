import React, { useState, useEffect } from 'react';
import LoggedInContainer from '../containers/LoggedInContainer';
import TextInput from '../components/shared/TextInput';
import CloudinaryUpload from '../components/shared/CloudinaryUpload';
import { makeAuthenticatedPOSTRequest } from '../utils/serverHelper';
import {useNavigate} from 'react-router-dom';

const UploadSong = () =>{
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

    const [name,setName] = useState("");
    const [thumbnail , setThumbnail] = useState("");
    const [playlistUrl , setPlaylistUrl] = useState("");
    const [uploadedSongFileName , setUploadedSongFileName] = useState();
    const navigate =useNavigate();

    const submitSong= async() =>{
        const data = {name,thumbnail, track:playlistUrl};
        const response= await makeAuthenticatedPOSTRequest("/song/create",data);
        if(response.err){
            alert("Could not create song");
            return;
        }else{
            alert("success");
            navigate("/home");
        }
    };

    return (
        <LoggedInContainer>
        <div>
            <div className="content p-8 pt-0 overflow-auto">
                <div className="text-3xl font-semibold mb-5 text-white mt-8">
                    Upload Your Music
                </div>
                <div className="w-2/3 flex space-x-3">
                    <div className="w-1/2">
                        <TextInput
                            label="Name"
                            labelClassName={"text-white"}
                            placeholder="Name"
                            value={name}
                            setValue={setName}
                        />
                    </div>
                    <div className="w-1/2">
                        <TextInput
                            label="Thumbnail"
                            labelClassName={"text-white"}
                            placeholder="Thumbnail"
                            value={thumbnail}
                            setValue={setThumbnail}
                        />
                    </div>
                </div>
                <div className='py-5'>
                    {uploadedSongFileName ? (
                        <div className='bg-white rounded-full p-3 w-1/3 font-semibold overflow-hidden'>{uploadedSongFileName.substring(0,40)}...</div>
                    ) : (
                        <CloudinaryUpload setUrl={setPlaylistUrl} setName={setUploadedSongFileName}/>
                    )}

                    <div className='bg-white w-40 text-l p-3 flex items-center justify-center cursor-pointer rounded-full font-semibold hover:font-bold transform transition-transform hover:scale-105 mt-4' onClick={submitSong}>
                        Submit Song                        
                    </div>
                </div>
            </div>        
        </div>
        </LoggedInContainer>
    );
};

export default UploadSong;




  


      


