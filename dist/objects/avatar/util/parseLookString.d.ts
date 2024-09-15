export type ParsedLook = Map<string, {
    setId: number;
    colorId: number;
}>;
export declare function parseLookString(look: string): ParsedLook;
