import { DownloadFileResult } from "./downloadFile";
import { Logger } from "./Logger";
export declare function downloadFurnitures({ downloadPath, hofFurniUrl, file, }: {
    downloadPath: string;
    hofFurniUrl: string;
    file: DownloadFileResult;
}, logger: Logger): Promise<void>;
