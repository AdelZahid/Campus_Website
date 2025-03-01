import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import createTonkenAndSaveCookie from "../jwt/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    // Hash password
    const hassedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username,
      email,
      password: hassedPassword,
    });
    await newUser.save();
    if (newUser) {
      createTonkenAndSaveCookie(newUser._id, res);
      res
        .status(201)
        .json({ message: "User registered successfully", newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    } else if (user && isMatch) {
      createTonkenAndSaveCookie(user._id, res);
      res.status(200).json({
        message: "User logged in successfully",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
