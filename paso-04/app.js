var express = require('express');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express();
var recognize = require('./recognize');
var analyze = require('./analyze');
var bodyParser = require('body-parser');

app.set('view engine', 'hbs');

app.use(bodyParser());

app.get('/', function (req, res) {
  res.render("index");
});

app.post('/recognize', upload.single('audio'), function (req, res) {
  recognize.recognizeSync(req.file.path).then(function(recognizedText) {
    res.render("index", {recognizedText: recognizedText});
  });
});

app.post('/sentiment-text', function (req, res) {
  analyze.analyzeSentimentOfText(req.body.text).then(function(analizedText) {
    res.render("index", {analizedText: analizedText});
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});