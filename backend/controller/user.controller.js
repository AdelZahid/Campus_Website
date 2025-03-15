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
      res.status(201).json({
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
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

export const getUserProfile = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const user = await User.findById(loggedInUser).populate(
      "friends",
      "username email"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the list of friends
    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in getUserProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const addFriend = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if req.user._id is defined
    if (!req.user?._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const currentUser = await User.findById(req.user._id);
    console.log("Current User:", currentUser);

    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find the user to add as a friend
    const userToAdd = await User.findOne({ email });
    console.log("User to add:", userToAdd);

    if (!userToAdd) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already a friend
    if (currentUser.friends.includes(userToAdd._id)) {
      return res.status(400).json({ message: "User already added" });
    }

    // Add the user to the friends list
    currentUser.friends.push(userToAdd._id);
    await currentUser.save();

    console.log("Friend added successfully:", userToAdd);
    res
      .status(200)
      .json({ message: "Friend added successfully", user: userToAdd });
  } catch (error) {
    console.log("Error in addFriend:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteFriend = async (req, res) => {
  try {
    const { friendId } = req.body;

    // Check if req.user._id is defined
    if (!req.user?._id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: User not authenticated" });
    }

    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(404).json({ message: "Current user not found" });
    }

    // Remove the friend from the friends list
    currentUser.friends = currentUser.friends.filter(
      (id) => id.toString() !== friendId
    );
    await currentUser.save();

    res.status(200).json({ message: "Friend deleted successfully" });
  } catch (error) {
    console.log("Error in deleteFriend:", error);
    res.status(500).json({ error: "Server error" });
  }
};
