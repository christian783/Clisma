const Emission = require("../models/emissionSchema");

const getRealTimeEmissionData = async (req, res) => {
  try {
    const data = await Emission.find().sort({ timestamp: -1 }).limit(10); // Fetch latest 10 records
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports ={ getRealTimeEmissionData};
