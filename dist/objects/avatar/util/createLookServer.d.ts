import { AvatarAction } from "../enum/AvatarAction";
import { IAvatarEffectData } from "../data/interfaces/IAvatarEffectData";
import { AvatarDependencies } from "../types";
import { AvatarDrawDefinition } from "../structure/AvatarDrawDefinition";
export interface LookOptions {
    look: string;
    actions: Set<AvatarAction>;
    direction: number;
    headDirection?: number;
    item?: string | number;
    effect?: string;
    initial?: boolean;
    skipCaching?: boolean;
}
export interface LookServer {
    (options: LookOptions, effect?: IAvatarEffectData): AvatarDrawDefinition | undefined;
}
export declare function createLookServer(dependencies: AvatarDependencies): Promise<LookServer>;
