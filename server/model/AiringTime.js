const mongoose = require('mongoose');

const airingTimeSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
});

const AiringTime = mongoose.model('AiringTime', airingTimeSchema,'airingtimes');

module.exports = AiringTime;
