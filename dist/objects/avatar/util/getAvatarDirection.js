"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarDirection = void 0;
function getAvatarDirection(direction) {
    if (direction < -8) {
        return 0;
    }
    if (direction > 15) {
        return 0;
    }
    if (direction < 0) {
        return direction + 8;
    }
    if (direction > 7) {
        return direction - 8;
    }
    return direction;
}
exports.getAvatarDirection = getAvatarDirection;
