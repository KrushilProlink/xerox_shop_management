const express = require("express");
const router = express.Router();
const { index, studentDelete } = require("../controller/user.controller");

router.get("/", index);
router.delete("/:id", studentDelete);

module.exports = router;
