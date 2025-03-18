const mongoose = require("mongoose")

const weeklyReportSchema = new mongoose.Schema({
    plateNumber: { type: String, required: true },
    avg_NO_level: { type: Number, required: true },
    avg_CO2_level: { type: Number, required: true },
    weekStart: { type: Date, required: true },
    weekEnd: { type: Date, required: true }
});

module.exports = mongoose.model("WeeklyReport", weeklyReportSchema);
