import "./types";
export type OnAfterCallback = (baseName: string, dumpLocation: string, imagePaths: string[], xmlPaths: string[]) => Promise<void>;
export declare function dumpSwf(swfPath: string, onAfter: OnAfterCallback): Promise<void>;
