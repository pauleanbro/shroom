import { Canvas } from "canvas";
declare const defaultOptions: {
    tolerance: number;
};
export declare const detectEdges: (canvas: Canvas, options?: typeof defaultOptions) => {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
export {};
