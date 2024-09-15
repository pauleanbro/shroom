import { DownloadFileResult, DownloadRequest } from "./downloadFile";
import { Logger } from "./Logger";
export declare function downloadFileWithMessage(request: DownloadRequest, logger: Logger): Promise<DownloadFileResult>;
export declare function getDownloadMessage(request: DownloadRequest, result: DownloadFileResult): string;
