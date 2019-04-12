require('dotenv').config();
const app = require('express')();
const initServerMiddleware = require('./src/middleware/serverMiddleware');
const router = require('./src/routes');

const port = process.env.PORT || 5000;
const hostname = process.env.HOSTNAME || 'localhost';

initServerMiddleware(app);
app.use('/', router);

app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server running on ${hostname}:${port}`);
});

module.exports = app;