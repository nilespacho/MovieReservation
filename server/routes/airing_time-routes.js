const express = require("express");
const {
  addAiringTimes,
  getAiringTimes,
  getAiringTimeById,
} = require("../controllers/airing_time-controllers");
const airingTimeRouter = express.Router();
airingTimeRouter.post("/addAiringTimes", addAiringTimes);
airingTimeRouter.get("/", getAiringTimes);
airingTimeRouter.get("/:id", getAiringTimeById);
module.exports = airingTimeRouter;
