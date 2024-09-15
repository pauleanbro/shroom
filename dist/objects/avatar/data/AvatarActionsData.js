"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvatarActionsData = void 0;
const actions_xml_1 = require("./static/actions.xml");
class AvatarActionsData {
    constructor(xml) {
        this._map = new Map();
        this._handItems = new Map();
        const document = new DOMParser().parseFromString(xml, "text/xml");
        document.querySelectorAll(`action`).forEach((action) => {
            const actionId = action.getAttribute("id");
            if (actionId == null)
                return;
            const info = getAvatarActionInfoFromElement(action);
            this._map.set(actionId, info);
            action.querySelectorAll(`param`).forEach((param) => {
                const paramId = param.getAttribute("id");
                if (paramId == null)
                    return;
                const value = Number(param === null || param === void 0 ? void 0 : param.getAttribute("value"));
                if (isNaN(value))
                    return;
                this._handItems.set(`${actionId}_${paramId}`, value);
            });
        });
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        const text = await response.text();
        return new AvatarActionsData(text);
    }
    static default() {
        return new AvatarActionsData(atob(actions_xml_1.actionsXml));
    }
    getHandItemId(actionId, id) {
        return this._handItems.get(`${actionId}_${id}`);
    }
    getActions() {
        return Array.from(this._map.values());
    }
    getAction(id) {
        return this._map.get(id);
    }
}
exports.AvatarActionsData = AvatarActionsData;
function getAvatarActionInfoFromElement(action) {
    var _a;
    const id = action.getAttribute("id");
    const state = action.getAttribute("state");
    const precedenceString = action.getAttribute("precedence");
    const geometrytype = action.getAttribute("geometrytype");
    const activepartset = action.getAttribute("activepartset");
    const assetpartdefinition = action.getAttribute("assetpartdefinition");
    const preventsString = action.getAttribute("prevents");
    const animation = action.getAttribute("animation");
    const main = action.getAttribute("main");
    const isdefault = action.getAttribute("isdefault");
    if (id == null)
        throw new Error("Invalid id");
    if (state == null)
        throw new Error("Invalid state");
    if (precedenceString == null)
        throw new Error("Invalid precedence");
    if (geometrytype == null)
        throw new Error("Invalid geometry type");
    if (assetpartdefinition == null)
        throw new Error("Invalid asset part definition");
    const prevents = (_a = preventsString === null || preventsString === void 0 ? void 0 : preventsString.split(",")) !== null && _a !== void 0 ? _a : [];
    const precedence = Number(precedenceString);
    if (isNaN(precedence))
        throw new Error("Invalid precedence");
    return {
        id,
        state,
        precedence,
        geometrytype,
        activepartset,
        assetpartdefinition,
        prevents,
        animation: animation === "1",
        main: main === "1",
        isdefault: isdefault === "1",
    };
}
