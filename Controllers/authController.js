const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Users = require("../models/UsersSchema");
const Customers = require("../models/customerSchema");
const Products = require("../models/productSchema");
const generate = require("../models/refreshSchema");
const { normalToken } = require("../Utility/normalToken");
const { refreshToken } = require("../Utility/refreshToken");

const register = async (req, res) => {
  try {
    const newdata = await Users.create(req.body);
    return res.status(200).json({
      message: "Data created successfully",
      data: newdata,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email = "", password = "" } = req.body || {};
    const user = await Users.findOne({ email: email });
    if (password === user?.password) {
      const token = normalToken(user);
      const newToken = refreshToken(user);
      await generate.insertOne({ token: newToken });
      return res
        .cookie("newToken", newToken, {
          path: "/",
          httpOnly: true,
          secure: false,
          sameSite: "lax",
        })
        .status(200)
        .json({
          message: "Login successful",
          token: token,
          user: user?.name,
          role: user?.role,
        });
    } else {
      return res.status(401).json({ message: "Invalid  password", data: null });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, data: null });
  }
};
const newgetToken = async (req, res) => {
  try {
    const newToken = req.cookies["newToken"];

    if (!newToken) {
      return res.status(400).json({ message: "No refresh token " });
    }

    const existingToken = await generate.findOne({ token: newToken });

    if (!existingToken) {
      return res.status(403).json({ message: "Refresh token not found" });
    }

    jwt.verify(newToken, process.env.SECRET_KEY, async (err, data) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        const token = normalToken(data);
        const user = await Users.findById(data.id).lean();
        return res.status(200).json({
          message: "Success",
          token: token,
          user: user?.name,
          role: user?.role,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("newToken", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    res.status(200).json({ message: "Logout successfully!!" });
  } catch (error) {
    return res.status(500).json({ message: "Logout unsuccessfull!!" });
  }
};

module.exports = {
  register,
  login,
  newgetToken,
  logout,
};
