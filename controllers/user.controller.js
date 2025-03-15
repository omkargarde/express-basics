import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";
import {
  APP_ERROR_MESSAGE,
  HTTP_RESPONSE_CODE,
} from "../constants/constants.js";
import { HttpException } from "../constants/httpException.js";
import { User } from "../models/user.model.js";

export async function registerUser(req, res, next) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    console.table([name, email, password]);
    return next(
      new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_ERROR_MESSAGE.notProvideAllCredentials
      )
    );
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new HttpException(
          HTTP_RESPONSE_CODE.CONFLICT,
          APP_ERROR_MESSAGE.userAlreadyExist
        )
      );
    }

    const newUser = await User.create({
      name,
      email,
      password,
    });
    if (!newUser) {
      return next(
        new HttpException(HTTP_RESPONSE_CODE.SERVER_ERROR, APP_ERROR_MESSAGE)
      );
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
    return next(
      new HttpException(
        HTTP_RESPONSE_CODE.SERVER_ERROR,
        APP_ERROR_MESSAGE.notCreatedUser,
        error
      )
    );
  }
}

export async function verifyUser(req, res, next) {
  const { token } = req.params;
  if (!token) {
    return next(
      new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_ERROR_MESSAGE.tokenNotProvided
      )
    );
  }
  console.log("token ", token);
  try {
    const existingToken = await User.findOne({ verificationToken: token });
    if (!existingToken) {
      return next(
        new HttpException(
          HTTP_RESPONSE_CODE.BAD_REQUEST,
          APP_ERROR_MESSAGE.tokenInvalid
        )
      );
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

export async function loginUser(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    console.table([email, password]);
    return next(
      new HttpException(
        HTTP_RESPONSE_CODE.BAD_REQUEST,
        APP_ERROR_MESSAGE.notProvideAllCredentials
      )
    );
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(
        new HttpException(
          HTTP_RESPONSE_CODE.BAD_REQUEST,
          APP_ERROR_MESSAGE.invalidCredentials
        )
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(
        new HttpException(
          HTTP_RESPONSE_CODE.BAD_REQUEST,
          APP_ERROR_MESSAGE.invalidCredentials
        )
      );
    }
    return res.status(200).json({
      message: "User login in successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error user not found", error);
    return next(
      new HttpException(
        HTTP_RESPONSE_CODE.SERVER_ERROR,
        APP_ERROR_MESSAGE.serverError
      )
    );
  }
}
