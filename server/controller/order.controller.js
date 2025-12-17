const Order = require("../model/schema/order");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const index = async (req, res) => {
  try {
    const { search, status, page = 1, limit = 10 } = req.query;

    const userRole = req.user.role;
    const userId = req.user._id;

    let filter = {};

    // user role wise data
    if (userRole === "user") {
      filter.createdBy = userId;
    }

    // 🔍 search by studentName OR stdId
    if (search) {
      filter.$or = [
        { studentName: { $regex: search, $options: "i" } },
        { stdId: { $regex: search, $options: "i" } },
      ];
    }

    // status filter
    if (status && status !== "all") {
      filter.status = status;
    }

    const currentPage = Number(page);
    const perPage = Number(limit);
    const skip = (currentPage - 1) * perPage;

    const totalRecords = await Order.countDocuments(filter);

    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage);

    res.status(200).json({
      success: true,
      pagination: {
        totalRecords,
        currentPage,
        perPage,
        totalPages: Math.ceil(totalRecords / perPage),
      },
      data: orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "orders",
      resource_type: "auto",
    });

    fs.unlinkSync(req.file.path);

    const order = await Order.create({
      stdId: req.body.stdId,
      studentName: req.body.studentName,
      amount: req.body.amount,
      pages: req.body.pages,
      copies: req.body.copies,
      printType: req.body.printType,
      sides: req.body.sides,
      lunchTime: req.body.lunchTime,
      createdBy: req.user._id,
      // createdBy: "69402af8956194a61f2b452d",

      file: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        fileType: uploadResult.resource_type,
      },
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changeOrderStatus = async (req, res) => {
  try {
    const { status, orderId } = req.body;
    const orders = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    orders.updatedAt = Date.now();
    await orders.save();
    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { index, createOrder, changeOrderStatus, deleteOrder };
