"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mock_1 = require("../../../../util/mock");
const BasicFurnitureVisualization_1 = require("../BasicFurnitureVisualization");
test("sets direction", () => {
    const visu = new BasicFurnitureVisualization_1.StaticFurnitureVisualization();
    const layer = {
        assetCount: 4,
        layerIndex: 0,
        frameRepeat: 1,
        setCurrentFrameIndex: jest.fn(),
        setColor: jest.fn(),
    };
    const visualizationData = (0, mock_1.mock)({
        getTransitionForAnimation: jest.fn().mockReturnValue(undefined),
        getAnimation: jest.fn().mockReturnValue({ id: 1 }),
        getFrameCount: jest.fn().mockReturnValue(4),
    });
    const view = (0, mock_1.mock)({
        getLayers: jest.fn().mockReturnValue([layer]),
        getVisualizationData: jest.fn().mockReturnValue(visualizationData),
        setDisplayAnimation: jest.fn(),
        setDisplayDirection: jest.fn(),
        updateDisplay: jest.fn(),
    });
    visu.setView(view);
    visu.update();
    visu.updateDirection(0);
    expect(view.setDisplayDirection).toHaveBeenLastCalledWith(0);
});
test("sets animation", () => {
    const visu = new BasicFurnitureVisualization_1.StaticFurnitureVisualization();
    const layer = {
        assetCount: 4,
        layerIndex: 0,
        frameRepeat: 1,
        setCurrentFrameIndex: jest.fn(),
        setColor: jest.fn(),
    };
    const visualizationData = (0, mock_1.mock)({
        getTransitionForAnimation: jest.fn().mockReturnValue(undefined),
        getAnimation: jest.fn().mockReturnValue({ id: 1 }),
        getFrameCount: jest.fn().mockReturnValue(4),
    });
    const view = (0, mock_1.mock)({
        getLayers: jest.fn().mockReturnValue([layer]),
        getVisualizationData: jest.fn().mockReturnValue(visualizationData),
        setDisplayAnimation: jest.fn(),
        setDisplayDirection: jest.fn(),
        updateDisplay: jest.fn(),
    });
    visu.setView(view);
    visu.update();
    visu.updateDirection(0);
    visu.updateAnimation("0");
    expect(view.setDisplayAnimation).toHaveBeenLastCalledWith("0");
});
