import { OnAfterCallback } from "./dumpSwf";
import { Logger } from "./Logger";
export declare function extractSwfs(logger: Logger, name: string, swfs: string[], onAfter: OnAfterCallback): Promise<void>;
