import { createContext , useState} from "react";

const songContext = createContext({
    currentSong: null,
    setCurrentSong: () => {},
    soundPlayed: null,
    setSoundPlayed: () => {},
    isPaused: null,
    setIsPaused: () => {},
});

export default songContext;