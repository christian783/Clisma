const Emission = require("../models/emissionSchema.js");
const Vehicle = require("../models/vehicleSchema.js");
const WeeklyReport = require("../models/weeklyReportSchema.js");

const generateWeeklyReports = async () => {
    try {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        const vehicles = await Vehicle.find({ lastSeen: { $lte: oneWeekAgo } });

        for (let vehicle of vehicles) {
            const emissions = await Emission.find({ plateNumber: vehicle.plateNumber });

            if (emissions.length > 0) {
                // Calculate average emissions
                const avg_NO_level = emissions.reduce((sum, e) => sum + e.NO_level, 0) / emissions.length;
                const avg_CO2_level = emissions.reduce((sum, e) => sum + e.CO2_level, 0) / emissions.length;

                // Save the weekly report
                const report = new WeeklyReport({
                    plateNumber: vehicle.plateNumber,
                    avg_NO_level,
                    avg_CO2_level,
                    weekStart: oneWeekAgo,
                    weekEnd: new Date()
                });

                await report.save();
            }

            // Delete the old vehicle record
            await Vehicle.deleteOne({ plateNumber: vehicle.plateNumber });
        }

        console.log("✅ Weekly reports generated, old vehicles deleted.");
    } catch (error) {
        console.error("❌ Error generating weekly reports:", error);
    }
};

// Run every Sunday at midnight
const cron = require("node-cron")
cron.schedule("0 0 * * 0", generateWeeklyReports);

module.exports = { generateWeeklyReports}
