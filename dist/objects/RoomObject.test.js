"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomObject_1 = require("./RoomObject");
test("setParent calls registered", () => {
    let registered = false;
    class TestObject extends RoomObject_1.RoomObject {
        destroyed() {
            // Do nothing
        }
        registered() {
            registered = true;
        }
    }
    const obj = new TestObject();
    obj.setParent({});
    expect(registered).toBe(true);
});
test("setParent sets the context", () => {
    const context = { geometry: "geometry" };
    class TestObject extends RoomObject_1.RoomObject {
        destroyed() {
            // Do nothing
        }
        registered() {
            expect(this.geometry).toEqual("geometry");
        }
    }
    const obj = new TestObject();
    obj.setParent(context);
});
test("destroy calls destroyed", () => {
    const context = {
        geometry: "geometry",
        roomObjectContainer: {
            removeRoomObject: () => {
                // Do nothing
            },
        },
    };
    let destroyed = false;
    class TestObject extends RoomObject_1.RoomObject {
        destroyed() {
            destroyed = true;
        }
        registered() {
            // Do nothing
        }
    }
    const obj = new TestObject();
    obj.setParent(context);
    obj.destroy();
    expect(destroyed).toEqual(true);
});
test("destroy removes element from roomObjectContainer", () => {
    const removeRoomObject = jest.fn();
    const context = {
        geometry: "geometry",
        roomObjectContainer: { removeRoomObject },
    };
    class TestObject extends RoomObject_1.RoomObject {
        destroyed() {
            // Do nothing
        }
        registered() {
            // Do nothing
        }
    }
    const obj = new TestObject();
    obj.setParent(context);
    obj.destroy();
    expect(removeRoomObject).toBeCalledWith(obj);
});
test("multiple destroy calls ignores after one", () => {
    const removeRoomObject = jest.fn();
    const context = {
        geometry: "geometry",
        roomObjectContainer: { removeRoomObject },
    };
    class TestObject extends RoomObject_1.RoomObject {
        destroyed() {
            // Do nothing
        }
        registered() {
            // Do nothing
        }
    }
    const obj = new TestObject();
    obj.setParent(context);
    obj.destroy();
    obj.destroy();
    obj.destroy();
    expect(removeRoomObject).toBeCalledTimes(1);
    expect(removeRoomObject).toBeCalledWith(obj);
});
test("accessing context before setParent is called throws error", () => {
    class TestObject extends RoomObject_1.RoomObject {
        constructor() {
            super();
            this.geometry;
        }
        destroyed() {
            // Do nothing
        }
        registered() {
            // Do nothing
        }
    }
    expect(() => new TestObject()).toThrowError("Invalid context");
});
