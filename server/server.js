import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT || 5000;

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message: "شماره همراه و رمز عبور الزامی هستند",
      });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "کاربری با این شماره همراه پیدا نشد",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "رمز عبور اشتباه است",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        family: user.family,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "خطا در ورود",
    });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, family, phone, email, password } = req.body;

    if (!name || !family || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "همه فیلدها الزامی هستند",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "کاربر با این ایمیل یا شماره همراه قبلاً ثبت شده است",
      });
    }

    const user = await User.create({
      name,
      family,
      phone,
      email,
      password,
      role: "user",
    });

    res.status(201).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        family: user.family,
        phone: user.phone,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "خطا در ثبت نام",
    });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;

    const user = await User.create({
      name,
      phone,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });