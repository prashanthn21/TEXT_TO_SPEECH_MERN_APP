import { useState } from "react";
import TextToSpeech from "./components/TextToSpeech";

function App() {
  const [text, setText] = useState(""); // State for input text
  const [audioSrc, setAudioSrc] = useState(""); // State for audio URL

  const handleConvert = () => {
    // Dummy function (backend will generate actual audio)
    if (!text) return alert("Please enter text!");
    const dummyAudio = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    setAudioSrc(dummyAudio);
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
     <TextToSpeech />
   </div>
  );
     
}

export default App;
