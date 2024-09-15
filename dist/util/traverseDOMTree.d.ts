export declare function traverseDOMTree(node: Node, options: {
    enter: (node: Node) => void;
    exit: (node: Node) => void;
}): void;
