"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseTileMapString_1 = require("../parseTileMapString");
const getRowWalls_1 = require("./getRowWalls");
test("parses single wall", () => {
    const tilemap = (0, parseTileMapString_1.parseTileMapString)(`
        xxx
        x00
        x00
    `);
    expect((0, getRowWalls_1.getRowWalls)(tilemap)).toEqual([
        {
            startY: 1,
            endY: 2,
            x: 0,
            height: 0,
        },
    ]);
});
test("parses cornered room", () => {
    const tilemap = (0, parseTileMapString_1.parseTileMapString)(`
          xxxxx
          xxx00
          xxx00
          x0000
          x0000
      `);
    expect((0, getRowWalls_1.getRowWalls)(tilemap)).toEqual([
        {
            startY: 3,
            endY: 4,
            x: 0,
            height: 0,
        },
        {
            startY: 1,
            endY: 2,
            x: 2,
            height: 0,
        },
    ]);
});
test("parses walls correctly with out of place tile", () => {
    const tilemap = (0, parseTileMapString_1.parseTileMapString)(`
            xxxxxx
            xxxx00
            xx0x00
            xxxx00
            x00000
            x00000 
        `);
    expect((0, getRowWalls_1.getRowWalls)(tilemap)).toEqual([
        {
            startY: 4,
            endY: 5,
            x: 0,
            height: 0,
        },
        {
            startY: 2,
            endY: 2,
            x: 1,
            height: 0,
        },
        {
            startY: 1,
            endY: 1,
            x: 3,
            height: 0,
        },
    ]);
});
test("parses walls correctly with out of place tile", () => {
    const tilemap = (0, parseTileMapString_1.parseTileMapString)(`
              xxxxxx
              xxxx00
              xx0x00
              xxxx00
              x00000
              x00000
          `);
    expect((0, getRowWalls_1.getRowWalls)(tilemap)).toEqual([
        {
            startY: 4,
            endY: 5,
            x: 0,
            height: 0,
        },
        {
            startY: 2,
            endY: 2,
            x: 1,
            height: 0,
        },
        {
            startY: 1,
            endY: 1,
            x: 3,
            height: 0,
        },
    ]);
});
