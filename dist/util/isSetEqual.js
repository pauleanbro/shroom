"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSetEqual = void 0;
function isSetEqual(as, bs) {
    if (as.size !== bs.size)
        return false;
    for (const a of as)
        if (!bs.has(a))
            return false;
    return true;
}
exports.isSetEqual = isSetEqual;
