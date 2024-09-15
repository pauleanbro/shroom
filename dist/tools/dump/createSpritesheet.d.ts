/// <reference types="node" />
export declare function createSpritesheet(paths: string[], options: {
    outputFormat?: "png" | "jpeg";
    margin?: number;
    crop?: boolean;
}): Promise<{
    json: {
        meta: {
            app: string;
            version: number;
            size: {
                w: any;
                h: any;
            };
            scale: number;
        };
        frames: any;
    };
    image: Buffer;
}>;
