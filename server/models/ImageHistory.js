import mongoose from "mongoose";

const imageHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    beforeImage: {
      type: String,
      required: true,
    },

    afterImage: {
      type: String,
      required: true,
    },

    firstSelect: {
      type: String,
      default: "",
    },

    secondSelect: {
      type: String,
      default: "",
    },

    device: {
      type: String,
      default: "",
    },

    request: {
      type: String,
      default: "",
    },

    brand: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },
    generatedPrompt: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

const ImageHistory = mongoose.model(
  "ImageHistory",
  imageHistorySchema
);

export default ImageHistory;