import * as PIXI from "pixi.js";
type PlanePoints = {
    a: {
        x: number;
        y: number;
    };
    b: {
        x: number;
        y: number;
    };
    c: {
        x: number;
        y: number;
    };
    d: {
        x: number;
        y: number;
    };
};
export declare function createPlaneMatrix(points: PlanePoints, { width, height, x, y, }: {
    width: number;
    height: number;
    x: number;
    y: number;
}): PIXI.Matrix;
export {};
