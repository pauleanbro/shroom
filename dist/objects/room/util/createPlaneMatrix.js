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
exports.createPlaneMatrix = void 0;
const PIXI = __importStar(require("pixi.js"));
function createPlaneMatrix(points, { width, height, x, y, }) {
    let diffDxCx = points.d.x - points.c.x;
    let diffDyCy = points.d.y - points.c.y;
    let diffBxCx = points.b.x - points.c.x;
    let diffByCy = points.b.y - points.c.y;
    if (Math.abs(diffBxCx - width) <= 1) {
        diffBxCx = width;
    }
    if (Math.abs(diffByCy - width) <= 1) {
        diffByCy = width;
    }
    if (Math.abs(diffDxCx - height) <= 1) {
        diffDxCx = height;
    }
    if (Math.abs(diffDyCy - height) <= 1) {
        diffDyCy = height;
    }
    const a = diffBxCx / width;
    const b = diffByCy / width;
    const c = diffDxCx / height;
    const d = diffDyCy / height;
    const baseX = x + points.c.x;
    const baseY = y + points.c.y;
    const matrix = new PIXI.Matrix(a, b, c, d, baseX, baseY);
    return matrix;
}
exports.createPlaneMatrix = createPlaneMatrix;
