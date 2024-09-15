import { VisualizationXmlVisualization } from "./VisualizationXml";
export type Layer = {
    zIndex: number | undefined;
    tag: string | undefined;
    ink: string | undefined;
    alpha: number | undefined;
    ignoreMouse: string | undefined;
};
export declare function parseLayers(visualization: VisualizationXmlVisualization, set: (id: string, layer: Layer) => void): void;
