import { AvatarData } from "./AvatarData";
import { FigureDataPart, IFigureData } from "./interfaces/IFigureData";
export declare class FigureData extends AvatarData implements IFigureData {
    private _parts;
    private _paletteIdForSetType;
    private _colors;
    private _hiddenLayers;
    constructor(xml: string);
    static fromUrl(url: string): Promise<FigureData>;
    getColor(setType: string, colorId: string): string | undefined;
    getParts(setType: string, id: string): FigureDataPart[] | undefined;
    getHiddenLayers(setType: string, id: string): string[];
    private _cacheData;
}
