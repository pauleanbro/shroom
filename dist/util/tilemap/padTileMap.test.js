"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const padTileMap_1 = require("./padTileMap");
test("padTileMap offsets correcly", () => {
    expect((0, padTileMap_1.padTileMap)([["0"]])).toEqual({
        tilemap: [["x"], ["0"]],
        offsetX: 0,
        offsetY: 1,
    });
});
test("padTileMap offsets correcly", () => {
    expect((0, padTileMap_1.padTileMap)([
        ["0", "0"],
        ["0", "0"],
    ])).toEqual({
        tilemap: [
            ["x", "x", "x"],
            ["x", "0", "0"],
            ["x", "0", "0"],
        ],
        offsetX: 1,
        offsetY: 1,
    });
});
test("padTileMap offsets correcly", () => {
    expect((0, padTileMap_1.padTileMap)([
        ["0", "0"],
        ["0", "0"],
    ])).toEqual({
        tilemap: [
            ["x", "x", "x"],
            ["x", "0", "0"],
            ["x", "0", "0"],
        ],
        offsetX: 1,
        offsetY: 1,
    });
});
test("if already padded, don't to anything", () => {
    expect((0, padTileMap_1.padTileMap)([
        ["x", "x", "x"],
        ["x", "0", "0"],
        ["x", "0", "0"],
    ])).toEqual({
        tilemap: [
            ["x", "x", "x"],
            ["x", "0", "0"],
            ["x", "0", "0"],
        ],
        offsetX: 0,
        offsetY: 0,
    });
});
test("don't pad if theres a door", () => {
    expect((0, padTileMap_1.padTileMap)([
        ["x", "x", "x"],
        ["x", "0", "0"],
        ["0", "0", "0"],
        ["x", "0", "0"],
    ])).toEqual({
        tilemap: [
            ["x", "x", "x"],
            ["x", "0", "0"],
            ["0", "0", "0"],
            ["x", "0", "0"],
        ],
        offsetX: 0,
        offsetY: 0,
    });
});
test("pad if there is two tiles in door column", () => {
    expect((0, padTileMap_1.padTileMap)([
        ["x", "x", "x"],
        ["x", "0", "0"],
        ["0", "0", "0"],
        ["0", "0", "0"],
        ["x", "0", "0"],
    ])).toEqual({
        tilemap: [
            ["x", "x", "x", "x"],
            ["x", "x", "0", "0"],
            ["x", "0", "0", "0"],
            ["x", "0", "0", "0"],
            ["x", "x", "0", "0"],
        ],
        offsetX: 1,
        offsetY: 0,
    });
});
