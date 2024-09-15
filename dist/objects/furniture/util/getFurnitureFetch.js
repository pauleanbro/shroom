"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFurnitureFetch = void 0;
function getFurnitureFetch(data, placementType) {
    if (data.id != null && data.type != null)
        throw new Error("Both `id` and `type` specified. Please supply only one of the two.");
    if (data.id != null) {
        return { kind: "id", id: data.id, placementType };
    }
    if (data.type != null) {
        return { kind: "type", type: data.type };
    }
    throw new Error("No `id` or `type` provided for the furniture.");
}
exports.getFurnitureFetch = getFurnitureFetch;
