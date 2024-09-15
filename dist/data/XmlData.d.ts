export declare class XmlData {
    protected document: Document;
    constructor(xml: string);
    protected querySelectorAll(query: string): Element[];
    protected querySelector(query: string): Element | null;
}
