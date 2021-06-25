const express = require("express");
const { StatusCodes } = require("http-status-codes");
const VideoModel = require("../models/video");

const router = express.Router();

router.get("/", async (req, res) => {
  const page = req.query.page || 0;
  const videos = await VideoModel.find(
    {},
    {},
    {
      skip: page * 10,
      limit: 10,
    }
  );

  res.status(StatusCodes.OK).json(videos);
});

module.exports = router;
