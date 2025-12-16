const Order = require("../model/schema/order");
const User = require("../model/schema/user");

const index = async (req, res) => {
  try {
    const { filterType } = req.query; // today | yesterday | week | month

    let dateFilter = {};

    const startOfDay = (date) => {
      date.setHours(0, 0, 0, 0);
      return date;
    };

    const endOfDay = (date) => {
      date.setHours(23, 59, 59, 999);
      return date;
    };

    const now = new Date();

    if (filterType === "today") {
      dateFilter = {
        createdAt: {
          $gte: startOfDay(new Date()),
          $lte: endOfDay(new Date()),
        },
      };
    }

    if (filterType === "yesterday") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      dateFilter = {
        createdAt: {
          $gte: startOfDay(yesterday),
          $lte: endOfDay(yesterday),
        },
      };
    }

    if (filterType === "week") {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);

      dateFilter = {
        createdAt: {
          $gte: startOfDay(weekStart),
          $lte: now,
        },
      };
    }

    if (filterType === "month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

      dateFilter = {
        createdAt: {
          $gte: startOfDay(monthStart),
          $lte: now,
        },
      };
    }

    const [orderStats] = await Order.aggregate([
      {
        $match: dateFilter, 
      },
      {
        $facet: {
          totalOrders: [{ $count: "count" }],

          pendingOrders: [
            { $match: { status: "pending" } },
            { $count: "count" },
          ],

          completedOrders: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],

          totalEarned: [
            { $match: { status: "completed" } },
            { $group: { _id: null, amount: { $sum: "$amount" } } },
          ],

          cashCount: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const totalStudents = await User.countDocuments({ role: "user" });

    const data = {
      totalStudents,
      totalOrders: orderStats.totalOrders[0]?.count || 0,
      pendingOrders: orderStats.pendingOrders[0]?.count || 0,
      completedOrders: orderStats.completedOrders[0]?.count || 0,
      totalEarned: orderStats.totalEarned[0]?.amount || 0,
      cashCount: orderStats.cashCount[0]?.count || 0,
    };

    res.status(200).json({ success: true, data, message: "Dashboard data fetched successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { index };
