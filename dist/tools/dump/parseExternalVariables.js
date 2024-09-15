"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseExternalVariables = void 0;
function parseExternalVariables(externalVars) {
    const lines = externalVars.split("\n");
    const map = new Map(lines.map(line => line.split("=")).map(item => [item[0], item[1]]));
    map.forEach((replaceValue, key) => {
        map.forEach((value, okey) => {
            if (value) {
                map.set(okey, value.replace("${" + key + "}", replaceValue));
            }
        });
    });
    return map;
}
exports.parseExternalVariables = parseExternalVariables;
