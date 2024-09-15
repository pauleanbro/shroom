"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const EventManager_1 = require("./EventManager");
const IEventGroup_1 = require("./interfaces/IEventGroup");
const interactionEvent = {
    data: {},
};
test("handles click when mounted", () => {
    const manager = new EventManager_1.EventManager();
    const target = {
        getEventZOrder: () => 10,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 0, y: 0, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const node = manager.register(target);
    manager.click(interactionEvent, 10, 10);
    expect(target.triggerClick).toHaveBeenCalledTimes(1);
    node.destroy();
    manager.click(interactionEvent, 10, 10);
    expect(target.triggerClick).toHaveBeenCalledTimes(1);
});
test("handles click on hit elements", () => {
    const manager = new EventManager_1.EventManager();
    const target = {
        getEventZOrder: () => 10,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 0, y: 0, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const node = manager.register(target);
    manager.click(interactionEvent, 10, 10);
    expect(target.triggerClick).toHaveBeenCalledTimes(1);
});
test("doesn't handle click on not hit elements", () => {
    const manager = new EventManager_1.EventManager();
    const target = {
        getEventZOrder: () => 10,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 0, y: 0, width: 100, height: 100 }),
        hits: () => false,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const node = manager.register(target);
    manager.click(interactionEvent, 10, 10);
    expect(target.triggerClick).toHaveBeenCalledTimes(0);
});
test("handles click on multiple elements", () => {
    const manager = new EventManager_1.EventManager();
    const target1 = {
        getEventZOrder: () => 2,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 0, y: 0, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target2 = {
        getEventZOrder: () => 5,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 50, y: 50, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target3 = {
        getEventZOrder: () => 10,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 75, y: 75, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target4 = {
        getEventZOrder: () => 10,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 79, y: 79, width: 100, height: 100 }),
        hits: () => false,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    manager.register(target1);
    manager.register(target2);
    manager.register(target3);
    manager.register(target4);
    manager.click(interactionEvent, 80, 80);
    expect(target1.triggerClick).toHaveBeenCalledTimes(1);
    expect(target2.triggerClick).toHaveBeenCalledTimes(1);
    expect(target3.triggerClick).toHaveBeenCalledTimes(1);
    expect(target4.triggerClick).toHaveBeenCalledTimes(0);
});
test("handles click on multiple elements", () => {
    const manager = new EventManager_1.EventManager();
    const target1 = {
        getEventZOrder: () => 2,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 0, y: 0, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target2 = {
        getEventZOrder: () => 5,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 50, y: 50, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    manager.register(target1);
    manager.register(target2);
    manager.click(interactionEvent, 80, 80);
    expect(target1.triggerClick).toHaveBeenCalledTimes(1);
    expect(target2.triggerClick).toHaveBeenCalledTimes(1);
});
test("only handles first element when elements from same group", () => {
    const manager = new EventManager_1.EventManager();
    const group = { getEventGroupIdentifier: () => IEventGroup_1.FURNITURE };
    const target1 = {
        getEventZOrder: () => 2,
        getGroup: () => group,
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 0, y: 0, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target2 = {
        getEventZOrder: () => 5,
        getGroup: () => group,
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 50, y: 50, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    manager.register(target1);
    manager.register(target2);
    manager.click(interactionEvent, 80, 80);
    expect(target1.triggerClick).toHaveBeenCalledTimes(0);
    expect(target2.triggerClick).toHaveBeenCalledTimes(1);
});
test("event.skip() skips elements", () => {
    const manager = new EventManager_1.EventManager();
    const target1 = {
        getEventZOrder: () => 2,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.AVATAR }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 0, y: 0, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target2 = {
        getEventZOrder: () => 5,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.AVATAR }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 50, y: 50, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn((event) => event.skip([IEventGroup_1.AVATAR])),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target3 = {
        getEventZOrder: () => 9,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 75, y: 75, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target4 = {
        getEventZOrder: () => 10,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 79, y: 79, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn((event) => event.skip([IEventGroup_1.FURNITURE])),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    manager.register(target1);
    manager.register(target2);
    manager.register(target3);
    manager.register(target4);
    manager.click(interactionEvent, 80, 80);
    expect(target1.triggerClick).toHaveBeenCalledTimes(0);
    expect(target2.triggerClick).toHaveBeenCalledTimes(1);
    expect(target3.triggerClick).toHaveBeenCalledTimes(0);
    expect(target4.triggerClick).toHaveBeenCalledTimes(1);
});
test("move triggers correct events", () => {
    const manager = new EventManager_1.EventManager();
    const target1 = {
        getEventZOrder: () => 2,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.AVATAR }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 0, y: 0, width: 100, height: 100 }),
        hits: (x) => x <= 100,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    manager.register(target1);
    manager.move(interactionEvent, 80, 80);
    expect(target1.triggerPointerOver).toHaveBeenCalledTimes(1);
    expect(target1.triggerPointerOut).toHaveBeenCalledTimes(0);
    manager.move(interactionEvent, 85, 80);
    expect(target1.triggerPointerOver).toHaveBeenCalledTimes(1);
    expect(target1.triggerPointerOut).toHaveBeenCalledTimes(0);
    manager.move(interactionEvent, 90, 80);
    expect(target1.triggerPointerOver).toHaveBeenCalledTimes(1);
    expect(target1.triggerPointerOut).toHaveBeenCalledTimes(0);
    manager.move(interactionEvent, 95, 80);
    expect(target1.triggerPointerOver).toHaveBeenCalledTimes(1);
    expect(target1.triggerPointerOut).toHaveBeenCalledTimes(0);
    manager.move(interactionEvent, 100, 80);
    expect(target1.triggerPointerOver).toHaveBeenCalledTimes(1);
    expect(target1.triggerPointerOut).toHaveBeenCalledTimes(0);
    manager.move(interactionEvent, 105, 80);
    expect(target1.triggerPointerOver).toHaveBeenCalledTimes(1);
    expect(target1.triggerPointerOut).toHaveBeenCalledTimes(1);
    manager.move(interactionEvent, 100, 80);
    expect(target1.triggerPointerOver).toHaveBeenCalledTimes(2);
    expect(target1.triggerPointerOut).toHaveBeenCalledTimes(1);
    manager.move(interactionEvent, 105, 80);
    expect(target1.triggerPointerOver).toHaveBeenCalledTimes(2);
    expect(target1.triggerPointerOut).toHaveBeenCalledTimes(2);
});
test("event.skipExcept() skips elements except the specified", () => {
    const manager = new EventManager_1.EventManager();
    const target1 = {
        getEventZOrder: () => 2,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.TILE_CURSOR }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 0, y: 0, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target2 = {
        getEventZOrder: () => 5,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.AVATAR }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 50, y: 50, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn((event) => event.skipExcept(IEventGroup_1.TILE_CURSOR)),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target3 = {
        getEventZOrder: () => 9,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 75, y: 75, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn(),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    const target4 = {
        getEventZOrder: () => 10,
        getGroup: () => ({ getEventGroupIdentifier: () => IEventGroup_1.FURNITURE }),
        getRectangleObservable: () => new rxjs_1.BehaviorSubject({ x: 79, y: 79, width: 100, height: 100 }),
        hits: () => true,
        triggerClick: jest.fn((event) => event.skipExcept(IEventGroup_1.AVATAR, IEventGroup_1.TILE_CURSOR)),
        triggerPointerDown: jest.fn(),
        triggerPointerOut: jest.fn(),
        triggerPointerOver: jest.fn(),
        triggerPointerUp: jest.fn(),
        triggerPointerTargetChanged: jest.fn(),
    };
    manager.register(target1);
    manager.register(target2);
    manager.register(target3);
    manager.register(target4);
    manager.click(interactionEvent, 80, 80);
    expect(target1.triggerClick).toHaveBeenCalledTimes(1);
    expect(target2.triggerClick).toHaveBeenCalledTimes(1);
    expect(target3.triggerClick).toHaveBeenCalledTimes(0);
    expect(target4.triggerClick).toHaveBeenCalledTimes(1);
});
