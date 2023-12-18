import { useState } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from '@iconify/react';
import { makeAuthenticatedGETRequest } from "../utils/serverHelper";
import SingleSongCard from "../components/shared/SingleSongCard";
import { json } from "react-router-dom";

const SearchPage = () =>{

    const [isInutFocused,SetIsinputFocused] = useState(false);
    const [searchText , SetSearchText] =useState("");
    const [songData , SetSongData] = useState([]);

    const SearchSong = async () =>{
        const response = await makeAuthenticatedGETRequest("/song/get/songname/" + searchText);
        SetSongData(response.data);
    };

    return (
        <LoggedInContainer curActiveScreen="search">
            <div className="w-full py-6">
                <div className={`flex w-1/3 p-3 space-x-5 text-lg rounded-full bg-zinc-900 text-white px-5 items-center ${isInutFocused ? "border border-white" : ""}`}>
                    <div>
                        <Icon icon="ic:outline-search"  width={23}/>
                    </div>
                    <input type="text" placeholder="What do you want to Listen to?"
                        className="w-full bg-zinc-900 text-white focus:outline-none"
                        onFocus={()=>{
                                SetIsinputFocused(true)
                        }}
                        onBlur={()=>{
                            SetIsinputFocused(false)
                        }}
                        onChange={(e)=>{
                            SetSearchText(e.target.value)
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                SearchSong();
                            }
                        }}
                    />
                </div>
                {songData.length > 0 ? (
                    <div className="pt-10 space-y-3">
                        <div className="text-white">
                            Showing search results for
                            <span className="font-bold"> {searchText}</span>
                        </div>
                        {songData.map((item) => {
                            return (
                                <SingleSongCard
                                    info={item}
                                    key={JSON.stringify(item)}
                                    playSound={() => {}}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-gray-400 pt-10">
                        Nothing to show here.
                    </div>
                )}
            </div>
        </LoggedInContainer>
    );
};

export default SearchPage;