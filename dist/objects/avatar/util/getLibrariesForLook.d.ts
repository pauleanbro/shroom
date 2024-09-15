import { IFigureData } from "../data/interfaces/IFigureData";
import { IFigureMapData } from "../data/interfaces/IFigureMapData";
import { ParsedLook } from "./parseLookString";
export declare function getLibrariesForLook(look: ParsedLook, { figureMap, figureData, }: {
    figureMap: IFigureMapData;
    figureData: IFigureData;
}): Set<string>;
