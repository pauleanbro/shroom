(self["webpackChunkshroom_example"] = self["webpackChunkshroom_example"] || []).push([[792],{

/***/ 9589:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";

// UNUSED EXPORTS: DummyRoom

// EXTERNAL MODULE: ./node_modules/@jankuss/shroom/dist/index.js
var dist = __webpack_require__(6636);
// EXTERNAL MODULE: ./node_modules/easystarjs/src/easystar.js
var easystar = __webpack_require__(6927);
;// CONCATENATED MODULE: ./src/behaviors/DiceBehavior.ts
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DiceAnimation = /*#__PURE__*/function (DiceAnimation) {
  DiceAnimation["Rolling"] = "-1";
  DiceAnimation["Closed"] = "0";
  return DiceAnimation;
}(DiceAnimation || {});
class DiceBehavior_DiceBehavior {
  constructor() {
    _defineProperty(this, "state", {
      state: "closed",
      value: 1
    });
    _defineProperty(this, "furniture", void 0);
    _defineProperty(this, "timeout", void 0);
  }
  _startRoll() {
    this.state = {
      ...this.state,
      state: "rolling"
    };
    this._updateState();
    this.timeout = window.setTimeout(() => {
      this._setValue(Math.floor(Math.random() * 6) + 1);
    }, 500);
  }
  _setValue(value) {
    this.state = {
      ...this.state,
      state: "value",
      value
    };
    this._updateState();
  }
  _open() {
    this.state = {
      ...this.state,
      state: "value"
    };
    this._updateState();
  }
  _close() {
    this.state = {
      ...this.state,
      state: "closed"
    };
    this._updateState();
  }
  _updateState() {
    const furniture = this.furniture;
    if (furniture == null) return;
    switch (this.state.state) {
      case "value":
        furniture.animation = this.state.value.toString();
        break;
      case "rolling":
        furniture.animation = DiceAnimation.Rolling;
        break;
      case "closed":
        furniture.animation = DiceAnimation.Closed;
        break;
    }
  }
  _handleActivate() {
    if (this.state.state === "value") {
      this._startRoll();
    } else if (this.state.state === "closed") {
      this._open();
    }
  }
  _handleDeactivate() {
    if (this.state.state === "value") {
      this._close();
    } else if (this.state.state === "rolling") {
      this._close();
    } else if (this.state.state === "closed") {
      this._open();
    }
  }
  _handleClick(event) {
    event.stopPropagation();
    switch (event.tag) {
      case "activate":
        this._handleActivate();
        break;
      case "deactivate":
        this._handleDeactivate();
        break;
    }
  }
  setParent(furniture) {
    this.furniture = furniture;
    furniture.onDoubleClick = event => {
      this._handleClick(event);
    };
    this._updateState();
  }
  remove() {
    throw new Error("Method not implemented.");
  }
}
;// CONCATENATED MODULE: ./src/index.ts
function src_defineProperty(e, r, t) { return (r = src_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function src_toPropertyKey(t) { var i = src_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function src_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }





class DummyRoom {
  constructor(application) {
    src_defineProperty(this, "room", void 0);
    src_defineProperty(this, "ownAvatar", void 0);
    src_defineProperty(this, "path", []);
    src_defineProperty(this, "grid", void 0);
    src_defineProperty(this, "roomTick", setInterval(() => {
      const next = this.path[0];
      const afterNext = this.path[1];
      if (next != null) {
        this.ownAvatar.walk(next.roomX, next.roomY, next.roomZ, {
          direction: next.direction
        });
        this.path.shift();
      }
      if (afterNext != null) {
        this.ownAvatar.walk(afterNext.roomX, afterNext.roomY, afterNext.roomZ, {
          direction: afterNext.direction
        });
        this.path.shift();
      }
    }, 500));
    const tilemap = parseTileMapString(`
        1111111111
        1111111111
        1111111111
        1111111111
        111111xx00
        111111xx00
        000000xx00
        0000000000
        0000000000
        0000000000
    `);
    this.grid = tilemap.map(row => row.map(type => type !== "x" ? Number(type) : -1));
    const furnitureData = FurnitureData.create("./resources");
    const shroom = Shroom.create({
      application,
      resourcePath: "./resources",
      furnitureData
    });
    this.room = Room.create(shroom, {
      tilemap: tilemap
    });
    this.room.addRoomObject(new FloorFurniture({
      roomX: 0,
      roomY: 0,
      roomZ: 1,
      direction: 0,
      type: "edicehc",
      behaviors: [new DiceBehavior(), new FurniInfoBehavior(furnitureData)]
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 0,
      roomY: 0,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "0",
      behaviors: [new MultiStateBehavior({
        initialState: 1,
        count: 10
      })]
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 2,
      roomY: 0,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: [new MultiStateBehavior({
        initialState: 1,
        count: 10
      })]
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 4,
      roomY: 0,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: [new MultiStateBehavior({
        initialState: 1,
        count: 10
      })]
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 6,
      roomY: 0,
      roomZ: 1,
      direction: 6,
      type: "party_floor",
      animation: "1",
      behaviors: [new MultiStateBehavior({
        initialState: 1,
        count: 10
      })]
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 8,
      roomY: 0,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: [new MultiStateBehavior({
        initialState: 1,
        count: 10
      })]
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 8,
      roomY: 2,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: [new MultiStateBehavior({
        initialState: 1,
        count: 10
      })]
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 6,
      roomY: 2,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: []
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 0,
      roomY: 2,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: []
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 2,
      roomY: 2,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: []
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 4,
      roomY: 2,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: []
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 0,
      roomY: 4,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: []
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 2,
      roomY: 4,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: []
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 4,
      roomY: 4,
      roomZ: 1,
      direction: 0,
      type: "party_floor",
      animation: "1",
      behaviors: []
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 0,
      roomY: 1,
      roomZ: 1,
      direction: 0,
      type: "throne",
      animation: "0",
      behaviors: []
    }));
    this.room.addRoomObject(new FloorFurniture({
      roomX: 1,
      roomY: 0,
      roomZ: 1,
      direction: 2,
      type: "party_ravel",
      animation: "0",
      behaviors: [new MultiStateBehavior({
        initialState: 0,
        count: 2
      })]
    }));
    this.room.addRoomObject(new WallFurniture({
      roomX: 0,
      roomY: 0,
      roomZ: 1,
      direction: 2,
      type: "window_basic",
      animation: "0",
      behaviors: [new FurniInfoBehavior(furnitureData)]
    }));
    this.room.floorTexture = loadRoomTexture("./tile.png");
    this.room.onTileClick = async position => {
      this.ownAvatar.clearMovement();
      const path = await this.findPath(position);
      this.path = path;
    };
    this.ownAvatar = new Avatar({
      look: "hd-605-2.hr-3012-45.ch-645-109.lg-720-63.sh-725-92.wa-2001-62",
      direction: 2,
      roomX: 1,
      roomY: 0,
      roomZ: 1
    });
    this.ownAvatar.onClick = event => {
      event.absorb();
    };
    this.room.addRoomObject(this.ownAvatar);
    this.room.x = application.screen.width / 2 - this.room.roomWidth / 2;
    this.room.y = application.screen.height / 2 - this.room.roomHeight / 2;
    application.stage.addChild(this.room);
  }
  handleRoomTick() {}
  findPath(target) {
    return new Promise(resolve => {
      const easystar = new EasyStar.js();
      easystar.setGrid(this.grid);
      easystar.setAcceptableTiles([1, 0]);
      easystar.enableDiagonals();
      easystar.findPath(this.ownAvatar.roomX, this.ownAvatar.roomY, target.roomX, target.roomY, result => {
        let currentPosition = {
          x: this.ownAvatar.roomX,
          y: this.ownAvatar.roomY
        };
        const path = [];
        result.forEach((position, index) => {
          if (index === 0) return;
          const direction = getAvatarDirectionFromDiff(position.x - currentPosition.x, position.y - currentPosition.y);
          const tile = this.room.getTileAtPosition(position.x, position.y);
          if (tile != null) {
            const getHeight = () => {
              if (tile.type === "tile") return tile.z;
              if (tile.type === "stairs") return tile.z + 0.5;
              return 0;
            };
            path.push({
              roomX: position.x,
              roomY: position.y,
              roomZ: getHeight(),
              direction
            });
            currentPosition = {
              x: position.x,
              y: position.y
            };
          }
        });
        resolve(path);
      });
      easystar.calculate();
    });
  }
}
function getAvatarDirectionFromDiff(diffX, diffY) {
  const signX = Math.sign(diffX);
  const signY = Math.sign(diffY);
  switch (signX) {
    case -1:
      switch (signY) {
        case -1:
          return 7;
        case 0:
          return 6;
        case 1:
          return 5;
      }
      break;
    case 0:
      switch (signY) {
        case -1:
          return 0;
        case 1:
          return 4;
      }
      break;
    case 1:
      switch (signY) {
        case -1:
          return 1;
        case 0:
          return 2;
        case 1:
          return 3;
      }
      break;
  }
}

/***/ }),

/***/ 2634:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 1155:
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [834], () => (__webpack_exec__(9589)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.8628b520176b9e0869b6.js.map