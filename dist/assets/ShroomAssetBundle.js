"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShroomAssetBundle = void 0;
const bytebuffer_1 = __importDefault(require("bytebuffer"));
class ShroomAssetBundle {
    constructor(files = []) {
        this._files = new Map();
        this._blobs = new Map();
        this._strings = new Map();
        files.forEach((file) => this._files.set(file.fileName, file.buffer));
    }
    get files() {
        return Array.from(this._files.entries());
    }
    static async fromUrl(url) {
        const response = await fetch(url);
        if (response.status >= 400)
            throw new Error(`Failed to load: ${url} - ${response.status}`);
        const buffer = await response.arrayBuffer();
        return ShroomAssetBundle.fromBuffer(buffer);
    }
    static fromBuffer(buffer) {
        const byteBuffer = bytebuffer_1.default.wrap(buffer);
        const readFile = () => {
            const fileNameLength = byteBuffer.readUint16();
            const fileName = byteBuffer.readString(fileNameLength);
            const fileLength = byteBuffer.readUint32();
            const buffer = byteBuffer.readBytes(fileLength);
            return {
                fileName,
                buffer: buffer.toArrayBuffer(),
            };
        };
        const version = byteBuffer.readByte();
        const fileCount = byteBuffer.readUint16();
        const files = [];
        for (let i = 0; i < fileCount; i++) {
            const file = readFile();
            files.push(file);
        }
        return new ShroomAssetBundle(files);
    }
    addFile(fileName, buffer) {
        this._files.set(fileName, buffer);
    }
    toBuffer() {
        const byteBuffer = new bytebuffer_1.default();
        byteBuffer.writeByte(ShroomAssetBundle.VERSION);
        byteBuffer.writeUint16(this._files.size);
        this._files.forEach((buffer, key) => {
            byteBuffer.writeUint16(key.length);
            byteBuffer.writeString(key);
            byteBuffer.writeUint32(buffer.byteLength);
            byteBuffer.append(buffer);
        });
        return byteBuffer.flip().toBuffer();
    }
    async getBlob(name) {
        const current = this._blobs.get(name);
        if (current != null)
            return current;
        const buffer = this._files.get(name);
        if (buffer == null)
            throw new Error(`Couldn't find ${name}.`);
        const blob = new Blob([buffer]);
        this._blobs.set(name, blob);
        return blob;
    }
    async getString(name) {
        const current = this._strings.get(name);
        if (current != null)
            return current;
        const buffer = this._files.get(name);
        if (buffer == null)
            throw new Error(`Couldn't find ${name}.`);
        const encoder = new TextDecoder();
        const string = encoder.decode(buffer);
        this._strings.set(name, string);
        return string;
    }
}
exports.ShroomAssetBundle = ShroomAssetBundle;
ShroomAssetBundle.VERSION = 1;
