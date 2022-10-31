require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { handleErrors } = require('./middlewares/handleErrors');

const { PORT = 3000, NODE_ENV, PATH_PROD } = process.env;
const PATH_DEV = 'mongodb://localhost:27017/moviesdb';
const PATH = NODE_ENV === 'production' ? PATH_PROD : PATH_DEV;

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(PATH);

app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {});
