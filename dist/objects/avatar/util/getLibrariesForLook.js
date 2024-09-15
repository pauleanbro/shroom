"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLibrariesForLook = void 0;
function getLibrariesForLook(look, { figureMap, figureData, }) {
    var _a;
    const libraries = new Set();
    const figureParts = Array.from(look).flatMap(([setType, { setId }]) => {
        var _a, _b;
        return ((_b = (_a = figureData
            .getParts(setType, setId.toString())) === null || _a === void 0 ? void 0 : _a.map((part) => ({ ...part, setId, setType }))) !== null && _b !== void 0 ? _b : []);
    });
    for (const part of figureParts) {
        let libraryId = figureMap.getLibraryOfPart(part.id, part.type);
        if (libraryId != null) {
            const checkParts = (_a = figureData.getParts(part.setType, part.setId.toString())) !== null && _a !== void 0 ? _a : [];
            for (const checkPart of checkParts) {
                libraryId = figureMap.getLibraryOfPart(checkPart.id, checkPart.type);
                if (libraryId != null)
                    break;
            }
        }
        if (libraryId != null) {
            libraries.add(libraryId);
        }
    }
    // Add base libraries
    libraries.add("hh_human_face");
    libraries.add("hh_human_item");
    libraries.add("hh_human_body");
    return libraries;
}
exports.getLibrariesForLook = getLibrariesForLook;
