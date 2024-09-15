"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExternalVariableUrls = void 0;
const parseExternalVariables_1 = require("./parseExternalVariables");
const node_fetch_1 = __importDefault(require("node-fetch"));
async function getExternalVariableUrls(externalVariablesUrl) {
    const externalVariablesString = await (0, node_fetch_1.default)(externalVariablesUrl).then((res) => res.text());
    const parsed = await (0, parseExternalVariables_1.parseExternalVariables)(externalVariablesString);
    const figureMapUrl = parsed.get("flash.dynamic.avatar.download.configuration");
    const figureDataUrl = parsed.get("external.figurepartlist.txt");
    const hofFurniUrl = parsed.get("dynamic.download.url");
    const furniDataUrl = parsed.get("furnidata.load.url");
    if (figureMapUrl == null)
        throw new Error("Invalid figure map url");
    if (hofFurniUrl == null)
        throw new Error("Invalid hof_furni url");
    if (figureDataUrl == null)
        throw new Error("Invalid figure data url");
    if (furniDataUrl == null)
        throw new Error("Invalid furni data url");
    const gordonUrl = figureMapUrl.split("/").slice(0, -1).join("/");
    const effectMapUrl = `${gordonUrl}/effectmap.xml`;
    return {
        figureMapUrl,
        hofFurniUrl,
        figureDataUrl,
        furniDataUrl,
        gordonUrl,
        effectMapUrl,
    };
}
exports.getExternalVariableUrls = getExternalVariableUrls;
