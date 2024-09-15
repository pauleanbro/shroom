"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDirectionForFurniture_1 = require("./getDirectionForFurniture");
test("gets direction 1", () => {
    expect((0, getDirectionForFurniture_1.getDirectionForFurniture)(0, [0, 2, 4, 6])).toEqual(0);
});
test("gets direction 2", () => {
    expect((0, getDirectionForFurniture_1.getDirectionForFurniture)(4, [0, 2, 4, 6])).toEqual(4);
});
test("gets direction 3", () => {
    expect((0, getDirectionForFurniture_1.getDirectionForFurniture)(3, [0, 2, 4, 6])).toEqual(2);
});
test("gets direction 4", () => {
    expect((0, getDirectionForFurniture_1.getDirectionForFurniture)(4, [0, 2])).toEqual(2);
});
test("gets direction 5", () => {
    expect((0, getDirectionForFurniture_1.getDirectionForFurniture)(0, [2, 4])).toEqual(2);
});
