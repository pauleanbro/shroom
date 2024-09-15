"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseTileMapString_1 = require("../parseTileMapString");
const getColumnWalls_1 = require("./getColumnWalls");
test("parses single wall", () => {
    const tilemap = (0, parseTileMapString_1.parseTileMapString)(`
        xxx
        x00
        x00
    `);
    expect((0, getColumnWalls_1.getColumnWalls)(tilemap)).toEqual([
        {
            startX: 1,
            endX: 2,
            y: 0,
            height: 0,
        },
    ]);
});
