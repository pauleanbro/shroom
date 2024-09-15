import { IAvatarOffsetsData } from "../data/interfaces/IAvatarOffsetsData";
export declare function getEffectSprite(member: string, direction: number, frame: number, offsetsData: IAvatarOffsetsData, hasDirection: boolean, handleFlipped: boolean): {
    id: string;
    offsets: {
        offsetX: number;
        offsetY: number;
    } | undefined;
    flip: boolean;
};
