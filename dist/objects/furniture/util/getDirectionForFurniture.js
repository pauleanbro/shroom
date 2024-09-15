"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirectionForFurniture = void 0;
function getDirectionForFurniture(direction, validDirections) {
    if (validDirections.length < 1)
        return 0;
    let fallbackDirection = validDirections[0];
    for (let i = 0; i < validDirections.length; i++) {
        const validDirection = validDirections[i];
        if (validDirection === direction)
            return direction;
        if (validDirection > direction) {
            return fallbackDirection;
        }
        fallbackDirection = validDirection;
    }
    return fallbackDirection;
}
exports.getDirectionForFurniture = getDirectionForFurniture;
