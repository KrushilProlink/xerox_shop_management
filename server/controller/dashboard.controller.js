const Order = require("../model/schema/order");
const User = require("../model/schema/user");

const formatDate = (date) => {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const y = date.getFullYear();
  return `${d}-${m}-${y}`;
};

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

const index = async (req, res) => {
  try {
    const { filterType = "all" } = req.query;

    const now = new Date();

    let statsDateFilter = {};

    let fromDate = null;
    let toDate = null;

    if (filterType === "today") {
      fromDate = startOfDay(now);
      toDate = endOfDay(now);
    }

    if (filterType === "yesterday") {
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      fromDate = startOfDay(yesterday);
      toDate = endOfDay(yesterday);
    }

    if (filterType === "week") {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - 6);
      fromDate = startOfDay(weekStart);
      toDate = endOfDay(now);
    }

    if (filterType === "month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      fromDate = startOfDay(monthStart);
      toDate = endOfDay(now);
    }

    if (fromDate && toDate) {
      statsDateFilter = {
        updatedAt: { $gte: fromDate, $lte: toDate },
      };
    }

    const [orderStats] = await Order.aggregate([
      { $match: statsDateFilter },
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

    let chartFromDate = fromDate;
    let chartToDate = toDate;

    if (filterType === "all") {
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - 6);
      chartFromDate = startOfDay(weekStart);
      chartToDate = endOfDay(now);
    }


    let chartData = [];

    if (chartFromDate && chartToDate) {
      const chartAgg = await Order.aggregate([
        {
          $match: {
            updatedAt: {
              $gte: chartFromDate,
              $lte: chartToDate,
            },
          },
        },
        {
          $group: {
            _id: {
              day: { $dayOfMonth: "$updatedAt" },
              month: { $month: "$updatedAt" },
              year: { $year: "$updatedAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
      ]);

      const tempDate = new Date(chartFromDate);

      while (tempDate <= chartToDate) {
        const day = tempDate.getDate();
        const month = tempDate.getMonth() + 1;
        const year = tempDate.getFullYear();

        const found = chartAgg.find(
          (item) =>
            item._id.day === day &&
            item._id.month === month &&
            item._id.year === year
        );

        chartData.push({
          name: formatDate(tempDate),
          count: found ? found.count : 0,
        });

        tempDate.setDate(tempDate.getDate() + 1);
      }
    }
    res.status(200).json({
      success: true,
      filters: {
        filterType,
        fromDate,
        toDate,
      },
      data: {
        totalStudents,
        totalOrders: orderStats.totalOrders[0]?.count || 0,
        pendingOrders: orderStats.pendingOrders[0]?.count || 0,
        completedOrders: orderStats.completedOrders[0]?.count || 0,
        totalEarned: orderStats.totalEarned[0]?.amount || 0,
        cashCount: orderStats.cashCount[0]?.count || 0,
      },
      chartData,
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { index };
