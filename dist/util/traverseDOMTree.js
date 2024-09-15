"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.traverseDOMTree = void 0;
function traverseDOMTree(node, options) {
    options.enter(node);
    node.childNodes.forEach((node) => traverseDOMTree(node, options));
    options.exit(node);
}
exports.traverseDOMTree = traverseDOMTree;
