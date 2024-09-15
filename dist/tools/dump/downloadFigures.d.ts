import { DownloadFileResult } from "./downloadFile";
import { Logger } from "./Logger";
export declare function downloadFigures({ file, downloadPath, gordonUrl, }: {
    downloadPath: string;
    file: DownloadFileResult;
    gordonUrl: string;
}, logger: Logger): Promise<void>;
