"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseLookString_1 = require("../parseLookString");
test("parseLookString parses plain look string", () => {
    const expected = new Map();
    expected.set("hd", { setId: 99999, colorId: 99999 });
    expect((0, parseLookString_1.parseLookString)("hd-99999-99999")).toEqual(expected);
});
test("parseLookString parses look string", () => {
    const expected = new Map();
    expected.set("hd", { setId: 180, colorId: 1 });
    expected.set("ch", { setId: 255, colorId: 66 });
    expected.set("lg", { setId: 280, colorId: 110 });
    expected.set("sh", { setId: 305, colorId: 62 });
    expected.set("ha", { setId: 1012, colorId: 110 });
    expected.set("hr", { setId: 828, colorId: 61 });
    expect((0, parseLookString_1.parseLookString)("hd-180-1.ch-255-66.lg-280-110.sh-305-62.ha-1012-110.hr-828-61")).toEqual(expected);
});
