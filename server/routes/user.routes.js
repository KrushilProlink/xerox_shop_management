const express = require("express");
const router = express.Router();
const { index } = require("../controller/user.controller");

router.get("/", index);

module.exports = router;
