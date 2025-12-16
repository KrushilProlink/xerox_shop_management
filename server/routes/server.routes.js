const express = require('express');
const route = express.Router();
const verifyToken = require("../middlewares/auth");

const authRoutes = require("./auth.routes");
const orderRoutes = require("./order.routes");
const userRoutes = require("./user.routes");

route.use('/auth', authRoutes);
route.use('/order',verifyToken, orderRoutes);
route.use('/user',verifyToken, userRoutes);

module.exports = route;