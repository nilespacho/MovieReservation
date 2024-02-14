// // routes/airingTimeRoutes.js
// const express = require('express');
// const { addAiringTime } = require('../controllers/airing_time-controllers');

// const airingTimeRouter = express.Router();

// airingTimeRouter.post('/addAiringTime', addAiringTime);

// module.exports = airingTimeRouter;


// routes/airingTimeRoutes.js
const express = require('express');
const { addAiringTimes, getAiringTimes, getAiringTimeById } = require('../controllers/airing_time-controllers');

const airingTimeRouter = express.Router();

// Use POST to add AiringTimes
airingTimeRouter.post('/addAiringTimes', addAiringTimes);

// Use GET to retrieve AiringTimes
airingTimeRouter.get('/', getAiringTimes);

airingTimeRouter.get('/:id', getAiringTimeById);

module.exports = airingTimeRouter;


