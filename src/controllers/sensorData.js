const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { Server } = require("socket.io");
const http = require("http");
const Vehicle = require("../models/vehicleSchema.js");
const Emission = require("../models/emissionSchema.js");
require('dotenv').config();

// Create an HTTP server
const server = http.createServer();
const io = new Server(server, {
    // This allows connections from all origins. You can change this based on your needs.
    cors: {
        origin: "*",  // You can limit this to your frontend URL
    }
});

const PORT = process.env.SOCKET_PORT || 6001;
server.listen(PORT, () => {
    console.log(`WebSocket Server running on port ${PORT}`);
});

// Generate random plate numbers
const generatePlateNumber = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    return (
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        letters.charAt(Math.floor(Math.random() * letters.length)) +
        numbers.charAt(Math.floor(Math.random() * numbers.length)) +
        numbers.charAt(Math.floor(Math.random() * numbers.length)) +
        numbers.charAt(Math.floor(Math.random() * numbers.length))
    );
};

// Generate random sensor data
const generateSensorData = () => ({
    NO_level: parseFloat((Math.random() * 100).toFixed(2)), // Random NO level (0-100)
    CO2_level: parseFloat((Math.random() * 150).toFixed(2)) // Random CO2 level (0-150)
});

// Simulate plate recognition (just returning the generated plate number)
const recognizePlate = async (imagePath) => path.basename(imagePath, ".jpg");

// Save sensor data
const saveSensorData = async (plateNumber, sensorData) => {
    try {
        if (!plateNumber) throw new Error("Plate number is missing.");

        const { NO_level, CO2_level } = sensorData;

        // Check if vehicle exists, otherwise create it
        let vehicle = await Vehicle.findOne({ plateNumber });
        if (!vehicle) {
            vehicle = new Vehicle({ plateNumber });
            await vehicle.save();
        } else {
            vehicle.lastSeen = new Date();
            await vehicle.save();
        }

        // Store emission data
        const newEmission = new Emission({ plateNumber, NO_level, CO2_level });
        await newEmission.save();

        console.log(`🚗 Emission data saved for ${plateNumber}:`, sensorData);

        // Emit real-time data via WebSocket
        io.emit("newEmissionData", { plateNumber, NO_level, CO2_level });
    } catch (error) {
        console.error("❌ Error saving sensor data:", error.message);
    }
};

// Simulate real-time sensor data flow
const simulateRealTimeData = async () => {
    try {
        const plateNumber = generatePlateNumber();
        const sensorData = generateSensorData();
        const imagePath = path.join(__dirname, "temp", `${plateNumber}.jpg`);

        console.log(`📡 Processing simulated data for plate: ${plateNumber}`);

        const recognizedPlate = await recognizePlate(imagePath);
        if (recognizedPlate) await saveSensorData(recognizedPlate, sensorData);
    } catch (error) {
        console.error("❌ Error simulating system:", error.message);
    }
};

// Run the simulation every 5 seconds for real-time effect
setInterval(simulateRealTimeData, 5000);
console.log("✅ Real-time simulation started. Generating sample test data every 5 seconds...");
