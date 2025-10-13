import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  try {
    const { fullName, userName, password, gender, confirmPassword } = req.body;
    if (!fullName || !userName || !password || !gender || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Incomplete? Just like me without you." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Whoops — those passwords aren't vibing. Try again!",
      });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({
        message:
          "Username’s already partying with someone else. Crash another one",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?userName=${userName}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?userName=${userName}`;
    await User.create({
      fullName,
      userName,
      password: hashedPassword,
      gender,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: "Login failed: Username and password are required." });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "incorrect username or password", success: false });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(201).cookie("token", "", { maxAge: 0 }).json({
      message: "logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
export const otherUser = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUser = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    console.log(req.id);
    return res.status(201).json(otherUser);
  } catch (error) {}
};
