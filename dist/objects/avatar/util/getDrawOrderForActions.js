"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDrawOrderForActions = void 0;
function getDrawOrderForActions(activeActions, options) {
    const activePartSets = new Set();
    activeActions.forEach((info) => {
        if (info.activepartset != null) {
            activePartSets.add(info.activepartset);
        }
    });
    if (options.hasItem) {
        activePartSets.add("itemRight");
    }
    if (activePartSets.has("handLeft")) {
        return "lh-up";
    }
    if (activePartSets.has("handRightAndHead") ||
        activePartSets.has("handRight")) {
        return "rh-up";
    }
    return "std";
}
exports.getDrawOrderForActions = getDrawOrderForActions;
