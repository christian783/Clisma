const WebSocket = require("ws")

const initWebSocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on("connection", (ws) => {
        console.log("New client connected");
        ws.send(JSON.stringify({ message: "Connected to server" }));

        ws.on("close", () => {
            console.log("Client disconnected");
        });
    });

    const broadcast = (data) => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    };

    const sendEmissionDataToClients = (emissionData) => {
        broadcast(emissionData);
    };

    return { sendEmissionDataToClients };
};

module.exports = initWebSocket;