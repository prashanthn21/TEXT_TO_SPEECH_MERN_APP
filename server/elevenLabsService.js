const axios = require('axios');

const elevenLabsAPIKey = 'sk_91463a8f61678cff90fe0d315ec51b05ba4bc5deee180eb5';  // Replace with your actual API key

const generateSpeech = async (text) => {
    const url = 'https://api.elevenlabs.io/v1/text-to-speech';
    
    const data = {
        text,
        voice: 'en_us_male_1',  // You can choose different voice options from ElevenLabs
        speed: 1.0              // Adjust the speed if necessary
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${elevenLabsAPIKey}`
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data;
    } catch (error) {
        console.error('Error generating speech:', error);
        throw error;
    }
};

module.exports = { generateSpeech };