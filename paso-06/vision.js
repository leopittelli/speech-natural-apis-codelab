const Vision = require('@google-cloud/vision');
const config = require('./config')

module.exports = {
  ocr: function(image) {
    // Instantiates a client
    const vision = Vision(config.config);

    return vision.detectText(image).then(function(data) {
      return data[0][0];
    });
  }
};

