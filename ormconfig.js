const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(process.cwd(), ".env") });

const env = process.env;
const migrationsDir = "src/database/migrations";

module.exports = {
  type: "mysql",
  host: env["DB_HOST"],
  port: parseInt(env["DB_PORT"], 10),
  username: env["DB_USERNAME"],
  password: env["DB_PASSWORD"],
  database: env["DB_NAME"],
  entities: [path.join(process.cwd(), "src", "**/*.entity.ts")],
  migrations: [path.join(process.cwd(), migrationsDir, "**/*.ts")],
  logger: "advanced-console",
  logging: ["warn", "error"],
  cli: {
    migrationsDir: path.join(process.cwd(), migrationsDir),
  },
};
