"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosition = void 0;
function getPosition(roomX, roomY, roomZ, wallOffsets) {
    roomX = roomX + wallOffsets.x;
    roomY = roomY + wallOffsets.y;
    const base = 32;
    const xPos = roomX * base - roomY * base;
    const yPos = roomX * (base / 2) + roomY * (base / 2);
    return {
        x: xPos,
        y: yPos - roomZ * 32,
    };
}
exports.getPosition = getPosition;
