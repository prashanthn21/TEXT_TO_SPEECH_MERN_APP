import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, Send, AlertTriangle } from "lucide-react"; // Icons
import { motion } from "framer-motion";

const App = () => {
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  // Fetch previous TTS history
  const fetchHistory = async () => {
    try {
      const response = await axios.get("https://tts-server-3fvofbrca-prashanths-projects-d114deca.vercel.app/api/tts-history");
      setHistory(response.data);
    } catch (error) {
      console.error("❌ Error fetching history:", error);
    }
  };

  // Handle TTS conversion
  const handleConvert = async () => {
    setError(null);

    if (!text.trim()) {
      setError(" Please enter text before converting!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://tts-server-3fvofbrca-prashanths-projects-d114deca.vercel.app/api/tts", { text });
      setAudioUrl(response.data.audioUrl);
      fetchHistory(); // Refresh history after new conversion
    } catch (error) {
      setError("❌ Error generating speech. Please try again.");
      console.error("❌ API Error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-10 text-white">
      <motion.h1 
        className="text-4xl font-bold mb-6" 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        🎤 Text-to-Speech Converter
      </motion.h1>

      {/* Error Alert */}
      {error && (
        <motion.div
          className="bg-red-500 text-white p-3 rounded-lg flex items-center gap-2 shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AlertTriangle className="w-5 h-5" />
          {error}
        </motion.div>
      )}

      {/* Text Input */}
      <motion.textarea
        className="border p-3 w-full max-w-lg h-32 rounded-lg bg-white text-black shadow-lg mt-4"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        whileFocus={{ scale: 1.05 }}
      ></motion.textarea>

      {/* Convert Button */}
      <motion.button
        onClick={handleConvert}
        className="mt-4 px-6 py-2 flex items-center bg-blue-700 hover:bg-blue-800 text-white rounded-lg shadow-lg transition duration-300"
        whileHover={{ scale: 1.05 }}
      >
        {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" />}
        Convert to Speech
      </motion.button>

      {/* Latest Audio */}
      {audioUrl && (
        <motion.div 
          className="mt-6 w-full max-w-lg p-4 bg-white text-black rounded-lg shadow-lg"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold">🎵 Latest Audio</h2>
          <audio controls className="w-full mt-2">
            <source src={audioUrl} type="audio/mpeg" />
          </audio>
        </motion.div>
      )}

      {/* Previous Audio List */}
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-3">📜 Previous Conversions</h2>
        {history.length === 0 && <p>No previous conversions.</p>}
        {history.map((item, index) => (
          <div key={index} className="bg-white text-black p-3 rounded-lg mb-2 shadow-lg flex items-center justify-between">
            <span>{item.text.substring(0, 30)}...</span>
            <audio controls>
              <source src={item.audioUrl} type="audio/mpeg" />
            </audio>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
