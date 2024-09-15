"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallColors = exports.getTileColors = void 0;
function getTileColors(color) {
    const tileTint = fromHex(color);
    const borderLeftTint = fromHex(adjust(color, -20));
    const borderRightTint = fromHex(adjust(color, -40));
    return {
        tileTint,
        borderLeftTint,
        borderRightTint,
    };
}
exports.getTileColors = getTileColors;
function getWallColors(color) {
    const leftTint = fromHex(color);
    const topTint = fromHex(adjust(color, -103));
    const rightTint = fromHex(adjust(color, -52));
    return {
        topTint,
        leftTint,
        rightTint,
    };
}
exports.getWallColors = getWallColors;
function fromHex(color) {
    return parseInt(color.replace("#", "0x"), 16);
}
function adjust(color, amount) {
    return ("#" +
        color
            .replace(/^#/, "")
            .replace(/../g, (color) => ("0" +
            Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)));
}
