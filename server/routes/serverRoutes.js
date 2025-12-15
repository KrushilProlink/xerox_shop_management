const express = require('express');
const route = express.Router();
const authRoutes = require("./authRoutes");

route.use('/auth', authRoutes);

module.exports = route;