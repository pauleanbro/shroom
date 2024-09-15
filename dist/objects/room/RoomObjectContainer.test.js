"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomObject_1 = require("../RoomObject");
const RoomObjectContainer_1 = require("./RoomObjectContainer");
test("adds & removes room objects", () => {
    class TestObject extends RoomObject_1.RoomObject {
        destroyed() {
            // Do nothing
        }
        registered() {
            // Do nothing
        }
    }
    const roomObjectContainer = new RoomObjectContainer_1.RoomObjectContainer();
    roomObjectContainer.context = {
        roomObjectContainer: roomObjectContainer,
    };
    const object = new TestObject();
    roomObjectContainer.addRoomObject(object);
    expect(roomObjectContainer.roomObjects.has(object)).toBe(true);
    roomObjectContainer.removeRoomObject(object);
    expect(roomObjectContainer.roomObjects.has(object)).toBe(false);
});
test("destroy on RoomObject removes room object from RoomObjectContainer", () => {
    class TestObject extends RoomObject_1.RoomObject {
        destroyed() {
            // Do nothing
        }
        registered() {
            // Do nothing
        }
    }
    const roomObjectContainer = new RoomObjectContainer_1.RoomObjectContainer();
    roomObjectContainer.context = {
        roomObjectContainer: roomObjectContainer,
    };
    const object = new TestObject();
    roomObjectContainer.addRoomObject(object);
    expect(roomObjectContainer.roomObjects.has(object)).toBe(true);
    object.destroy();
    expect(roomObjectContainer.roomObjects.has(object)).toBe(false);
});
