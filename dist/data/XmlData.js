"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlData = void 0;
class XmlData {
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
exports.XmlData = XmlData;
