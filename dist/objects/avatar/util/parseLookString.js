"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLookString = void 0;
function parseLookString(look) {
    return new Map(look.split(".").map((str) => {
        const partData = str.split("-");
        return [
            partData[0],
            {
                setId: Number(partData[1]),
                colorId: Number(partData[2]),
            },
        ];
    }));
}
exports.parseLookString = parseLookString;
