require("dotenv-defaults").config();

const envs = new Set(["MONGODB_URI"]);

const required = new Set(["MONGODB_URI"]);

for (const e of envs) {
  const val = process.env[e];

  if (required.has(e) && !val) {
    console.log(`Missing required environtment variable: ${e}`);
    process.exit(1);
  }

  exports[e] = val;
}
