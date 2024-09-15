"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIntFromHex = void 0;
function getIntFromHex(str) {
    return parseInt(str.replace(/^#/, ""), 16);
}
exports.getIntFromHex = getIntFromHex;
