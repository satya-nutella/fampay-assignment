const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: String,
    channelId: String,
    channelTitle: String,
    videoId: String,
    description: String,
    thumbnailUrls: [
      {
        type: String,
      },
    ],
    publishedOn: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Video", videoSchema);
