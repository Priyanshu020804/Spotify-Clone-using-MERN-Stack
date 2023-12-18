import './App.css';
import { BrowserRouter , Routes ,Route, Navigate } from 'react-router-dom';
import LoginComponent from './routes/Login.js';
import SignupComponent from './routes/Signup.js';
import HomeComponent from './routes/Home.js';
import LoggedInHomeComponent from './routes/LoggedInHome.js';
import UploadSongComponent from './routes/UploadSong.js';
import MyMusic from './routes/MyMusic.js';
import SearchPage from './routes/SearchPage.js';
import LibraryPage from './routes/Library.js';
import SinglePlaylistView from './routes/SinglePlaylistView.js';
import { useCookies } from 'react-cookie';
import songContext from './contexts/SongContext.js';
import { useState } from 'react';

function App() {
  const [currentSong , setCurrentSong] =useState(null);
  const [isPaused , setIsPaused] = useState(true);
  const [soundPlayed , setSoundPlayed] = useState(true);
  const [cookie , setCookie] = useCookies();

  return (
    <div className="w-screen h-screen">
        <BrowserRouter>
          { 
            cookie.token ? (
              // logged in routes
              <songContext.Provider value={{currentSong,setCurrentSong,soundPlayed,setSoundPlayed,isPaused,setIsPaused}}>
              <Routes>
                  {/* {adding routes components here indicate to the package (react-router-dom) that we are starting to define our routes inside this} */}
                  <Route path ="/" element={<LoggedInHomeComponent/>} />
                  <Route path ="/home" element={ <LoggedInHomeComponent/> } />
                  <Route path ="/uploadSong" element={ <UploadSongComponent/> } />
                  <Route path ="/myMusic" element={ <MyMusic/> } />
                  <Route path ="/search" element={ <SearchPage/> } />
                  <Route path ="/library" element={ <LibraryPage/> } />
                  <Route path ="/playlist/:playlistId" element={ <SinglePlaylistView/> } />
                  <Route path = "*" element={ <Navigate to="/home" /> } />
              </Routes> 
              </songContext.Provider>
            ) : (
              // logged out routes
              <Routes>
                <Route path ="/home" element={ <HomeComponent/> } />
                <Route path ="/login" element={ <LoginComponent/> } />
                <Route path ="/signup" element={ <SignupComponent/> } />
                <Route path = "*" element={ <Navigate to="/login" /> } />
              </Routes>
            )
          }
        </BrowserRouter>
    </div>
  );
}

export default App;
