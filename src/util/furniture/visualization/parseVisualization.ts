import { AnimationData, FramesData, parseAnimations } from "./parseAnimations";
import { parseColors } from "./parseColors";
import { parseDirections } from "./parseDirections";
import { Layer, parseLayers } from "./parseLayers";
import { VisualizationXml } from "./VisualizationXml";

export type Visualization = {
  layerCount: number;
  getColor: (colorId: string, layer: string) => string | undefined;
  getLayer: (layerId: string) => Layer | undefined;
  getAnimation: (
    animationId: string,
    layerId: string
  ) => FramesData | undefined;
  getFrameCount: (animationId: string) => number | undefined;
  getDirectionLayerOverride: (
    direction: number,
    layerId: string
  ) => Layer | undefined;
};

export function parseVisualization(xml: VisualizationXml): Visualization {
  const visualizations =
    xml["visualizationData"]["graphics"][0]["visualization"];

  for (let i = 0; i < visualizations.length; i++) {
    const visualization = visualizations[i];
    if (visualization["$"]["size"] == "64") {
      const layerMap = new Map<string, Layer>();
      const colorMap = new Map<string, Map<string, string>>();
      const animationMap = new Map<string, AnimationData>();

      const directionMap = new Map<number, Map<string, Layer>>();

      parseDirections(visualization, (direction, layerMap) =>
        directionMap.set(direction, layerMap)
      );
      parseAnimations(visualization, (id, data) => animationMap.set(id, data));

      parseColors(visualization, (id, colorLayersMap) =>
        colorMap.set(id, colorLayersMap)
      );
      parseLayers(visualization, (id, layer) => layerMap.set(id, layer));

      return {
        layerCount: Number(visualization["$"]["layerCount"]),
        getColor: (colorId, layer) => colorMap?.get(colorId)?.get(layer),
        getAnimation: (animationId, layerId) => {
          const frameInfo = animationMap
            .get(animationId)
            ?.layerToFrames?.get(layerId);

          return frameInfo;
        },
        getFrameCount: (animationId) =>
          animationMap.get(animationId)?.frameCount,
        getLayer: (layerId) => layerMap.get(layerId),
        getDirectionLayerOverride: (direction, layerId) =>
          directionMap.get(direction)?.get(layerId),
      };
    }
  }

  throw new Error("No visualization found");
}
