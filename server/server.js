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
import axios from "axios";
import cookieParser from "cookie-parser";
import { generateImagePrompt } from "./services/promptWriterService.js";

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

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

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

app.get("/", (req, res) => {
  res.json({
    message: "Backend is running",
  });
});


// =====================================================
// PROMPT WRITER
// =====================================================

app.post("/api/prompt-writer", async (req, res) => {
  try {
    const {
      firstSelect,
      secondSelect,
      device,
      request,
      brand,
      description,
    } = req.body;

    const prompt = await generateImagePrompt({
      firstSelect,
      secondSelect,
      device,
      request,
      brand,
      description,
    });

    res.status(200).json({
      success: true,
      prompt,
    });
  } catch (error) {
    console.error(
      "Prompt Writer Error:",
      error.response?.data || error
    );

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        error.message ||
        "Prompt writer failed",
    });
  }
});


// =====================================================
// PROMPT WRITER TEST
// =====================================================

app.post("/api/prompt-writer/test", async (req, res) => {
  try {
    const {
      firstSelect,
      secondSelect,
      device,
      request,
      brand,
      description,
    } = req.body;

    const generatedPrompt = await generateImagePrompt({
      firstSelect,
      secondSelect,
      device,
      request,
      brand,
      description,
    });

    res.status(200).json({
      success: true,
      prompt: generatedPrompt,
    });
  } catch (error) {
    console.error(
      "Prompt Writer Test Error:",
      error.response?.data || error
    );

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        error.message ||
        "Prompt writer failed",
    });
  }
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
        generatedPrompt,
      } = req.body;

      if (!userId || !req.file || !afterImage) {
        return res.status(400).json({
          message: "Ø§Ø·Ù„Ø§Ø¹Ø§Øª ØªØ§Ø±ÛŒØ®Ú†Ù‡ Ù†Ø§Ù‚Øµ Ø§Ø³Øª",
        });
      }

      // =========================
      // Save before image
      // =========================

      const beforeImageUrl = `/uploads/before/${req.file.filename}`;

      // =========================
      // Download after image
      // =========================

      console.log("Downloading after image...");

      const afterImageResponse = await axios.get(afterImage, {
        responseType: "arraybuffer",
        timeout: 120000,
      });

      const afterExtension =
        path.extname(new URL(afterImage).pathname) || ".png";

      const afterFilename = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${afterExtension}`;

      const afterImagePath = path.join(
        afterUploadDir,
        afterFilename
      );

      fs.writeFileSync(
        afterImagePath,
        afterImageResponse.data
      );

      const afterImageUrl = `/uploads/after/${afterFilename}`;

      console.log(
        "After image saved:",
        afterImageUrl
      );

      // =========================
      // Save history
      // =========================

      const history = await ImageHistory.create({
        userId,
        beforeImage: beforeImageUrl,
        afterImage: afterImageUrl,
        firstSelect,
        secondSelect,
        device,
        request,
        brand,
        description,
        generatedPrompt,
      });

      res.status(201).json({
        ...history.toObject(),
        afterImage: afterImageUrl,
      });
    } catch (error) {
      console.error(
        "Create history error:",
        error
      );

      res.status(500).json({
        message: "Ø®Ø·Ø§ Ø¯Ø± Ø°Ø®ÛŒØ±Ù‡ ØªØ§Ø±ÛŒØ®Ú†Ù‡",
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
      message: "Ø®Ø·Ø§ Ø¯Ø± Ø¯Ø±ÛŒØ§ÙØª Ø¢Ù…Ø§Ø± Ø¯Ø±Ø®ÙˆØ§Ø³Øªâ€ŒÙ‡Ø§",
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
      message: "Ø®Ø·Ø§ Ø¯Ø± Ø¯Ø±ÛŒØ§ÙØª ØªØ§Ø±ÛŒØ®Ú†Ù‡",
    });
  }
});

// =========================
// Delete user history item
// =========================

app.delete("/api/history/:historyId", async (req, res) => {
  try {
    const { historyId } = req.params;
    const { userId } = req.body;

    if (!historyId || !userId) {
      return res.status(400).json({
        success: false,
        message: "اطلاعات حذف ناقص است",
      });
    }

    const history = await ImageHistory.findOne({
      _id: historyId,
      userId,
    });

    if (!history) {
      return res.status(404).json({
        success: false,
        message: "مورد موردنظر پیدا نشد",
      });
    }

    // =========================
    // Delete before image
    // =========================

    if (history.beforeImage) {
      const beforePath = path.join(
        __dirname,
        history.beforeImage.replace(/^\/uploads\//, "uploads/")
      );

      if (fs.existsSync(beforePath)) {
        fs.unlinkSync(beforePath);
      }
    }

    // =========================
    // Delete after image
    // =========================

    if (history.afterImage) {
      const afterPath = path.join(
        __dirname,
        history.afterImage.replace(/^\/uploads\//, "uploads/")
      );

      if (fs.existsSync(afterPath)) {
        fs.unlinkSync(afterPath);
      }
    }

    // =========================
    // Delete history document
    // =========================

    await ImageHistory.deleteOne({
      _id: historyId,
      userId,
    });

    res.status(200).json({
      success: true,
      message: "History deleted successfully",
    });
  } catch (error) {
    console.error("Delete history error:", error);

    res.status(500).json({
      success: false,
      message: "خطا در حذف تاریخچه",
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
          "Ø´Ù…Ø§Ø±Ù‡ Ù‡Ù…Ø±Ø§Ù‡ Ùˆ Ø±Ù…Ø² Ø¹Ø¨ÙˆØ± Ø§Ù„Ø²Ø§Ù…ÛŒ Ù‡Ø³ØªÙ†Ø¯",
      });
    }

    const user = await User.findOne({
      phone,
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Ú©Ø§Ø±Ø¨Ø±ÛŒ Ø¨Ø§ Ø§ÛŒÙ† Ø´Ù…Ø§Ø±Ù‡ Ù‡Ù…Ø±Ø§Ù‡ Ù¾ÛŒØ¯Ø§ Ù†Ø´Ø¯",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Ø±Ù…Ø² Ø¹Ø¨ÙˆØ± Ø§Ø´ØªØ¨Ø§Ù‡ Ø§Ø³Øª",
      });
    }

    res.cookie("userId", user._id.toString(), {
  httpOnly: true,
  sameSite: "lax",
  secure: false,
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

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
      message: "Ø®Ø·Ø§ Ø¯Ø± ÙˆØ±ÙˆØ¯",
    });
  }
});

app.get("/api/auth/me", async (req, res) => {
  try {
    const userId = req.cookies.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "کاربر وارد نشده است",
      });
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "کاربر پیدا نشد",
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
    console.error("Get current user error:", error);

    res.status(500).json({
      success: false,
      message: "خطا در دریافت کاربر",
    });
  }
});


app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("userId", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.status(200).json({
    success: true,
    message: "با موفقیت خارج شدید",
  });
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
            "Ù‡Ù…Ù‡ ÙÛŒÙ„Ø¯Ù‡Ø§ Ø§Ù„Ø²Ø§Ù…ÛŒ Ù‡Ø³ØªÙ†Ø¯",
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
            "Ú©Ø§Ø±Ø¨Ø± Ø¨Ø§ Ø§ÛŒÙ† Ø§ÛŒÙ…ÛŒÙ„ ÛŒØ§ Ø´Ù…Ø§Ø±Ù‡ Ù‡Ù…Ø±Ø§Ù‡ Ù‚Ø¨Ù„Ø§Ù‹ Ø«Ø¨Øª Ø´Ø¯Ù‡ Ø§Ø³Øª",
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
        message: "Ø®Ø·Ø§ Ø¯Ø± Ø«Ø¨Øª Ù†Ø§Ù…",
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
        "Ø®Ø·Ø§ Ø¯Ø± Ø¯Ø±ÛŒØ§ÙØª Ú©Ø§Ø±Ø¨Ø±Ø§Ù†",
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