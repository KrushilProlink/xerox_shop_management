const express = require('express');
const route = express.Router();
const verifyToken = require("../middlewares/auth");

const authRoutes = require("./auth.routes");
const orderRoutes = require("./order.routes");

route.use('/auth', authRoutes);
route.use('/order',verifyToken, orderRoutes);

module.exports = route;