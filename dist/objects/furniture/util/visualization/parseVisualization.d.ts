import { AnimationData, FramesData } from "./parseAnimations";
import { Layer } from "./parseLayers";
import { VisualizationXml } from "./VisualizationXml";
export type Visualization = {
    directions: number[];
    layerCount: number;
    getColor: (colorId: string, layer: string) => string | undefined;
    getLayer: (layerId: string) => Layer | undefined;
    getAnimation: (animationId: string, layerId: string) => FramesData | undefined;
    getFrameCount: (animationId: string) => number | undefined;
    getDirectionLayerOverride: (direction: number, layerId: string) => Layer | undefined;
    getAnimationDatas(): {
        id: string;
        data: AnimationData;
    }[];
};
export declare function parseVisualization(xml: VisualizationXml): Visualization;
