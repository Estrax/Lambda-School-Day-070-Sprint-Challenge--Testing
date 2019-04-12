const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

module.exports = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors());
}