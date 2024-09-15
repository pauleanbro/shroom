"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadMultipleFiles = void 0;
const downloadFileWithMessage_1 = require("./downloadFileWithMessage");
const bluebird_1 = __importDefault(require("bluebird"));
const ProgressBar_1 = require("./ProgressBar");
async function downloadMultipleFiles({ data, name, concurrency, logger, }, map) {
    const downloadProgress = new ProgressBar_1.ProgressBar(logger, data.length, (current, count, extra) => {
        if (extra != null) {
            return `${name}: ${current} / ${count} downloaded (${extra})`;
        }
        else {
            return `${name}: ${current} / ${count} downloaded`;
        }
    });
    const reportSuccess = (lastLibrary) => {
        downloadProgress.increment(lastLibrary);
    };
    const reportError = (errorLibrary, request, result) => {
        downloadProgress.error(`${errorLibrary} - ${(0, downloadFileWithMessage_1.getDownloadMessage)(request, result)}`);
    };
    const reportDone = () => {
        downloadProgress.done();
    };
    await bluebird_1.default.map(data, async (data) => {
        await map(data, { reportError, reportSuccess });
    }, { concurrency: concurrency });
    reportDone();
}
exports.downloadMultipleFiles = downloadMultipleFiles;
