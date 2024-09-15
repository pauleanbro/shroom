import fetch from "node-fetch";
export declare function fetchRetry(url: string): Promise<fetch.Response | undefined>;
export declare function downloadFile({ url, savePath, }: DownloadRequest): Promise<DownloadFileResult>;
export type DownloadRequest = {
    url: string;
    savePath: string;
};
export type DownloadFileResult = {
    type: "SUCCESS";
    text: () => Promise<string>;
} | {
    type: "FAILED_TO_WRITE";
} | {
    type: "HTTP_ERROR";
    code: number;
} | {
    type: "RETRY_FAILED";
};
