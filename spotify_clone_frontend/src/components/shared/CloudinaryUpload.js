import { openUploadWidget } from "../../utils/CloudinaryService";
import React, { useEffect, useState } from 'react';
import {backendUrl} from'../../utils/config.js';

const CloudinaryUpload = ({setUrl , setName}) => {
    const [cloudinaryCloudName, setCloudinaryCloudName] = useState('');
    const [cloudinaryUploadPreset ,setCloudinaryUploadPreset] = useState('')

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(backendUrl+'/api/secret');
            const data = await response.json();
            setCloudinaryCloudName(data.secretKey1)
            setCloudinaryUploadPreset(data.secretKey2);
        } catch (error) {
            console.error('Error fetching secret key:', error);
        }
        };

        fetchData();
    }, []);

  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: cloudinaryCloudName,
        uploadPreset: cloudinaryUploadPreset,
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
            setUrl(result.info.secure_url);
            setName(result.info.original_filename);
            console.log(setUrl);
            console.log(setName);
        }else{
            if(error){
                console.log(error);
            }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-white text-l cursor-pointer text-black rounded-full p-4 font-semibold  hover:font-bold transform transition-transform hover:scale-105" onClick={uploadImageWidget}>
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
