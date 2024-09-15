"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightFilter = void 0;
const PIXI = __importStar(require("pixi.js"));
class HighlightFilter extends PIXI.Filter {
    constructor(_backgroundColor, _borderColor) {
        super(vertex, fragment);
        this._backgroundColor = _backgroundColor;
        this._borderColor = _borderColor;
        this.uniforms.backgroundColor = new Float32Array(4);
        this.uniforms.borderColor = new Float32Array(4);
        this.uniforms.backgroundColor = [
            ...PIXI.utils.hex2rgb(this._backgroundColor),
            1.0,
        ];
        this.uniforms.borderColor = [...PIXI.utils.hex2rgb(this._borderColor), 1.0];
    }
}
exports.HighlightFilter = HighlightFilter;
const vertex = `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    vTextureCoord = aTextureCoord;
}
`;
const fragment = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform vec4 backgroundColor;
uniform vec4 borderColor;

void main(void) {
    vec4 currentColor = texture2D(uSampler, vTextureCoord);

    if (currentColor.a > 0.0) {
        if (currentColor.r == 0.0 && currentColor.g == 0.0 && currentColor.b == 0.0) {
            gl_FragColor = borderColor;
        } else {
            gl_FragColor = backgroundColor;
        }
    }
}
`;
