"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shroom = void 0;
const AnimationTicker_1 = require("./animation/AnimationTicker");
const AvatarLoader_1 = require("./avatar/AvatarLoader");
const FurnitureLoader_1 = require("./furniture/FurnitureLoader");
const FurnitureData_1 = require("./furniture/FurnitureData");
class Shroom {
    constructor(dependencies) {
        this.dependencies = dependencies;
    }
    /**
     * Create a shroom instance
     */
    static create(options) {
        return this.createShared(options).for(options.application);
    }
    /**
     * Create a shared shroom instance. This is useful if you have multiple
     * `PIXI.Application` which all share the same shroom dependencies.
     */
    static createShared({ resourcePath, configuration, animationTicker, avatarLoader, furnitureData, furnitureLoader, }) {
        const _furnitureData = furnitureData !== null && furnitureData !== void 0 ? furnitureData : FurnitureData_1.FurnitureData.create(resourcePath);
        const _avatarLoader = avatarLoader !== null && avatarLoader !== void 0 ? avatarLoader : AvatarLoader_1.AvatarLoader.createForAssetBundle(resourcePath);
        const _furnitureLoader = furnitureLoader !== null && furnitureLoader !== void 0 ? furnitureLoader : FurnitureLoader_1.FurnitureLoader.createForJson(_furnitureData, resourcePath);
        const _configuration = configuration !== null && configuration !== void 0 ? configuration : {};
        return {
            for: (application) => {
                const _animationTicker = animationTicker !== null && animationTicker !== void 0 ? animationTicker : AnimationTicker_1.AnimationTicker.create(application);
                const realDependencies = {
                    animationTicker: _animationTicker,
                    avatarLoader: _avatarLoader,
                    furnitureLoader: _furnitureLoader,
                    configuration: _configuration,
                    furnitureData: _furnitureData,
                    application,
                };
                return new Shroom(realDependencies);
            },
        };
    }
}
exports.Shroom = Shroom;
