# HCDE 438 Final Project
## Memorji: An Emoji Sequence Game

### Project Overview and Purpose
Players must memorize and repeat a randomly generated sequence of emojis. Each round will become increasingly
difficult as a new emoji is added to the sequence. The player must recall the full pattern correctly
to continue.

This goal of this game is to provide an engaging and entertaining way to help users strengthen memory and pattern recognition skills. 

### Technology

* Firebase/Firestore
* React (Vite)
* JavaScript
* HTML
* CSS

### Setup and Installation
1. git clone https://github.com/ruby-cs/hcde438final
2. npm install
3. Set up Firebase project (https://console.firebase.google.com/u/0/?pli=1)
4. Create Firebase config
5. npm run dev

### Usage guidelines

Home page: Enter a username to create or load a previous profile (or continue as Guest), then press "Start" to begin.

Game: Watch the emoji sequence flash on the screen, then click the emojis in the correct order. Score increases after each successfully repeated sequence. Each level increases in difficulty as another emoji is added to the sequence. If the player incorrectly inputs a sequence, the game ends and the score is saved (if a username was entered). You can then begin a new game.

Leaderboard page: If the player entered a username, the leaderboard will display the user's top 10 scores, along with their dates and timestamps. If the player is not playing under a username, there will be no scores to display.

### API

Fetched emoji set for button and sequence generation.
EmojiHub API: https://emojihub.yurace.pro/api/all

### Future Enhancements and Issues

Currently, the application works as intended. In the future, there is possibility for a global leaderboard to allow for users to view other players' scores.

### AI Statement

ChatGPT was used to debug the random emoji generation.
* "Generate emojis, emoji ID codes"
This created the decodeHtmlEmoji used in game.jsx and home.jsx. Originally, the API was fetching the codes for emojis rather than displaying the emoji themselves. 

### Reflection

Creating a game was a fun way to include interactive elements and get to apply what I've learned. Working on this project has helped me learn about web development from front-end to back-end. 

I was able to learn how to implement React components, using useEffect and useState. I successfully utilized Firebase and Firestore to store user data for my web application. Additionally, I got the chance to strengthen my JavaScript, HTML/CSS, and API implementation skills I gained from previous projects.

Styling and UX were important aspects as well. I created an application that is accessible, provides feedback to the user, is functional, and visually intuitive. 

Overall, this project expanded my knowledge to React and Firebase and helped me learn how to solve a variety of problems at different stages of the web development process.