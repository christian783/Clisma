const mongoose = require("mongoose")

const emissionSchema = new mongoose.Schema({
    plateNumber: { type: String, required: true },
    NO_level: { type: Number, required: true },
    CO2_level: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Emission = mongoose.model("Emission",emissionSchema);

module.exports = Emission
