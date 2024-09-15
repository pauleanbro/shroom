import { IAvatarOffsetsData } from "./interfaces/IAvatarOffsetsData";
export declare class AvatarOffsetsData implements IAvatarOffsetsData {
    private _json;
    constructor(_json: any);
    static fromUrl(url: string): Promise<AvatarOffsetsData>;
    getOffsets(fileName: string): {
        offsetX: number;
        offsetY: number;
    } | undefined;
}
