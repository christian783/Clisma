const mongoose = require("mongoose")

const vehicleSchema = new mongoose.Schema({
    plateNumber: { type: String, unique: true, required: true },
    lastSeen: { type: Date, default: Date.now }
});

// Delete cars after 7 days
vehicleSchema.index({ lastSeen: 1 }, { expireAfterSeconds: 604800 });

module.exports = mongoose.model("Vehicle", vehicleSchema);

