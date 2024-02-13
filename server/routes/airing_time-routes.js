// // routes/airingTimeRoutes.js
// const express = require('express');
// const { addAiringTime } = require('../controllers/airing_time-controllers');

// const airingTimeRouter = express.Router();

// airingTimeRouter.post('/addAiringTime', addAiringTime);

// module.exports = airingTimeRouter;


// routes/airingTimeRoutes.js
const express = require('express');
const { addAiringTimes } = require('../controllers/airing_time-controllers');

const airingTimeRouter = express.Router();

airingTimeRouter.post('/addAiringTimes', addAiringTimes);

module.exports = airingTimeRouter;


