import crypto from "crypto";
import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";

// send success status to user
export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    console.table([name, email, password]);
    return res.status(400).json({
      message: "All fields are not provided",
    });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });
    if (!newUser) {
      return res.status(400).json({
        message: "Failed to create new user",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    console.log("token ", token);
    newUser.verificationToken = token;
    await newUser.save();

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: newUser.email,
      subject: "Verify your email", // Subject line
      text: `Please click on the following link:
            ${process.env.BASE_URL}:${process.env.PORT}/api/v1/users/verify/${token}
            `,
    };

    await transporter.sendMail(mailOption).then(console.log, console.error);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered ",
      error: error,
      success: false,
    });
  }
}
export async function loginUser() {}

export async function verifyUser(req, res) {
  const { token } = req.params;
  if (!token) {
    return res.status(400).json({ error: "token is not required" });
  }
  console.log("token ", token);
  try {
    const existingToken = await User.findOne({ verificationToken: token });
    if (!existingToken) {
      return res.status(400).json({
        message: "Token not found",
      });
    }
    existingToken.isVerified = true;
    existingToken.verificationToken = null;
    await existingToken.save();
    return res.status(200).json({
      message: "User verified successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({
      message: "Error verifying user",
      error: error.message,
      success: false,
    });
  }
}
