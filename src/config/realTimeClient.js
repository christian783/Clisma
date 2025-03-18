const io = require("socket.io-client");
const dotenv = require('dotenv');

dotenv.config();

const SOCKET_PORT = process.env.SOCKET_PORT || 6001;
const socket = io(`http://localhost:${SOCKET_PORT}`, {
    transports: ['polling', 'websocket'],  // Ensure this is configured properly for the WebSocket connection
});

socket.on("connect", () => {
    console.log("✅ Connected to real-time emission data stream");
});

socket.on("newEmissionData", (data) => {
    console.log("📡 New emission data received:", data);
});

socket.on("disconnect", () => {
    console.log("❌ Disconnected from server");
});
