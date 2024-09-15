import { AvatarFigurePartType } from "../enum/AvatarFigurePartType";
export declare const DIRECTION_IS_FLIPPED: boolean[];
export declare function getFlippedMetaData({ assetPartDefinition, direction, partType, flippedPartType, }: {
    assetPartDefinition: string;
    partType: AvatarFigurePartType;
    flippedPartType?: AvatarFigurePartType;
    direction: number;
}): {
    direction: number;
    flip: boolean;
    partType: AvatarFigurePartType;
    swapped: boolean;
} | {
    direction: number;
    flip: boolean;
    partType: AvatarFigurePartType.Body | AvatarFigurePartType.Shoes | AvatarFigurePartType.Legs | AvatarFigurePartType.Chest | AvatarFigurePartType.WaistAccessory | AvatarFigurePartType.ChestAccessory | AvatarFigurePartType.Head | AvatarFigurePartType.Hair | AvatarFigurePartType.FaceAccessory | AvatarFigurePartType.EyeAccessory | AvatarFigurePartType.HeadAccessory | AvatarFigurePartType.HeadAccessoryExtra | AvatarFigurePartType.CoatChest | AvatarFigurePartType.LeftHand | AvatarFigurePartType.LeftSleeve | AvatarFigurePartType.RightHand | AvatarFigurePartType.RightSleeve | AvatarFigurePartType.Face | AvatarFigurePartType.Eyes | AvatarFigurePartType.HairBig | AvatarFigurePartType.LeftCoatSleeve | AvatarFigurePartType.RightCoatSleeve;
    swapped?: undefined;
};
export declare function getBasicFlippedMetaData(direction: number): {
    direction: number;
    flip: boolean;
};
export declare function getPartFlippedMetaData(direction: number, { partType, flippedPartType, }: {
    partType?: AvatarFigurePartType;
    flippedPartType?: AvatarFigurePartType;
}): {
    direction: number;
    flip: boolean;
    partType: AvatarFigurePartType | undefined;
    swapped: boolean;
} | {
    direction: number;
    flip: boolean;
    partType: AvatarFigurePartType | undefined;
    swapped?: undefined;
};
