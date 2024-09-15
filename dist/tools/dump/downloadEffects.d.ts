import { DownloadFileResult } from "./downloadFile";
import { Logger } from "./Logger";
export declare function downloadEffects({ downloadPath, gordonUrl, effectMapDownload, }: {
    downloadPath: string;
    gordonUrl: string;
    effectMapDownload: DownloadFileResult;
}, logger: Logger): Promise<void>;
