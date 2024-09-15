"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.furnitureDataTransformers = exports.formatFurnitureData = exports.transformFirst = void 0;
function transformFirst(transform, defaultValue) {
    return (arr) => {
        const value = arr[0];
        if (value === "")
            return defaultValue;
        return transform(value);
    };
}
exports.transformFirst = transformFirst;
function booleanTransform(value) {
    return value === "1";
}
function numberTransform(value) {
    return Number(value);
}
function stringTransform(value) {
    return value;
}
function formatFurnitureData(data) {
    const keys = Object.keys(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj = {};
    keys.forEach((key) => {
        const castedKey = key;
        const transformer = exports.furnitureDataTransformers[castedKey];
        if (transformer != null) {
            const value = data[key];
            obj[castedKey] = transformer(value);
        }
    });
    return obj;
}
exports.formatFurnitureData = formatFurnitureData;
exports.furnitureDataTransformers = {
    adurl: transformFirst(stringTransform, undefined),
    bc: transformFirst(booleanTransform, false),
    buyout: transformFirst(booleanTransform, false),
    canlayon: transformFirst(booleanTransform, false),
    cansiton: transformFirst(booleanTransform, false),
    canstandon: transformFirst(booleanTransform, false),
    defaultdir: transformFirst(numberTransform, 0),
    description: transformFirst(stringTransform, undefined),
    environment: transformFirst(stringTransform, undefined),
    excludeddynamic: transformFirst(booleanTransform, false),
    furniline: transformFirst(stringTransform, undefined),
    name: transformFirst(stringTransform, undefined),
    offerid: transformFirst(numberTransform, undefined),
    rare: transformFirst(booleanTransform, false),
    rentbuyout: transformFirst(booleanTransform, false),
    rentofferid: transformFirst(numberTransform, undefined),
    revision: transformFirst(numberTransform, undefined),
    specialtype: transformFirst(numberTransform, undefined),
    xdim: transformFirst(numberTransform, undefined),
    ydim: transformFirst(numberTransform, undefined),
};
