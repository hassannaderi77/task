import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import User from "./models/User.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import ImageHistory from "./models/ImageHistory.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =========================
// Upload directories
// =========================

const beforeUploadDir = path.join(
  __dirname,
  "uploads",
  "before"
);

const afterUploadDir = path.join(
  __dirname,
  "uploads",
  "after"
);

fs.mkdirSync(beforeUploadDir, { recursive: true });
fs.mkdirSync(afterUploadDir, { recursive: true });

// =========================
// Multer
// =========================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, beforeUploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const filename = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${extension}`;

    cb(null, filename);
  },
});

const upload = multer({
  storage,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// =========================
// Express
// =========================

const app = express();

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use(cors());

app.use(express.json());

const PORT = process.env.SERVER_PORT || 5000;

// =========================
// Test API
// =========================

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

// =====================================================
// HISTORY
// =====================================================

// =========================
// Create history
// =========================

app.post(
  "/api/history",
  upload.single("beforeImage"),
  async (req, res) => {
    try {
      const {
        userId,
        afterImage,
        firstSelect,
        secondSelect,
        device,
        request,
        brand,
        description,
      } = req.body;

      if (!userId || !req.file || !afterImage) {
        return res.status(400).json({
          message: "اطلاعات تاریخچه ناقص است",
        });
      }

      const beforeImageUrl = `/uploads/before/${req.file.filename}`;

      const history = await ImageHistory.create({
        userId,
        beforeImage: beforeImageUrl,
        afterImage,
        firstSelect,
        secondSelect,
        device,
        request,
        brand,
        description,
      });

      res.status(201).json(history);
    } catch (error) {
      console.error("Create history error:", error);

      res.status(500).json({
        message: "خطا در ذخیره تاریخچه",
      });
    }
  }
);

// =========================
// Request statistics - Today
// =========================

app.get("/api/history/stats/today", async (req, res) => {
  try {
    const startOfToday = new Date();

    startOfToday.setHours(
      0,
      0,
      0,
      0
    );

    const endOfToday = new Date();

    endOfToday.setHours(
      23,
      59,
      59,
      999
    );

    const stats = await ImageHistory.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfToday,
            $lte: endOfToday,
          },
        },
      },

      {
        $group: {
          _id: {
            hour: {
              $hour: "$createdAt",
            },
          },

          requests: {
            $sum: 1,
          },
        },
      },

      {
        $sort: {
          "_id.hour": 1,
        },
      },
    ]);

    const formattedStats = stats.map((item) => ({
      hour: `${String(item._id.hour).padStart(
        2,
        "0"
      )}:00`,

      requests: item.requests,
    }));

    res.status(200).json({
      success: true,
      stats: formattedStats,
    });
  } catch (error) {
    console.error(
      "Get request stats error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "خطا در دریافت آمار درخواست‌ها",
    });
  }
});

// =========================
// Get user history
// =========================

app.get("/api/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const history = await ImageHistory.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(history);
  } catch (error) {
    console.error(
      "Get history error:",
      error
    );

    res.status(500).json({
      message: "خطا در دریافت تاریخچه",
    });
  }
});

// =====================================================
// AUTH
// =====================================================

// =========================
// Login
// =========================

app.post("/api/auth/login", async (req, res) => {
  try {
    const {
      phone,
      password,
    } = req.body;

    if (!phone || !password) {
      return res.status(400).json({
        success: false,
        message:
          "شماره همراه و رمز عبور الزامی هستند",
      });
    }

    const user = await User.findOne({
      phone,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "کاربری با این شماره همراه پیدا نشد",
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
    console.error(
      "Login error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "خطا در ورود",
    });
  }
});

// =========================
// Register
// =========================

app.post(
  "/api/auth/register",
  async (req, res) => {
    try {
      const {
        name,
        family,
        phone,
        email,
        password,
      } = req.body;

      if (
        !name ||
        !family ||
        !phone ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          success: false,
          message:
            "همه فیلدها الزامی هستند",
        });
      }

      const existingUser =
        await User.findOne({
          $or: [
            { email },
            { phone },
          ],
        });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message:
            "کاربر با این ایمیل یا شماره همراه قبلاً ثبت شده است",
        });
      }

      const user =
        await User.create({
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
      console.error(
        "Register error:",
        error
      );

      res.status(500).json({
        success: false,
        message: "خطا در ثبت نام",
      });
    }
  }
);

// =====================================================
// USERS
// =====================================================

// =========================
// Create user
// =========================

app.post("/api/users", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      role,
    } = req.body;

    const user =
      await User.create({
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
    console.error(
      "Create user error:",
      error
    );

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// =========================
// Get all users
// =========================

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error(
      "Get users error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "خطا در دریافت کاربران",
    });
  }
});

// =====================================================
// DATABASE
// =====================================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection error:",
      error.message
    );
  });