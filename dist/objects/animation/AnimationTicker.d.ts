import { IAnimationTicker } from "../../interfaces/IAnimationTicker";
export declare class AnimationTicker implements IAnimationTicker {
    private _frame;
    private _idCounter;
    private _subscriptions;
    constructor(application: PIXI.Application);
    static create(application: PIXI.Application): AnimationTicker;
    subscribe(cb: (frame: number, accurateFrame: number) => void): () => void;
    current(): number;
    private _getNormalizedFrame;
    private _increment;
}
