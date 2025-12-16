const express = require('express');
const route = express.Router();
const verifyToken = require("../middlewares/auth");

const authRoutes = require("./auth.routes");
const orderRoutes = require("./order.routes");
const userRoutes = require("./user.routes");
const dashboardRoutes = require("./dashboard.routes");
route.use('/auth', authRoutes);
route.use('/order',verifyToken, orderRoutes);
route.use('/student',verifyToken, userRoutes);
route.use('/dashboard',verifyToken, dashboardRoutes);

module.exports = route;