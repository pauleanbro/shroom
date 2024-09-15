import { AvatarActionInfo } from "../data/interfaces/IAvatarActionsData";
export declare function getDrawOrderForActions(activeActions: AvatarActionInfo[], options: {
    hasItem: boolean;
}): "lh-up" | "rh-up" | "std";
