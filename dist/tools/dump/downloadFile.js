"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadFile = exports.fetchRetry = void 0;
const fs_1 = require("fs");
const node_fetch_1 = __importDefault(require("node-fetch"));
const path = __importStar(require("path"));
function makeAbsolute(url) {
    if (url.slice(0, 2) === "//") {
        return `http:${url}`;
    }
    return url;
}
async function fetchRetry(url) {
    let response;
    let count = 0;
    do {
        try {
            response = await (0, node_fetch_1.default)(url);
        }
        catch (e) {
            // Ignore network error
        }
        await new Promise((resolve) => setTimeout(resolve, count * 5000));
        count++;
    } while ((response == null || response.status >= 500) && count < 20);
    return response;
}
exports.fetchRetry = fetchRetry;
async function downloadFile({ url, savePath, }) {
    url = makeAbsolute(url);
    const response = await fetchRetry(url);
    if (response == null) {
        return {
            type: "RETRY_FAILED",
        };
    }
    if (response.status >= 200 && response.status < 300) {
        try {
            await fs_1.promises.mkdir(path.dirname(savePath), { recursive: true });
            const buffer = await response.buffer();
            await fs_1.promises.writeFile(savePath, buffer);
            return {
                type: "SUCCESS",
                text: async () => buffer.toString("utf-8"),
            };
        }
        catch (e) {
            return {
                type: "FAILED_TO_WRITE",
            };
        }
    }
    return {
        type: "HTTP_ERROR",
        code: response.status,
    };
}
exports.downloadFile = downloadFile;
