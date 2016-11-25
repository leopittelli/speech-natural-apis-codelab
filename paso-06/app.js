var express = require('express');

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express();
var recognize = require('./recognize');
var analyze = require('./analyze');
var vision = require('./vision');
var bodyParser = require('body-parser');

app.set('view engine', 'hbs');

app.use('/static', express.static(__dirname + '/public'));
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

app.post('/ocr', upload.single('image'), function (req, res) {
  vision.ocr(req.file.path).then(function(recognizedText) {
    console.log(recognizedText)
    res.render("index", {recognizedText: recognizedText});
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});