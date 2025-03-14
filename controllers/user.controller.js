import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";

// send success status to user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
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
      name: name,
      email: email,
      password: password,
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
            ${process.env.BASE_URL}/api/v1/users/verify/${token}
            `,
    };

    transporter.sendMail(mailOption);

    res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "User not registered ",
      error,
      success: false,
    });
  }
};
export const loginUser = async () => {};
export const verifyUser = async () => {};
