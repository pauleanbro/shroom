"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getZOrder = void 0;
function getZOrder(x, y, z) {
    return x * 1000 + y * 1000 + z;
}
exports.getZOrder = getZOrder;
