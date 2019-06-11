/**
 * Copyright 2016, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This application demonstrates how to perform basic recognize operations with
 * with the Google Cloud Speech API.
 *
 * For more information, see the README.md under /speech and the documentation
 * at https://cloud.google.com/speech/docs.
 */

'use strict';

const Speech = require('@google-cloud/speech');

// [START speech_recognize]
async function recognize(filename) {
  const fs = require('fs');
 
  // Creates a client
  const client = new Speech.SpeechClient();
 
  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');
 
  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };
 
  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
}
// [END speech_recognize]

// [START speech_streaming_mic_recognize]
const record = require('node-record-lpcm16');
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';

function streamingMicRecognize () {
// Node-Record-lpcm16
  const record = require('node-record-lpcm16');

  // Imports the Google Cloud client library
  const speech = require('@google-cloud/speech');

  const config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };

  const request = {
    config,
    interimResults: false, //Get interim results from stream
  };

  // Creates a client
  const client = new speech.SpeechClient();

  // Create a recognize stream
  const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data =>
      process.stdout.write(
        data.results[0] && data.results[0].alternatives[0]
          ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
          : `\n\nReached transcription time limit, press Ctrl+C\n`
      )
    );

  // Start recording and send the microphone input to the Speech API
  record
    .start({
      sampleRateHertz: sampleRateHertz,
      threshold: 0, //silence threshold
      recordProgram: 'rec', // Try also "arecord" or "sox"
      silence: '5.0', //seconds of silence before ending
    })
    .on('error', console.error)
    .pipe(recognizeStream);

  console.log('Listening, press Ctrl+C to stop.');
}
// [END speech_streaming_mic_recognize]

require(`yargs`)
  .demand(1)
  .command(
    `recognize <filename>`,
    `Detects speech in an audio file.`,
    {},
    (opts) => recognize(opts.filename)
  )
  .command(
    `listen`,
    `Detects speech in a microphone input stream.`,
    {},
    streamingMicRecognize
  )
  .example(`node $0 ./resources/audio.raw`)
  .example(`node $0 listen`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/speech/docs`)
  .help()
  .strict()
  .argv;
