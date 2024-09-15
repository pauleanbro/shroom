import { ExternalVariables } from "./getExternalVariableUrls";
import { Logger } from "./Logger";
export declare function downloadAllFiles(downloadPath: string, { figureDataUrl, figureMapUrl, furniDataUrl, hofFurniUrl, effectMapUrl, gordonUrl, }: ExternalVariables, logger: Logger): Promise<void>;
