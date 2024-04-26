const User = require("../models/user");
const bcrpt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please provide email and password",
      });
    }

    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrpt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      user = user.toObject();
      user.token = token;
      user.password = undefined;

      const option = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, option).status(200).json({
        success: true,
        token,
        user,
        message: "user looged  succes",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role, batch } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        Message: "User already exists",
      });
    }

    let hashedpassword;
    try {
      hashedpassword = await bcrpt.hash(password, 10);
    } catch (e) {
      return res.status(500).json({
        success: false,
        message: "nahi hua hash",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedpassword,
      role,
      batch,
    });

    return res.status(200).json({
      success: true,
      message: "user created successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "plz try again later",
    });
  }
};

exports.getusers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
        users,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
