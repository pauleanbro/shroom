export declare function runForwardingServer({ wsPort, targetPort, debug, prependLengthPrefix, targetHost, keyPath, certPath }: {
    wsPort: number;
    targetPort: number;
    debug?: boolean;
    targetHost?: string;
    prependLengthPrefix?: boolean;
    keyPath?: string;
    certPath?: string;
}): {
    close(): void;
};
