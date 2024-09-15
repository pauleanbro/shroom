import { VisualizationXmlVisualization } from "./VisualizationXml";
export declare function parseAnimations(visualization: VisualizationXmlVisualization, set: (id: string, animation: AnimationData) => void): void;
export type FramesData = {
    frames: string[];
    frameRepeat?: number;
};
export type AnimationData = {
    frameCount: number;
    layerToFrames: Map<string, FramesData>;
};
