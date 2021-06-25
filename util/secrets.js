require("dotenv-defaults").config();

const envs = new Set([
  "MONGODB_URI",
  "NODE_ENV",
  "PORT",
  "YOUTUBE_API_KEY",
  "YOUTUBE_SEARCH_QUERY",
]);

const required = new Set(["MONGODB_URI", "YOUTUBE_API_KEY"]);

for (const e of envs) {
  const val = process.env[e];

  if (required.has(e) && !val) {
    console.log(`Missing required environtment variable: ${e}`);
    process.exit(1);
  }

  exports[e] = val;
}
