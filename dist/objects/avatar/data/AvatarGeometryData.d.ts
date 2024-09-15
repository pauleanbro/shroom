import { AvatarGeometry, Bodypart, BodypartItem, IAvatarGeometryData } from "./interfaces/IAvatarGeometryData";
export declare class AvatarGeometryData implements IAvatarGeometryData {
    private _bodypartMap;
    private _avatarSetMap;
    private _geometries;
    private _bodyPartItemMap;
    constructor(string: string);
    static fromUrl(url: string): Promise<AvatarGeometryData>;
    static default(): AvatarGeometryData;
    getBodyPartItem(geometry: string, bodyPartId: string, itemId: string): BodypartItem | undefined;
    getBodyPart(geometry: string, bodyPartId: string): Bodypart | undefined;
    getBodyParts(avaterSet: string): string[];
    getGeometry(geometry: string): AvatarGeometry | undefined;
    private _getGeometryFromElement;
    private _getBodyPartFromElement;
    private _getBodyPartItemFromElement;
}
