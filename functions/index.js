const functions = require('firebase-functions');
const cors = require('cors');

const express = require('express');
const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use( cors(corsOptions));

require('./routes/auth.routes')(app);
require('./routes/checkList.routes')(app);

exports.api = functions.region('europe-west1').https.onRequest(app);