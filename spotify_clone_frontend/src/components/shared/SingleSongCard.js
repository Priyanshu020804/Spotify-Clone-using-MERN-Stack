import { useContext } from "react";
import songContext from "../../contexts/SongContext";

const SingleSongCard = ({info,playSound}) => {

    const {currentSong , setCurrentSong} = useContext(songContext);
    
    return (
        <div className="flex items-center hover:bg-gray-400 hover:bg-opacity-20 p-2 rounded-sm" 
            onClick={()=>{
                setCurrentSong(info);
            }}
        >
            <div className="w-12 h-12 bg-white bg-cover bg-center" 
                style={{
                    backgroundImage:`url("${info.thumbnail}")`
                }}
            >

            </div>
            <div className="flex w-full justify-between">  
                <div className="flex justify-center flex-col pl-4 w-5/6">
                    <div className="text-white cursor-pointer hover:underline">{info.name}</div>
                    <div className="text-xs text-gray-400 cursor-pointer hover:underline">{info.artist.firstName + " " + info.artist.lastName}</div>
                </div>
                <div className="w-1/6 flex justify-center items-center text-gray-400 text-sm">
                    <div>3:44</div>
                    {/* <div className="text-gray-400 flex items-center justify-center pl-3 text-lg">...</div> */}
                </div>
            </div>
        </div>
    );
};

export default SingleSongCard;