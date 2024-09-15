import { Layer } from "./parseLayers";
import { VisualizationXmlVisualization } from "./VisualizationXml";
export declare function parseDirections(visualization: VisualizationXmlVisualization, set: (direction: number, layerMap: Map<string, Layer>) => void): {
    validDirections: number[];
};
