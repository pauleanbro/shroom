import { AvatarAnimationFrame, IAvatarAnimationData } from "./interfaces/IAvatarAnimationData";
export declare class AvatarAnimationData implements IAvatarAnimationData {
    private _animationFrames;
    private _animationFramesCount;
    constructor(xml: string);
    static fromUrl(url: string): Promise<AvatarAnimationData>;
    static default(): AvatarAnimationData;
    getAnimationFrame(id: string, type: string, frame: number): AvatarAnimationFrame | undefined;
    getAnimationFrames(id: string, type: string): AvatarAnimationFrame[];
    getAnimationFramesCount(id: string): number;
    getAnimationOffset(id: string, geometryId: string, frame: number, direction: number): void;
    private _getAnimationOffsetFromElement;
    private _getAnimationFrameFromElement;
}
