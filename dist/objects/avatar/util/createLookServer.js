"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLookServer = void 0;
const getAvatarDrawDefinition_1 = require("./getAvatarDrawDefinition");
const parseLookString_1 = require("./parseLookString");
async function createLookServer(dependencies) {
    return ({ look, actions, direction, headDirection, item }, effect) => {
        return (0, getAvatarDrawDefinition_1.getAvatarDrawDefinition)({
            parsedLook: (0, parseLookString_1.parseLookString)(look),
            actions,
            direction,
            headDirection,
            frame: 0,
            item: item,
            effect: effect,
        }, dependencies);
    };
}
exports.createLookServer = createLookServer;
