require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectdb");

const serverRoutes = require("./routes/server.routes");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.use("/api", serverRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB(process.env.MONGO_URI, process.env.DB_NAME);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});