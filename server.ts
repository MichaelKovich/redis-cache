/** *******************************************************************
 * Absolute Imports
 ******************************************************************* */
import express from "express";
import redis, { ClientOpts } from "redis";
import helmet from "helmet";
import cors from "cors";
require("dotenv").config();

/** *******************************************************************
 * Controller Imports
 ******************************************************************* */
import schools from "./controllers/schools";

/** *******************************************************************
 * Redis Cache Configuration
 ******************************************************************* */
const redisConnectionString: any = process.env.REDIS_URL;

if (!redisConnectionString) {
  console.log("Please provide a Redis connection string.");
  process.exit(1);
}

const redisClient = redis.createClient(redisConnectionString);

/** *******************************************************************
 * Server
 ******************************************************************* */
// INSTANTIATION OF EXPRESS
const app = express();

// INSTANTIATION OF HELMET
app.use(helmet());

// TOP-LEVEL MIDDLEWARE
app.use(express.json());
app.use(cors());

// ENDPOINTS
app.get("/schools", (req, res) => schools.getSchools(req, res, redisClient));

// LISTENING
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Dr. Crane is listening on ${port}!`));
