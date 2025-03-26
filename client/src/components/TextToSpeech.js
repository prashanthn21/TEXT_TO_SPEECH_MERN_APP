import React, { useState } from "react";
import axios from "axios";

const TextToSpeech = () => {
  // State variables to manage user input, audio URL, loading state, and error messages
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle the text-to-speech conversion
  const handleConvert = async () => {
    // Validate input: Ensure the text is not empty
    if (!text.trim()) {
      setError("Please enter text to convert.");
      return;
    }

    // Reset states before making the API call
    setLoading(true);
    setError("");
    setAudioUrl("");

    try {
      // Make a POST request to the backend API with the text
      const response = await axios.post("http://localhost:5000/api/tts", { text });

      console.log("🔹 API Response:", response.data); // Debugging log for API response

      // Check if the response contains a valid audio URL
      if (response.data.audioUrl) {
        const validUrl = response.data.audioUrl;
        if (validUrl && validUrl.startsWith("http")) {
          setAudioUrl(validUrl); // Update the audio URL state
        } else {
          setError("Invalid audio URL received from the server."); // Handle invalid URL
        }
      } else {
        setError("Failed to generate audio. Try again."); // Handle missing audio URL
      }
    } catch (err) {
      // Log and display error if the API call fails
      console.error("❌ TTS API Error:", err);
      setError("Something went wrong. Please check the server.");
    } finally {
      // Reset the loading state after the API call
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4">Text-to-Speech Converter</h1>

      {/* Text input area */}
      <textarea
        className="w-96 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
        placeholder="Enter text here..."
        value={text}
        onChange={(e) => setText(e.target.value)} // Update text state on input change
      />

      {/* Convert button */}
      <button
        onClick={handleConvert}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Converting..." : "Convert to Speech"} {/* Show loading state */}
      </button>

      {/* Error message display */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Audio player for the generated speech */}
      {audioUrl && (
        <div className="mt-4">
          <p className="font-semibold">Generated Audio:</p>
          <audio controls className="mt-2">
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <p className="text-sm text-gray-500">🔗 {audioUrl}</p> {/* Display audio URL */}
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
