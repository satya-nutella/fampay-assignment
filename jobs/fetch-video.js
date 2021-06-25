const cron = require("node-cron");
const dayjs = require("dayjs");
const { google } = require("googleapis");
const VideoModel = require("../models/video");
const secrets = require("../util/secrets");

module.exports = () => {
  cron.schedule("*/5 * * * *", async () => {
    try {
      const service = google.youtube({
        version: "v3",
        auth: secrets.YOUTUBE_API_KEY,
      });

      const publishedAfter = dayjs().subtract(5, "minute").toISOString();
      const {
        data: { items },
      } = await service.search.list({
        part: ["snippet"],
        maxResults: 50,
        order: "date",
        q: secrets.YOUTUBE_SEARCH_QUERY,
        relevanceLanguage: "en",
        publishedAfter,
      });

      const videos = items.map((item) => ({
        title: item.snippet.title,
        description: item.snippet.description,
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        videoId: item.id.videoId,
        thumbnails: {
          default: item.snippet.thumbnails.default,
          medium: item.snippet.thumbnails.medium,
          high: item.snippet.thumbnails.high,
        },
        publishedAt: item.snippet.publishedAt,
      }));

      await VideoModel.create(videos);
    } catch (err) {
      /* Handle the error */
      console.log(err);
    }
  });
};
