const Language = require('@google-cloud/language');
const config = require('./config')

module.exports = {
  analyzeSentimentOfText: function(text) {
    // Instantiates a client
    const language = Language(config.config);

    // Instantiates a Document, representing the provided text
    const document = language.document({
      // The document text, e.g. "Hello, world!"
      content: text
    });

    // Detects the sentiment of the document
    return document.detectSentiment()
      .then((results) => {
        const sentiment = results[0];
        console.log(`Sentiment ${sentiment}: ${sentiment >= 0 ? 'positive' : 'negative'}.`);
        return sentiment;
    });
  }
};

