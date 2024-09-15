import { Dependencies } from "./room/Room";
export declare class Shroom {
    readonly dependencies: Dependencies;
    constructor(dependencies: Dependencies);
    /**
     * Create a shroom instance
     */
    static create(options: {
        resourcePath?: string;
        application: PIXI.Application;
    } & Partial<Dependencies>): Shroom;
    /**
     * Create a shared shroom instance. This is useful if you have multiple
     * `PIXI.Application` which all share the same shroom dependencies.
     */
    static createShared({ resourcePath, configuration, animationTicker, avatarLoader, furnitureData, furnitureLoader, }: {
        resourcePath?: string;
    } & Partial<Dependencies>): {
        for: (application: PIXI.Application) => Shroom;
    };
}
