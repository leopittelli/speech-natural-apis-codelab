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

'use strict';

const Language = require('@google-cloud/language');
const language = new Language.LanguageServiceClient();

// [START language_sentiment_string]
async function analyzeSentimentOfText (text) {

  // Instantiates a Document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT'
  };

  // Detects the sentiment of the text
  const [result] = await language.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;
 
  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
}
// [END language_sentiment_string]

// [START language_sentiment_file]
async function analyzeSentimentInFile (bucketName, fileName) {
  // Instantiates a Document, representing the provided file
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT'
  };

  // Detects the sentiment of the text
  const [result] = await language.analyzeSentiment({document: document});
  const sentiment = result.documentSentiment;

  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
}
// [END language_sentiment_file]

// [START language_entities_string]
async function analyzeEntitiesOfText (text) {
  
  // Instantiates a Document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT'
  };

  // Detects entities in the document
  const [result] = await language.analyzeEntities({document: document})
  console.log("Entities:");
  result.entities.forEach(e => console.log(`${e.name}: ${e.type}`))
}
// [END language_entities_string]

// [START language_entities_file]
async function analyzeEntitiesInFile (bucketName, fileName) {
  // Instantiates a Document, representing the provided file
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT'
  };

  // Detects entities in the document
  const [result] = await language.analyzeEntities({document: document})
  console.log("Entities:");
  result.entities.forEach(e => console.log(`${e.name}: ${e.type}`))
}
// [END language_entities_file]

// [START language_syntax_string]
async function analyzeSyntaxOfText (text) {

  // Instantiates a Document, representing the provided text
  const document = {
    content: text,
    type: 'PLAIN_TEXT'
  };

  // Detects syntax in the document
  const [result] = await language.analyzeSyntax({document: document})
  console.log("Parts:");
  result.tokens.forEach(t => console.log(`${t.text.content}: ${t.partOfSpeech.tag}`))
}
// [END language_syntax_string]

// [START language_syntax_file]
async function analyzeSyntaxInFile (bucketName, fileName) {
  // Instantiates a Document, representing the provided file
  const document = {
    gcsContentUri: `gs://${bucketName}/${fileName}`,
    type: 'PLAIN_TEXT'
  };

  // Detects syntax in the document
  const [result] = await language.analyzeSyntax({document: document})
  console.log("Parts:");
  result.tokens.forEach(t => console.log(`${t.text.content}: ${t.partOfSpeech.tag}`))
}
// [END language_syntax_file]

require(`yargs`)
  .demand(1)
  .command(
    `sentiment-text <text>`,
    `Detects sentiment of a string.`,
    {},
    (opts) => analyzeSentimentOfText(opts.text)
  )
  .command(
    `sentiment-file <bucket> <filename>`,
    `Detects sentiment in a file in Google Cloud Storage.`,
    {},
    (opts) => analyzeSentimentInFile(opts.bucket, opts.filename)
  )
  .command(
    `entities-text <text>`,
    `Detects entities in a string.`,
    {},
    (opts) => analyzeEntitiesOfText(opts.text)
  )
  .command(
    `entities-file <bucket> <filename>`,
    `Detects entities in a file in Google Cloud Storage.`,
    {},
    (opts) => analyzeEntitiesInFile(opts.bucket, opts.filename)
  )
  .command(
    `syntax-text <text>`,
    `Detects syntax of a string.`,
    {},
    (opts) => analyzeSyntaxOfText(opts.text)
  )
  .command(
    `syntax-file <bucket> <filename>`,
    `Detects syntax in a file in Google Cloud Storage.`,
    {},
    (opts) => analyzeSyntaxInFile(opts.bucket, opts.filename)
  )
  .example(`node $0 sentiment-text "President Obama is speaking at the White House."`)
  .example(`node $0 sentiment-file my-bucket file.txt`, `Detects sentiment in gs://my-bucket/file.txt`)
  .example(`node $0 entities-text "President Obama is speaking at the White House."`)
  .example(`node $0 entities-file my-bucket file.txt`, `Detects entities in gs://my-bucket/file.txt`)
  .example(`node $0 syntax-text "President Obama is speaking at the White House."`)
  .example(`node $0 syntax-file my-bucket file.txt`, `Detects syntax in gs://my-bucket/file.txt`)
  .wrap(120)
  .recommendCommands()
  .epilogue(`For more information, see https://cloud.google.com/natural-language/docs`)
  .help()
  .strict()
  .argv;
