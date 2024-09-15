"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOOP_EVENT_MANAGER = exports.EventManager = void 0;
const EventManagerNode_1 = require("./EventManagerNode");
const rbush_1 = __importDefault(require("rbush"));
const IEventGroup_1 = require("./interfaces/IEventGroup");
class EventManager {
    constructor() {
        this._nodes = new Map();
        this._bush = new rbush_1.default();
        this._currentOverElements = new Set();
        this._pointerDownElements = new Set();
    }
    click(event, x, y) {
        const elements = this._performHitTest(x, y);
        new Propagation(event, elements.activeNodes, (target, event) => target.triggerClick(event));
    }
    pointerDown(event, x, y) {
        const elements = this._performHitTest(x, y);
        this._pointerDownElements = new Set(elements.activeNodes);
        new Propagation(event, elements.activeNodes, (target, event) => target.triggerPointerDown(event));
    }
    pointerUp(event, x, y) {
        const elements = this._performHitTest(x, y);
        const elementsSet = new Set(elements.activeNodes);
        const clickedNodes = new Set();
        this._pointerDownElements.forEach((node) => {
            if (elementsSet.has(node)) {
                clickedNodes.add(node);
            }
        });
        new Propagation(event, elements.activeNodes, (target, event) => target.triggerPointerUp(event));
        new Propagation(event, Array.from(clickedNodes), (target, event) => {
            target.triggerClick(event);
        });
    }
    move(event, x, y) {
        const elements = this._performHitTest(x, y);
        const current = new Set(elements.activeNodes.filter((node, index) => 
        // Only interested in the top most element
        index === 0 ||
            // or the tile cursor
            node.target.getGroup().getEventGroupIdentifier() === IEventGroup_1.TILE_CURSOR));
        const previous = this._currentOverElements;
        const added = new Set();
        current.forEach((node) => {
            if (!previous.has(node)) {
                added.add(node);
            }
        });
        const removed = new Set();
        previous.forEach((node) => {
            if (!current.has(node)) {
                removed.add(node);
            }
        });
        const addedGroups = new Set();
        added.forEach((node) => {
            addedGroups.add(node.target.getGroup());
        });
        const removedButGroupPresent = new Set();
        const actualRemoved = new Set();
        removed.forEach((node) => {
            if (addedGroups.has(node.target.getGroup())) {
                removedButGroupPresent.add(node);
            }
            actualRemoved.add(node);
        });
        this._currentOverElements = current;
        new Propagation(event, Array.from(removedButGroupPresent), (target, event) => {
            target.triggerPointerTargetChanged(event);
        });
        new Propagation(event, Array.from(actualRemoved), (target, event) => target.triggerPointerOut(event));
        new Propagation(event, Array.from(added), (target, event) => target.triggerPointerOver(event));
    }
    register(target) {
        if (this._nodes.has(target))
            throw new Error("Target already registered");
        const node = new EventManagerNode_1.EventManagerNode(target, this._bush);
        this._nodes.set(target, node);
        return node;
    }
    remove(target) {
        const current = this._nodes.get(target);
        if (current == null)
            throw new Error("Target isn't in the event manager");
        current.destroy();
    }
    _performHitTest(x, y) {
        const qualifyingElements = this._bush.search({
            minX: x,
            minY: y,
            maxX: x,
            maxY: y,
        });
        const sortedElements = qualifyingElements
            .sort((a, b) => b.target.getEventZOrder() - a.target.getEventZOrder())
            .filter((node) => node.target.hits(x, y));
        const groups = new Map();
        const groupElements = [];
        sortedElements.forEach((node) => {
            const group = node.target.getGroup();
            if (group != null && groups.has(group))
                return;
            groupElements.push(node);
            if (group != null) {
                groups.set(group, node);
            }
        });
        return {
            activeNodes: groupElements,
            activeGroups: groups,
        };
    }
}
exports.EventManager = EventManager;
class Propagation {
    constructor(event, path, _trigger) {
        this.event = event;
        this.path = path;
        this._trigger = _trigger;
        this._skip = new Set();
        this._allow = new Set();
        this._stopped = false;
        this._propagate();
    }
    _propagate() {
        const event = this._createEvent();
        for (let i = 0; i < this.path.length; i++) {
            if (this._stopped)
                return;
            const node = this.path[i];
            if (this._skip.has(node.target.getGroup().getEventGroupIdentifier()) &&
                !this._allow.has(node.target.getGroup().getEventGroupIdentifier())) {
                continue;
            }
            if (this._allow.size > 0 &&
                !this._allow.has(node.target.getGroup().getEventGroupIdentifier())) {
                continue;
            }
            this._trigger(this.path[i].target, event);
        }
    }
    _createEvent() {
        return {
            interactionEvent: this.event,
            mouseEvent: this.event.data.originalEvent,
            stopPropagation: () => {
                this._stopped = true;
            },
            skip: (...identifiers) => {
                const add = (identifier) => {
                    if (Array.isArray(identifier)) {
                        identifier.forEach((value) => add(value));
                    }
                    else {
                        this._skip.add(identifier);
                    }
                };
                add(identifiers);
            },
            skipExcept: (...identifiers) => {
                const add = (identifier) => {
                    if (Array.isArray(identifier)) {
                        identifier.forEach((value) => add(value));
                    }
                    else {
                        this._allow.add(identifier);
                    }
                };
                add(identifiers);
            },
        };
    }
}
exports.NOOP_EVENT_MANAGER = {
    register: () => {
        return {
            destroy: () => {
                // Do nothing
            },
        };
    },
    remove: () => {
        // Do nothing
    },
};
