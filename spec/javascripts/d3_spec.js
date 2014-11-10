//afterEach(function () {
//    d3.selectAll('svg').remove();
//});
//
//describe("d3 messarounds", function () {
//    it("renders a canvas inside the div", function () {
//
//        affix("div#target-div");
//
//        theCanvas = makeBarGraph("target-div");
//        var width = 25;
//        var height = 500;
//        theCanvas.render(width, height);
//
//        var parentDiv = d3.select("div#target-div");
//        var canvasSvg = parentDiv.select('svg');
//        expect(canvasSvg.empty()).toBeFalsy();
//
//        expect(canvasSvg.attr('width')).toBe(width + "");
//        expect(canvasSvg.attr('height')).toBe(height + "");
//
//        var graphic = canvasSvg.select('g');
//        expect(graphic.empty()).toBeFalsy();
//        expect(graphic.attr('transform')).toBe("translate(0, 0)");
//    });
//
//
//});