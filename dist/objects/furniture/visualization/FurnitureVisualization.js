"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureVisualization = void 0;
class FurnitureVisualization {
    get view() {
        if (this._view == null)
            throw new Error("No view mounted");
        return this._view;
    }
    get previousView() {
        return this._previousView;
    }
    get mounted() {
        return this._view != null;
    }
    setView(view) {
        this._previousView = this._view;
        this._view = view;
    }
    isAnimated(animation = "0") {
        return false;
    }
}
exports.FurnitureVisualization = FurnitureVisualization;
