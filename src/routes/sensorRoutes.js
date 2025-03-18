const express = require("express")
const { generateWeeklyReports } = require("../controllers/getWeeklyReports.js");
const { getRealTimeEmissionData } = require("../controllers/sensorDataController.js")

const sensorRoutes = express.Router();

/**
 * @route   GET /api/sensors/weekly-reports
 * @desc    Generate and retrieve weekly emissions reports
 * @access  Admin Only (You can add auth middleware later)
 */
sensorRoutes.get("/weekly-reports" , generateWeeklyReports);
sensorRoutes.get("/realtime/data", getRealTimeEmissionData)

module.exports = sensorRoutes;
