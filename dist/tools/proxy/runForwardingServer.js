"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runForwardingServer = void 0;
const ws_1 = __importDefault(require("ws"));
const net_1 = require("net");
const bytebuffer_1 = __importDefault(require("bytebuffer"));
const https_1 = require("https");
const fs_1 = require("fs");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const frame = require("frame-stream");
function runForwardingServer({ wsPort, targetPort, debug = false, prependLengthPrefix = false, targetHost, keyPath, certPath }) {
    var _a;
    let webSocketOptions;
    if (keyPath && certPath) {
        webSocketOptions = {
            server: (0, https_1.createServer)({
                key: (0, fs_1.readFileSync)(keyPath),
                cert: (0, fs_1.readFileSync)(certPath)
            })
        };
        (_a = webSocketOptions.server) === null || _a === void 0 ? void 0 : _a.listen(wsPort);
    }
    else {
        webSocketOptions = {
            port: wsPort
        };
    }
    const server = new ws_1.default.Server(webSocketOptions);
    const targetHostStr = targetHost == null ? `:${targetPort}` : `${targetHost}:${targetPort}`;
    console.log(`${webSocketOptions.server ? 'Secure' : ''} WebSocket Server started on port ${wsPort}. Forwarding traffic to ${targetHostStr}.`);
    let idCounter = 0;
    server.on("connection", (ws) => {
        const id = ++idCounter;
        if (debug)
            console.log(`[${id}] Forwarding WebSocket Client connection`);
        // When a websocket client connects, create a socket to the emulator server
        const connection = (0, net_1.createConnection)({ port: targetPort, host: targetHost });
        // Pipe to the frame-stream decoder to handle length prefixed messages
        connection.pipe(frame.decode()).on("data", (buffer) => {
            if (prependLengthPrefix) {
                const framedBuffer = buffer;
                const baseBuffer = new bytebuffer_1.default();
                baseBuffer.writeInt(framedBuffer.frameLength);
                baseBuffer.append(buffer);
                ws.send(baseBuffer.flip().toBuffer());
            }
            else {
                ws.send(buffer);
            }
            if (debug)
                console.log(`[${id}] Server => Client:`, buffer);
        });
        // Forward close event from server to websocket client
        connection.on("close", () => {
            ws.close();
            if (debug)
                console.log(`[${id}] Server closed the connection`);
        });
        // Forward messages sent by the websocket client to the emulator server
        ws.on("message", (message) => {
            const buffer = message;
            const data = new bytebuffer_1.default();
            // Write an int to the payload with the size of the buffer we are sending
            data.writeInt(buffer.length);
            data.append(buffer);
            const sendBuffer = data.flip().toBuffer();
            connection.write(sendBuffer);
            if (debug)
                console.log(`[${id}] Client => Server:`, sendBuffer);
        });
        // Forward close event to the emulator server
        ws.on("close", () => {
            connection.end();
            if (debug)
                console.log(`[${id}] WebSocket closed the connection`);
        });
    });
    return {
        close() {
            server.close();
        },
    };
}
exports.runForwardingServer = runForwardingServer;
