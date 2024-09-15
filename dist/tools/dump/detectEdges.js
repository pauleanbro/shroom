"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectEdges = void 0;
const checkOpacityLevel = (tolerance) => (pixels) => {
    let transparent = true;
    for (let i = 3, l = pixels.length; i < l && transparent; i += 4) {
        transparent = transparent && pixels[i] === 255 * tolerance;
    }
    return transparent;
};
const defaultOptions = {
    tolerance: 0,
};
const detectEdges = (canvas, options) => {
    const { tolerance } = {
        ...defaultOptions,
        ...options,
    };
    const isTransparent = checkOpacityLevel(tolerance);
    const context = canvas.getContext("2d");
    const { width, height } = canvas;
    let pixels;
    let top = -1;
    do {
        ++top;
        pixels = context.getImageData(0, top, width, 1).data;
    } while (isTransparent(pixels));
    if (top === height) {
        throw new Error("Can't detect edges.");
    }
    // Left
    let left = -1;
    do {
        ++left;
        pixels = context.getImageData(left, top, 1, height - top).data;
    } while (isTransparent(pixels));
    // Bottom
    let bottom = -1;
    do {
        ++bottom;
        pixels = context.getImageData(left, height - bottom - 1, width - left, 1)
            .data;
    } while (isTransparent(pixels));
    // Right
    let right = -1;
    do {
        ++right;
        pixels = context.getImageData(width - right - 1, top, 1, height - (top + bottom)).data;
    } while (isTransparent(pixels));
    return {
        top,
        right,
        bottom,
        left,
    };
};
exports.detectEdges = detectEdges;
