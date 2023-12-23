const express = require('express');
require('dotenv').config();
const app = express();
const bodyParser = require('body-parser');

const routes = require('./src/routes/v1');
const config = require('./src/config/config');
const port = config.port;
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
const router = express.Router();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(router);  
app.use('/v1', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

