import { ParsedLook } from "./parseLookString";
import { IAvatarEffectData } from "../data/interfaces/IAvatarEffectData";
import { AvatarFigurePartType } from "../enum/AvatarFigurePartType";
import { AvatarDrawDefinition } from "../structure/AvatarDrawDefinition";
import { AvatarDependencies } from "../types";
export declare const basePartSet: Set<AvatarFigurePartType>;
/**
 * Returns a definition of how the avatar should be drawn.
 * @param options Look options
 * @param deps External figure data, draw order and offsets
 */
export declare function getAvatarDrawDefinition({ parsedLook, actions: initialActions, direction, headDirection, item: itemId, effect, }: Options, deps: AvatarDependencies): AvatarDrawDefinition | undefined;
interface Options {
    parsedLook: ParsedLook;
    actions: Set<string>;
    direction: number;
    headDirection?: number;
    frame: number;
    item?: string | number;
    effect?: IAvatarEffectData;
}
export {};
