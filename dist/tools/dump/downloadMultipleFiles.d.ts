import { DownloadFileResult, DownloadRequest } from "./downloadFile";
import { Logger } from "./Logger";
export declare function downloadMultipleFiles<T>({ data, name, concurrency, logger, }: {
    data: T[];
    concurrency: number;
    logger: Logger;
    name: string;
}, map: (data: T, view: IView) => Promise<void>): Promise<void>;
interface IView {
    reportSuccess(value: string): void;
    reportError(value: string, request: DownloadRequest, response: DownloadFileResult): void;
}
export {};
