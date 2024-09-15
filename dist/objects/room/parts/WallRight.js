"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WallRight = void 0;
const WallLeft_1 = require("./WallLeft");
class WallRight extends WallLeft_1.WallLeft {
    constructor(props) {
        super(props);
    }
    _update() {
        this._offsets = { x: this._wallWidth, y: 0 };
        this.scale.x = -1;
        const left = this._wallLeftColor;
        this._wallLeftColor = this._wallRightColor;
        this._wallRightColor = left;
        super._update();
    }
}
exports.WallRight = WallRight;
