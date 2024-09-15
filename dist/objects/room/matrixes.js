"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRightMatrix = exports.getLeftMatrix = exports.getFloorMatrix = void 0;
const createPlaneMatrix_1 = require("./util/createPlaneMatrix");
function getFloorMatrix(x, y) {
    return (0, createPlaneMatrix_1.createPlaneMatrix)({
        c: { x: 0, y: 16 },
        d: { x: 32, y: 0 },
        a: { x: 64, y: 16 },
        b: { x: 32, y: 32 },
    }, { width: 32, height: 32, x, y });
}
exports.getFloorMatrix = getFloorMatrix;
function getLeftMatrix(x, y, dim) {
    return (0, createPlaneMatrix_1.createPlaneMatrix)({
        b: { x: 0, y: 16 },
        c: { x: dim.width, y: 16 + dim.width / 2 },
        d: { x: dim.width, y: 16 + dim.width / 2 + dim.height },
        a: { x: 0, y: 16 + dim.height },
    }, { width: dim.width, height: dim.height, x, y });
}
exports.getLeftMatrix = getLeftMatrix;
function getRightMatrix(x, y, dim) {
    return (0, createPlaneMatrix_1.createPlaneMatrix)({
        b: { x: 32, y: 32 },
        c: { x: 32 + dim.width, y: 32 - dim.width / 2 },
        d: { x: 32 + dim.width, y: 32 + dim.height - dim.width / 2 },
        a: { x: 32, y: 32 + dim.height },
    }, {
        width: dim.width,
        height: dim.height,
        x: x,
        y: y,
    });
}
exports.getRightMatrix = getRightMatrix;
