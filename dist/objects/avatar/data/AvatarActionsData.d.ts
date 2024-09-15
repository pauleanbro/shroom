import { AvatarAction } from "../enum/AvatarAction";
import { IAvatarActionsData, AvatarActionInfo } from "./interfaces/IAvatarActionsData";
export declare class AvatarActionsData implements IAvatarActionsData {
    private _map;
    private _handItems;
    constructor(xml: string);
    static fromUrl(url: string): Promise<AvatarActionsData>;
    static default(): AvatarActionsData;
    getHandItemId(actionId: string, id: string): number | undefined;
    getActions(): AvatarActionInfo[];
    getAction(id: AvatarAction): AvatarActionInfo | undefined;
}
