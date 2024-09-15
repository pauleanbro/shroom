import * as PIXI from "pixi.js";
export declare class HitTexture {
    private _texture;
    private _cachedHitmap;
    get texture(): PIXI.Texture;
    constructor(texture: PIXI.Texture);
    static fromSpriteSheet(spritesheet: PIXI.Spritesheet, name: string): Promise<HitTexture>;
    static fromBlob(blob: Blob): Promise<HitTexture>;
    static fromUrl(imageUrl: string): Promise<HitTexture>;
    getHitMap(): Uint32Array;
    hits(x: number, y: number, transform: {
        x: number;
        y: number;
    }, options?: {
        mirrorHorizonally?: boolean;
    }): boolean;
    private _getHitMap;
}
