"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAnimations = void 0;
function parseAnimations(visualization, set) {
    const animations = visualization.animations
        ? visualization.animations[0].animation
        : undefined;
    if (animations != null) {
        animations.forEach((animation) => {
            const animationId = animation["$"].id;
            const animationLayers = animation.animationLayer;
            const layerToFrames = new Map();
            let frameCount = 1;
            animationLayers.forEach((layer) => {
                const layerId = layer["$"].id;
                if (layer.frameSequence != null) {
                    const frameSequenceFrames = layer.frameSequence[0].frame;
                    const frames = frameSequenceFrames.map((frame) => frame["$"].id);
                    const frameRepeatString = layer["$"].frameRepeat;
                    layerToFrames.set(layerId, {
                        frames,
                        frameRepeat: frameRepeatString != null ? Number(frameRepeatString) : undefined,
                    });
                    if (frames.length > frameCount) {
                        frameCount = frames.length;
                    }
                }
            });
            set(animationId, {
                frameCount: frameCount,
                layerToFrames,
            });
        });
    }
}
exports.parseAnimations = parseAnimations;
