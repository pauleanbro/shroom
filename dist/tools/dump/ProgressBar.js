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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressBar = void 0;
const readline = __importStar(require("readline"));
class ProgressBar {
    constructor(_logger, _elementCount, _getString) {
        this._logger = _logger;
        this._elementCount = _elementCount;
        this._getString = _getString;
        this._count = 0;
        this._update();
    }
    info(...args) {
        process.stdout.write("\n");
        this._logger.info(...args);
    }
    debug(...args) {
        process.stdout.write("\n");
        this._logger.debug(...args);
    }
    error(...args) {
        process.stdout.write("\n");
        this._logger.error(...args);
    }
    log(...args) {
        process.stdout.write("\n");
        this._logger.log(...args);
    }
    increment(item) {
        this._currentItem = item;
        this._count++;
        this._update();
    }
    done() {
        this._currentItem = undefined;
        this._update();
        process.stdout.write("\n");
    }
    _update() {
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        const baseText = this._getString(this._count, this._elementCount, this._currentItem);
        process.stdout.write(baseText);
    }
}
exports.ProgressBar = ProgressBar;
