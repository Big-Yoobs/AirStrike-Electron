<!-- headline -->
# AIRSTRIKE
! [Airstrike Logo](/assets/gui/logoWhite.png)

<!-- description -->
AirStrike is a desktop application that enables users to watch videos with their friends and family members in real-time, regardless of their geographical location. The user can create a virtual theatre and invite their friends to join and watch videos synced together with a text chat to communicate.

Currently Airstrike is still in development.

## For Developers
To build the project, you need to have [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/en/) installed on your machine. Then, clone the repository and run the following command to install all dependencies:
```bash
npm i
```

To start the application in development, run the following command:
```bash
npm start
```

In this mode you can run the command ```rs``` to restart the application. However, saving changes to the source code should automatically restart the application.

To build the application for production, run the following command:
```bash
npm run package
```

This will create a folder called ```out``` in the root directory of the project. Inside this folder you will find the executable file for your operating system.

## For Users
Airstrike is still in development so to use the application you have to build it yourself following the instructions above.

### Controls
Zoom in/out: ```Ctrl + scroll+``` / ```Ctrl + scroll-``` (library view)

Dev Tools: ```f12```

Refresh: ```f5```

Full Screen: ```f11```

Emoji Picker: ```\``` (room view sidebar chat)

### Room Creation
Rooms can be created automatically by just playing a movie if you are currently not in a room. You can also create a room by clicking the "create room" button in the library view header. 

### Room Joining
To join a room, click on the "join room" button in the library view header and enter the room code which can be found in at the top of the side panel in the room view on the first device.

## Current Issues
- [ ] Video codecs with a variable bitrate are not able to be scrubbed. Any attempt at scrubbing will cause the video to jump back to the start of the video.
- [ ] Some video codecs are not able to be played.
- [ ] Non-AAC audio codecs will not play (ie True Dolby).
- [ ] If a media item with an incompatible codec is played you will sometimes have to restart the application to play other media items (this goes for all other users who were connected via a room).
- [ ] When a user joins a room it can sometimes cause infinite buffering for all users until that person leaves. When this happens sometimes it can be fixed by them restarting the app and rejoining the room with the host keeping the video paused at the 0th frame of the media content.
- [ ] H.265 HEVC video codecs are software decoded and therefore can be quite demanding to play on lower end cpu's.
- [ ] The video player will select the first audio stream of a video container. On some videos this maybe a foreign language or the director's commentary.

