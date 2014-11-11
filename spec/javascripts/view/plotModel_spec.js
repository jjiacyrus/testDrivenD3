describe("Plot model", function () {
    it("should provide properties that are passed in through the constructor", function () {
        var parentNode = 'div#parent_node_selector';
        var id = 'thisistheid';
        var width = 352;
        var height = 62362;
        var model = new PlotModel(parentNode, id, width, height);
        expect(model.getParentNode()).toEqual(parentNode);
        expect(model.getPlotId()).toEqual(id);
        expect(model.getWidth()).toEqual(width);
        expect(model.getHeight()).toEqual(height);
    });
});