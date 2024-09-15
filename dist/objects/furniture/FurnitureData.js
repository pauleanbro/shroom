"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureData = void 0;
const xml2js_1 = require("xml2js");
const furnitureDataTransformers_1 = require("../../util/furnitureDataTransformers");
class FurnitureData {
    constructor(_getFurniData) {
        this._getFurniData = _getFurniData;
        this._data = this._prepareData();
    }
    static create(resourcePath = "") {
        return new FurnitureData(async () => fetch(`${resourcePath}/furnidata.xml`).then((response) => response.text()));
    }
    async getRevisionForType(type) {
        const info = await this.getInfo(type);
        return info === null || info === void 0 ? void 0 : info.revision;
    }
    async getInfo(type) {
        const data = await this._data;
        return data.typeToInfo[type];
    }
    async getTypeById(id, placementType) {
        const data = await this._data;
        const type = placementType != "floor" ? data.floorIdToType[id] : data.wallIdToType[id];
        if (type == null)
            return;
        return type;
    }
    async getInfoForFurniture(furniture) {
        if (furniture.id != null) {
            const type = await this.getTypeById(furniture.id, furniture.placementType);
            if (type != null) {
                return this.getInfo(type);
            }
        }
        if (furniture.type != null) {
            return this.getInfo(furniture.type);
        }
    }
    async getInfos() {
        const data = await this._data;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return Object.entries(data.typeToInfo).map(([key, info]) => [key, info]);
    }
    async _prepareData() {
        const furniDataString = await this._getFurniData();
        const parsed = await (0, xml2js_1.parseStringPromise)(furniDataString);
        const typeToInfo = {};
        const floorIdToType = {};
        const wallIdToType = {};
        const register = (data, furnitureType) => {
            data.forEach((element) => {
                const type = element.$.classname;
                const id = element.$.id;
                typeToInfo[type] = (0, furnitureDataTransformers_1.formatFurnitureData)(element);
                if (furnitureType === "floor") {
                    if (floorIdToType[id] != null)
                        throw new Error(`Floor furniture with id ${id} already exists`);
                    floorIdToType[id] = type;
                }
                else if (furnitureType === "wall") {
                    if (wallIdToType[id] != null)
                        throw new Error(`Wall furniture with id ${id} already exists`);
                    wallIdToType[id] = type;
                }
            });
        };
        register(parsed.furnidata.roomitemtypes[0].furnitype, "wall");
        register(parsed.furnidata.wallitemtypes[0].furnitype, "floor");
        return { typeToInfo, floorIdToType, wallIdToType };
    }
}
exports.FurnitureData = FurnitureData;
