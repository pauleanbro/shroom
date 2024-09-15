import { AvatarData } from "./AvatarData";
import { IFigureMapData } from "./interfaces/IFigureMapData";
export declare class FigureMapData extends AvatarData implements IFigureMapData {
    private _libraryForPartMap;
    private _allLibraries;
    constructor(xml: string);
    static fromUrl(url: string): Promise<FigureMapData>;
    getLibraryOfPart(id: string, type: string): string | undefined;
    getLibraries(): string[];
    private _cacheData;
}
