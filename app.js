const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const urllib = require('url');
const path = require('path');
const crypto = require('crypto');

const config = require('./config.json');
const defaultroutes = require('./routes/default');
const passwordauth = require('./routes/password');
const webuathnauth = require('./routes/webauthn.js');
const https = require('https');
const app = express();
const fs = require('fs');
app.use(bodyParser.json());

/* ----- session ----- */
app.use(
    cookieSession({
        name: 'session',
        keys: [crypto.randomBytes(32).toString('hex')],

        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    }),
);
app.use(cookieParser());

/* ----- serve static ----- */
app.use(express.static(path.join(__dirname, 'static')));

app.use('/', defaultroutes);
app.use('/password', passwordauth);
app.use('/webauthn', webuathnauth);

const port = process.env.PORT || 3000;
app.listen(port);
//console.log(`Started app on port ${port}`);
// https.createServer({}, app).listen(port, () => {
//     console.log('Listening...', port);
// });

// https
//     .createServer(
//         {
//             key: fs.readFileSync('./cert/server.key'),
//             cert: fs.readFileSync('./cert/server.cert'),
//         },
//         app,
//     )
//     .listen(3000, () => {
//         console.log('Listening...');
//     });

module.exports = app;
