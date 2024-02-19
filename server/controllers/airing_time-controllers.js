const AiringTime = require("../model/AiringTime");

const addAiringTimes = async (req, res) => {
  try {
    const { airingTimes } = req.body;
    const createdAiringTimes = [];

    for (const { startTime, endTime } of airingTimes) {
      const airingTime = await AiringTime.create({ startTime, endTime });
      createdAiringTimes.push(airingTime);
    }

    res.json({ status: "ok", airingTimes: createdAiringTimes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
};

const getAiringTimes = async (req, res) => {
  try {
    const airingTimes = await AiringTime.find();
    res.json({ status: "ok", airingTimes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
};

const getAiringTimeById = async (req, res) => {
  try {
    const { id } = req.params;
    const airingTime = await AiringTime.findById(id);

    if (!airingTime) {
      return res
        .status(404)
        .json({ status: "error", message: "AiringTime not found" });
    }

    res.json({ status: "ok", airingTime });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", error: err.message });
  }
};

module.exports = {
  addAiringTimes,
  getAiringTimes,
  getAiringTimeById,
};
