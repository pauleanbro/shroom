import { IAvatarOffsetsData } from "../data/interfaces/IAvatarOffsetsData";
export declare function getAssetFromPartMeta(assetPartDefinition: string, assetInfoFrame: {
    flipped: boolean;
    swapped: boolean;
    asset: string;
}, offsetsData: IAvatarOffsetsData, { offsetX, offsetY }: {
    offsetX: number;
    offsetY: number;
}): {
    fileId: string;
    library: string;
    mirror: boolean;
    x: number;
    y: number;
} | undefined;
export declare function applyOffsets({ offsets, customOffsets: { offsetX, offsetY }, flipped, lay, }: {
    flipped: boolean;
    offsets: {
        offsetX: number;
        offsetY: number;
    };
    customOffsets: {
        offsetX: number;
        offsetY: number;
    };
    lay: boolean;
}): {
    x: number;
    y: number;
};
