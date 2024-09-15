"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadImageFromBlob = void 0;
async function loadImageFromBlob(blob) {
    const reader = new FileReader();
    const url = await new Promise((resolve) => {
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            resolve(reader.result);
        };
    });
    return url;
}
exports.loadImageFromBlob = loadImageFromBlob;
