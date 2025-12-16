const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  index,
  createOrder,
  changeOrderStatus,
} = require("../controller/order.controller");

router.get("/", index);
router.post("/create-order", upload.single("file"), createOrder);
router.patch("/change-status", changeOrderStatus);

module.exports = router;
