require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/schema/user");
const { validSignup, validSignin } = require("../model/validation/user");

const register = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validSignup.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    if (await User.findOne({ email })) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already exists." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    delete user.password;
    res.json({
      success: true,
      data: user,
      message: "User register successfully.",
    });
  } catch {
    res.status(500).json({ sucess: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = validSignin.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email is not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password." });
    delete user.password;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
      data: user,
      message: "User login successfully.",
    });
  } catch {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { register, login };
