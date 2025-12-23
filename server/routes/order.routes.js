const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  index,
  createOrder,
  changeOrderStatus,
  deleteOrder
} = require("../controller/order.controller");

router.get("/", index);
router.post("/create-order", upload.single("file"), createOrder);
router.patch("/change-status", changeOrderStatus);
router.delete("/delete/:id", deleteOrder);

module.exports = router;
