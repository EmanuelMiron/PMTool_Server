const functions = require('firebase-functions');

const express = require('express');
const app = express();

require('./routes/auth.routes')(app);

exports.api = functions.https.onRequest(app);