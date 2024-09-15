"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarData = void 0;
class AvatarData {
    constructor(xml) {
        this.document = new DOMParser().parseFromString(xml, "text/xml");
    }
    querySelectorAll(query) {
        return Array.from(this.document.querySelectorAll(query));
    }
    querySelector(query) {
        return this.document.querySelector(query);
    }
}
exports.AvatarData = AvatarData;
