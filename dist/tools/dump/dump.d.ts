import g from "glob";
export declare const glob: typeof g.__promisify__;
export declare function dump({ externalVariables, downloadPath }: Options): Promise<void>;
interface Options {
    externalVariables?: string;
    downloadPath: string;
}
export {};
