"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImageFromUrl = void 0;
async function loadImageFromUrl(imageUrl) {
    const image = new Image();
    image.src = imageUrl;
    await new Promise((resolve, reject) => {
        image.onload = () => {
            resolve({ width: image.width, height: image.height });
        };
        image.onerror = (value) => reject(value);
    });
    return image;
}
exports.loadImageFromUrl = loadImageFromUrl;
