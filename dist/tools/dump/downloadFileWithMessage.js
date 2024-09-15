"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDownloadMessage = exports.downloadFileWithMessage = void 0;
const downloadFile_1 = require("./downloadFile");
async function downloadFileWithMessage(request, logger) {
    const downloadedFile = await (0, downloadFile_1.downloadFile)(request);
    const message = getDownloadMessage(request, downloadedFile);
    switch (downloadedFile.type) {
        case "SUCCESS":
            logger.debug(message);
            break;
        case "FAILED_TO_WRITE":
            logger.error(message);
            break;
        case "HTTP_ERROR":
            logger.error(message);
            break;
    }
    return downloadedFile;
}
exports.downloadFileWithMessage = downloadFileWithMessage;
function getDownloadMessage(request, result) {
    switch (result.type) {
        case "SUCCESS":
            return `Downloaded - ${request.savePath}`;
        case "HTTP_ERROR":
            return `Error: Failed to download file. Status Code: ${result.code} - ${request.url}`;
        case "FAILED_TO_WRITE":
            return `Error: Failed to write - ${request.savePath}`;
        case "RETRY_FAILED":
            return `Error: Failed to download file after retrying. - ${request.url}`;
    }
}
exports.getDownloadMessage = getDownloadMessage;
