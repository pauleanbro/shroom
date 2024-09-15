"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureRoomVisualization = void 0;
class FurnitureRoomVisualization {
    constructor(_container) {
        this._container = _container;
    }
    get container() {
        return this._container;
    }
    static fromContainer(container) {
        return new FurnitureRoomVisualization(container);
    }
    addMask() {
        return {
            remove: () => {
                // Do nothing
            },
            update: () => {
                // Do nothing
            },
            sprite: null,
        };
    }
}
exports.FurnitureRoomVisualization = FurnitureRoomVisualization;
