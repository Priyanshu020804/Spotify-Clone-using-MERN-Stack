# Spotify-Clone-Project

A Spotify Clone application made using MERN Stack (MongoDB, Express js, React js, Node js)

The Spotify Clone application is composed of the following Features:

## Front-End Features

### User Authentication

- **Sign-Up and Login:** Users can create an account and log in securely using passport-jwt for authentication and bcrypt for password hashing.

### User Dashboard

- **Home Page:** A basic, clean home page welcomes users upon logging in.

### Music Management

- **Upload Songs:** Users can upload their favorite songs to the platform.
- **Create Playlist:** The ability to create personalized playlists.
- **Add to Playlist:** Users can easily add songs to their playlists.

### Music Discovery

- **Search Functionality:** Users can search for songs uploaded by other users, expanding their music library.
- **Play Songs:** The application allows users to play songs directly within the browser.

## Back-End Features

### Authentication and Security

- **Passport-jwt:** Token-based authentication ensures secure access for registered users.
- **bcrypt:** Passwords are securely hashed before being stored in the database.

### Data Storage

- **MongoDB Atlas:** Utilizes MongoDB Atlas for efficient and scalable storage of user information, songs, and playlists.

### API Endpoints

- **User Management:** Handles user registration, authentication, and profile information.
- **Song Management:** Manages the storage and retrieval of songs.
- **Playlist Management:** Allows for the creation and modification of playlists.

### Note

- **User-Friendly UI:** The front-end features a simple, clean, and user-friendly design for an enjoyable experience.

Feel free to explore, discover, and enhance your music journey with [Your Project Name]! If you have any questions or feedback, please don't hesitate to reach out.

Happy Listening! 🎶


This project also demonstrates:

* a typcial React project layout structure


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

The following software is required to be installed on your system:

* Node v 20.10.0

Type the following commands in the terminal to verify your node and npm versions

### Install

Follow the following steps to get development environment running.

* Clone _'Spotify-Clone-using-MERN-Stack.git'_ repository from GitHub

  ```bash
  git clone https://github.com/Priyanshu020804/Spotify-Clone-using-MERN-Stack.git
  ```

   _OR USING SSH_

  ```bash
  git clone git@github.com:Priyanshu020804/Spotify-Clone-using-MERN-Stack.git
  ```

* Install node modules

   ```bash
   cd SPOTIFY-CLONE-USING-MERN-STACK
   cd spotify_clone_frontend
   npm install
   cd..
   cd spotify_clone_backend
   npm install
   ```


### Starting both front end and back end servers

* Build application

  This command will start the front end part.

  ```bash
  
  cd spotify_clone_frontend
  npm run start

  ```
  This command will start the back end server.
  
   ```bash
  
  cd spotify_clone_backend
  node index.js

  ```

# Configuration Setup

Before running the application, make sure to set up your environment variables by creating a `.env` file in the `backend` subfolder of your project. Follow these steps:

1. Navigate to the `backend` subfolder in your project directory.

2. Create a new file named `.env` in the `backend` subfolder.

3. Open the `.env` file and add the following content:

```env
MONGO_PASSWORD= Your_Mongo_Password_Here
secretOrKey= Your_Secret_Key_Here
cloudinary_cloudName= Your_Cloudinary_CloudName_Here
cloudinary_upload_preset= Your_Cloudinary_Upload_Preset_Here
```


## Additional Information

- **Reference Playlist:** [YouTube Playlist](https://www.youtube.com/playlist?list=PLY7exrvAQSeuh1_V-b4Sj-4Fhe03noob1)


---


