/* eslint-disable no-await-in-loop */
const cron = require("node-cron");

const VideoModel = require("../models/video");
const { fetchVideos } = require("../util/helper");
const logger = require("../util/logger");
const secrets = require("../util/secrets");

module.exports = () => {
  cron.schedule("* * * * *", async () => {
    try {
      let done = false;

      for (const apiKey of secrets.YOUTUBE_API_KEY.split(",")) {
        try {
          if (done) {
            break;
          }

          const videos = await fetchVideos(
            apiKey,
            secrets.YOUTUBE_SEARCH_QUERY
          );

          await VideoModel.create(videos);
          done = true;
        } catch (err) {
          logger.error("Error saving videos to DB", {
            error: err,
          });
        }
      }

      if (!done) {
        throw new Error("Quota exhausted for all keys");
      }
    } catch (err) {
      /* Handle the error */
      logger.error("Quota exhausted for all keys", {
        error: err,
      });
    }
  });
};
