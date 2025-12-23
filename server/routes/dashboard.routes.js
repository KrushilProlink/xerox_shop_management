const express = require("express");
const router = express.Router();
const { index } = require("../controller/dashboard.controller");

router.get("/", index);

module.exports = router;
