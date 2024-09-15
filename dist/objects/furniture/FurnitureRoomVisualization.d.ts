import { MaskNode } from "../../interfaces/IRoomVisualization";
import { IFurnitureRoomVisualization } from "./BaseFurniture";
export declare class FurnitureRoomVisualization implements IFurnitureRoomVisualization {
    private _container;
    constructor(_container: PIXI.Container);
    get container(): PIXI.Container;
    static fromContainer(container: PIXI.Container): FurnitureRoomVisualization;
    addMask(): MaskNode;
}
