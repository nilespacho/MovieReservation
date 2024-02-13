// // controllers/airingTimeController.js
// const AiringTime = require('../model/AiringTime');

// const addAiringTime = async (req, res) => {
//     try {
//         // Extract data from the request body
//         const { startTime, endTime } = req.body;

//         // Create a new AiringTime instance
//         const airingTime = await AiringTime.create({ startTime, endTime });

//         // Send the response
//         res.json({ status: 'ok', airingTime });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ status: 'error', error: err.message });
//     }
// };

// module.exports = {
//     addAiringTime,
// };


// controllers/airingTimeController.js
const AiringTime = require('../model/AiringTime');

const addAiringTimes = async (req, res) => {
    try {
        // Extract airingTimes array from the request body
        const { airingTimes } = req.body;

        // Create an array to store the created AiringTime instances
        const createdAiringTimes = [];

        // Loop through each airing time in the array and create AiringTime instances
        for (const { startTime, endTime } of airingTimes) {
            const airingTime = await AiringTime.create({ startTime, endTime });
            createdAiringTimes.push(airingTime);
        }

        // Send the response with the created AiringTime instances
        res.json({ status: 'ok', airingTimes: createdAiringTimes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
};

const getAiringTimes = async (req, res) => {
    try {
        // Fetch all AiringTimes
        const airingTimes = await AiringTime.find();
        res.json({ status: 'ok', airingTimes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
};

const getAiringTimeById = async (req, res) => {
    try {
        // Extract the ID from the request parameters
        const { id } = req.params;

        // Find the AiringTime by ID
        const airingTime = await AiringTime.findById(id);

        // Check if the airingTime exists
        if (!airingTime) {
            return res.status(404).json({ status: 'error', message: 'AiringTime not found' });
        }

        // Send the response with the AiringTime
        res.json({ status: 'ok', airingTime });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: 'error', error: err.message });
    }
};

module.exports = {
    addAiringTimes,
    getAiringTimes,
    getAiringTimeById,
};
