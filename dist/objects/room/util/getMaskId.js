"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaskId = void 0;
function getMaskId(direction, roomX, roomY) {
    switch (direction) {
        case 2:
        case 6:
            return `x_${roomX}`;
        case 0:
        case 4:
            return `y_${roomY}`;
    }
}
exports.getMaskId = getMaskId;
