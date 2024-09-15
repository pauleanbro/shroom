"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatarDrawDefinition = exports.basePartSet = void 0;
const AvatarAction_1 = require("../enum/AvatarAction");
const AvatarFigurePartType_1 = require("../enum/AvatarFigurePartType");
const AvatarDrawDefinition_1 = require("../structure/AvatarDrawDefinition");
exports.basePartSet = new Set([
    AvatarFigurePartType_1.AvatarFigurePartType.LeftHand,
    AvatarFigurePartType_1.AvatarFigurePartType.RightHand,
    AvatarFigurePartType_1.AvatarFigurePartType.Body,
    AvatarFigurePartType_1.AvatarFigurePartType.Head,
]);
/**
 * Returns a definition of how the avatar should be drawn.
 * @param options Look options
 * @param deps External figure data, draw order and offsets
 */
function getAvatarDrawDefinition({ parsedLook, actions: initialActions, direction, headDirection, item: itemId, effect, }, deps) {
    const actions = new Set(initialActions).add(AvatarAction_1.AvatarAction.Default);
    const def = new AvatarDrawDefinition_1.AvatarDrawDefinition({
        actions,
        direction,
        frame: 0,
        look: parsedLook,
        item: itemId,
        headDirection,
        effect,
    }, deps);
    return def;
}
exports.getAvatarDrawDefinition = getAvatarDrawDefinition;
