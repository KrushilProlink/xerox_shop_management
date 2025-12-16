const User = require("../model/schema/user");

const index = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    const userId = req.user._id;

    let filter = { role: 'user' };

    if (search) {
      const orConditions = [
        { username: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];

      if (!isNaN(search)) {
        orConditions.push({ mobileNo: Number(search) });
      }

      filter.$or = orConditions;
    }

    const currentPage = Number(page);
    const perPage = Number(limit);
    const skip = (currentPage - 1) * perPage;

    const totalRecords = await User.countDocuments(filter);

    const users = await User.find(filter)
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
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { index };
