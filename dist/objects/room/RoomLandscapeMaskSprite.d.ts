import * as PIXI from "pixi.js";
/**
 * This class enables us to create a mask which
 * consists of multiple different sprites.
 *
 * This is important for correctly displaying
 * window furniture with landscapes.
 *
 * Windows usually provide a black mask image. This mask image is used
 * to only display the landscape in the area of the mask image.
 *
 * Since there can be multiple windows, and because of that multiple masks,
 * we need a sprite which is able to combine multiple sprites into a single
 * sprite.
 *
 * This Sprite renders its sub-sprites through `PIXI.RenderTexture`
 * into a single texture, and uses that as a texture for itself.
 */
export declare class RoomLandscapeMaskSprite extends PIXI.Sprite {
    private _sprites;
    private _roomWidth;
    private _roomHeight;
    private _renderer;
    private _roomBounds;
    constructor({ roomBounds, renderer, }: {
        roomBounds: {
            minX: number;
            minY: number;
            maxX: number;
            maxY: number;
        };
        renderer: PIXI.Renderer;
    });
    addSprite(element: PIXI.Sprite): void;
    updateSprite(element: PIXI.Sprite): void;
    removeSprite(element: PIXI.Sprite): void;
    private _updateTexture;
}
