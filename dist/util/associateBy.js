"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateBy = void 0;
function associateBy(arr, getKey) {
    const map = new Map();
    arr.forEach((value) => {
        const key = getKey(value);
        map.set(key, value);
    });
    return map;
}
exports.associateBy = associateBy;
