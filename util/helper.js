const dayjs = require("dayjs");
const { google } = require("googleapis");
const logger = require("./logger");

const fetchVideos = async (apiKey, q) => {
  try {
    const service = google.youtube({
      version: "v3",
      auth: apiKey,
    });

    const publishedAfter = dayjs().subtract(1, "minute").toISOString();
    const {
      data: { items },
    } = await service.search.list({
      part: ["snippet"],
      maxResults: 50,
      order: "date",
      q,
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

    return videos;
  } catch (err) {
    logger.error("Error fetching videos", { error: err });
  }
};

module.exports = {
  fetchVideos,
};
