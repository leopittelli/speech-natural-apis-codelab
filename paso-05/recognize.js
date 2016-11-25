const Speech = require('@google-cloud/speech');
const config = require('./config')

module.exports = {
  recognizeSync: function(filename) {
    // Instantiates a client
    const speech = Speech(config.config);

    const apiConfig = {
        // Configure these settings based on the audio you're transcribing
        encoding: 'LINEAR16',
        sampleRate: 16000
    };

    // Detects speech in the audio file, e.g. "./resources/audio.raw"
    return speech.recognize(filename, apiConfig)
        .then((results) => {
        const transcription = results[0];
        console.log(`Transcription: ${transcription}`);
        return transcription;
        });
  }
};