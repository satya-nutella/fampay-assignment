const express = require("express");
const { StatusCodes } = require("http-status-codes");
const VideoModel = require("../models/video");

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("index", {
    title: "Youtube Feed",
  });
});

router.get("/videos", async (req, res) => {
  const page = req.query.page || 0;
  const sortBy = req.query.sortBy || "publishedAt";
  const { q } = req.query;

  let videos;
  let totalItems;

  if (q) {
    videos = await VideoModel.fuzzySearch({
      query: q,
    }).sort({ [sortBy]: 1 });
    totalItems = videos.length;
    videos = videos.splice(page * 10, 10);
  } else {
    totalItems = await VideoModel.countDocuments();
    videos = await VideoModel.find(
      {},
      {},
      {
        skip: page * 10,
        limit: 10,
      }
    ).sort({ [sortBy]: 1 });
  }

  const totalPages = Math.ceil(totalItems / 10);
  const hasPrev = page > 0;
  const hasNext = page < totalPages;

  res.status(StatusCodes.OK).json({
    videos,
    hasPrev,
    hasNext,
    totalItems,
    totalPages,
  });
});

module.exports = router;
