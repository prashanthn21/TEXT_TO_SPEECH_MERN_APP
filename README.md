Here's an improved version of your README.md for better understanding:

---

# 🗣️ Text-to-Speech MERN App

Convert text into natural-sounding speech using the ElevenLabs API, with React (frontend) and Express.js (backend).

## 🚀 Live Demo
- 🔗 [Live App on Vercel](#)

## 📌 Features
- ✅ Convert text to speech using ElevenLabs API
- ✅ Download & play generated speech files
- ✅ Store & list previously converted text/audio
- ✅ Responsive Tailwind CSS design
- ✅ Error handling for empty text & API failures
- ✅ Hosted on Vercel

## 📂 Project Structure
```
TEXT-TO-SPEECH-MERN-APP
├── backend
│   ├── routes
│   │   └── ttsRoutes.js
│   ├── models
│   │   └── Audio.js
│   └── server.js
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   ├── AudioPlayer.js
│   │   │   └── TextInput.js
├── README.md
└── package.json
```

## 🛠️ Tech Stack
**Frontend (React.js + Tailwind CSS)**
- React.js – UI framework
- Tailwind CSS – Styling

**Backend (Node.js + Express.js)**
- Node.js & Express.js – API server
- Axios – API calls
- Mongoose – Database connection
- CORS – Cross-origin support

**Database**
- MongoDB Atlas – Stores audio URLs & text

## ⚡ Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/prashanthn21/TEXT_TO_SPEECH_MERN_APP.git
cd TEXT_TO_SPEECH_MERN_APP
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
Create a `.env` file in `backend/` with:
```
ELEVENLABS_API_KEY=your_api_key_here
MONGO_URI=your_mongodb_connection_string
```
Start the backend server:
```sh
npm start
```

### 3️⃣ Frontend Setup
```sh
cd frontend
npm install
npm start
```

## 🌍 API Endpoints

### Convert Text to Speech
**POST /api/tts**
- **Request Body:**
```json
{
  "text": "Hello, world!"
}
```
- **Response:**
```json
{
  "audioUrl": "http://localhost:5000/public/tts-audio-12345.mp3"
}
```

## 📷 Screenshots
- Text Input
- Audio Playback

## 🚀 Deployment

### Backend (Vercel)
1. Go to Vercel and create a new project.
2. Connect to your GitHub repository.
3. Set environment variables in Vercel.
4. Deploy 🚀

### Frontend (Vercel)
Deploy frontend using Vercel CLI:
```sh
npm run build
vercel
```

## 🛠️ Troubleshooting
- **Audio not playing?** Ensure the backend `public/` folder is correctly exposed.
- **API key errors?** Check the `.env` file and verify the API key.
- **CORS issue?** Ensure CORS is enabled in Express.

## 🙌 Contributions
Feel free to contribute! Open issues or pull requests.

## 📜 License
This project is licensed under the MIT License.

---

Feel free to customize further if needed!
