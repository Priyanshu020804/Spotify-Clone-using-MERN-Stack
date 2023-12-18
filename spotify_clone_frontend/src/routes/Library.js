import LoggedInContainer from "../containers/LoggedInContainer";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";

const Library = () =>{

    const [myPlaylists , setMyPlaylists] = useState([]);

    useEffect( () =>{
        const getData =async () => {
            const response = await makeAuthenticatedGETRequest("/playlist/get/me");
            setMyPlaylists(response.data);
        }
        getData();
    })

    return(
        <LoggedInContainer curActiveScreen="library">
            <div className="text-white text-xl pt-8 font-semibold">My Playlists</div>
            <div className="py-5 grid gap-4 grid-cols-5 overflow-auto cursor-pointer">
                {myPlaylists.map((item) => {
                    return (
                        <Card
                            key={JSON.stringify(item)}
                            title={item.name}
                            description=""
                            imgUrl={item.thumbnail}
                            playlistId={item._id}
                        />
                    );
                })}
            </div>
        </LoggedInContainer>
    );
};

const Card = ({title, description, imgUrl , playlistId}) => {
    const Navigate = useNavigate();
    return (
        <div className="bg-black bg-opacity-40 w-full p-4 rounded-lg" onClick={() =>{Navigate("/playlist/"+playlistId)}}>
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    );
};

export default Library;