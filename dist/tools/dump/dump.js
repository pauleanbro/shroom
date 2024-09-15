"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dump = exports.glob = void 0;
const getExternalVariableUrls_1 = require("./getExternalVariableUrls");
const downloadAllFiles_1 = require("./downloadAllFiles");
const util_1 = require("util");
const glob_1 = __importDefault(require("glob"));
const extractSwfs_1 = require("./extractSwfs");
const dumpFigure_1 = require("./dumpFigure");
const dumpFurniture_1 = require("./dumpFurniture");
exports.glob = (0, util_1.promisify)(glob_1.default);
const separator = "=========================================";
const logger = console;
async function dump({ externalVariables, downloadPath }) {
    console.log(separator);
    console.log("Shroom Asset Dumper");
    console.log(separator);
    let stepCounter = 0;
    const step = async (text, callback) => {
        stepCounter++;
        console.log(`${stepCounter}. Step: ${text}`);
        console.log();
        await callback();
        console.log(separator);
    };
    if (externalVariables != null) {
        const variables = await (0, getExternalVariableUrls_1.getExternalVariableUrls)(externalVariables);
        await step("Download from Server", async () => {
            console.log("Found following urls in the external variables:");
            console.log("- Figure Data:", variables.figureDataUrl);
            console.log("- Figure Map:", variables.figureMapUrl);
            console.log("- Furni Data", variables.furniDataUrl);
            console.log("- Furniture:", variables.hofFurniUrl);
            console.log("- Effect Map:", variables.effectMapUrl);
            console.log("");
            await (0, downloadAllFiles_1.downloadAllFiles)(downloadPath, variables, logger);
            console.log(`Successfully downloaded files into ${downloadPath}`);
        });
    }
    await step("Extract SWFs", async () => {
        const furnitureSwfs = await (0, exports.glob)(`${downloadPath}/hof_furni/**/*.swf`);
        console.log(`Found ${furnitureSwfs.length} furniture swfs. Starting the extraction process.`);
        await (0, extractSwfs_1.extractSwfs)(logger, "Furniture", furnitureSwfs, dumpFurniture_1.dumpFurniture);
        const figureSwfs = await (0, exports.glob)(`${downloadPath}/figure/**/*.swf`);
        console.log(`Found ${figureSwfs.length} figure swfs. Starting the extraction process.`);
        await (0, extractSwfs_1.extractSwfs)(logger, "Figure", figureSwfs, dumpFigure_1.dumpFigure);
        const effectsSwf = await (0, exports.glob)(`${downloadPath}/effects/**/*.swf`);
        console.log(`Found ${figureSwfs.length} effect swfs. Starting the extraction process.`);
        await (0, extractSwfs_1.extractSwfs)(logger, "Effects", effectsSwf, dumpFigure_1.dumpFigure);
    });
}
exports.dump = dump;
