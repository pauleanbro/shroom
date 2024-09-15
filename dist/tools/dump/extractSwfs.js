"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSwfs = void 0;
const bluebird_1 = __importDefault(require("bluebird"));
const path_1 = require("path");
const ProgressBar_1 = require("./ProgressBar");
const dumpSwf_1 = require("./dumpSwf");
async function extractSwfs(logger, name, swfs, onAfter) {
    const dumpFurnitureProgress = new ProgressBar_1.ProgressBar(logger, swfs.length, (current, count, extra) => {
        if (extra != null) {
            return `Extracting ${name}: ${current} / ${count} (${extra})`;
        }
        else {
            return `Extracting ${name}: ${current} / ${count}`;
        }
    });
    await bluebird_1.default.map(swfs, async (path) => {
        await (0, dumpSwf_1.dumpSwf)(path, onAfter);
        dumpFurnitureProgress.increment((0, path_1.basename)(path));
    }, {
        concurrency: 4,
    });
    dumpFurnitureProgress.done();
}
exports.extractSwfs = extractSwfs;
