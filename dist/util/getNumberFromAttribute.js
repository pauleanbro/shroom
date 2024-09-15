"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberFromAttribute = void 0;
function getNumberFromAttribute(value) {
    if (value == null)
        return;
    const numberValue = Number(value);
    if (isNaN(numberValue))
        return;
    return numberValue;
}
exports.getNumberFromAttribute = getNumberFromAttribute;
