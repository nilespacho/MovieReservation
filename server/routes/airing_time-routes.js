// // routes/airingTimeRoutes.js
// const express = require('express');
// const { addAiringTime } = require('../controllers/airing_time-controllers');

// const airingTimeRouter = express.Router();

// airingTimeRouter.post('/addAiringTime', addAiringTime);

// module.exports = airingTimeRouter;


// routes/airingTimeRoutes.js
const express = require('express');
const { addAiringTimes, getAiringTimes } = require('../controllers/airing_time-controllers');

const airingTimeRouter = express.Router();

// Use POST to add AiringTimes
airingTimeRouter.post('/addAiringTimes', addAiringTimes);

// Use GET to retrieve AiringTimes
airingTimeRouter.get('/', getAiringTimes);

module.exports = airingTimeRouter;


