/** *******************************************************************
 * Absolute Imports
 ******************************************************************* */
import express from "express";
import helmet from "helmet";
import cors from "cors";
require("dotenv").config();

/** *******************************************************************
 * Controller Imports
 ******************************************************************* */
import schools from "./controllers/schools";

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
app.get("/schools", schools.getSchools);

// LISTENING
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Dr. Crane is listening on ${port}!`));
