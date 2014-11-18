describe('d3 Helpers', function () {


    it('should return a scale based on the canvas size and the range', function () {
        var scaleToReturn = new MockLinearScale();
        d3.scale.linear = function () {
            return scaleToReturn;
        };

        var theRange = new Range(10, 500);
        var theDomain = new Range(50, 300);
        scale = buildLinearXScale(theRange, theDomain);
        expect(scale).not.toBeUndefined();
        expect(scale).toEqual(scaleToReturn);

        expect(scale.minRange).toEqual(theRange.min);
        expect(scale.maxRange).toEqual(theRange.max);

        expect(scale.minDomain).toEqual(theDomain.min);
        expect(scale.maxDomain).toEqual(theDomain.max);

    });

    it('should return a scale based on the canvas size and the range with a flipped max and min for y', function () {
        var scaleToReturn = new MockLinearScale();


        d3.scale.linear = function () {
            return scaleToReturn;
        };

        var theRange = new Range(10, 500);
        var theDomain = new Range(50, 300);
        scale = buildLinearYScale(theRange, theDomain);
        expect(scale).not.toBeUndefined();
        expect(scale).toEqual(scaleToReturn);

        expect(scale.minRange).toEqual(theRange.min);
        expect(scale.maxRange).toEqual(theRange.max);

        expect(scale.minDomain).toEqual(theDomain.max);
        expect(scale.maxDomain).toEqual(theDomain.min);

    });


    it('should be able to create a canvas of a certain size', function () {

        affix("div#target-div");
        var width = 25;
        var height = 500;

        var theCanvas = renderCanvas("div#target-div", 'canvas_mcgee', width, height);

        var parentDiv = d3.select("div#target-div");
        var canvasSvg = parentDiv.select('svg');
        expect(canvasSvg).toEqual(theCanvas);
        expect(canvasSvg.empty()).toBeFalsy();

        expect(canvasSvg.attr('id')).toBe('canvas_mcgee');
        expect(canvasSvg.attr('width')).toBe(width + "");
        expect(canvasSvg.attr('height')).toBe(height + "");


    });

    it('should be able to render the x axis', function () {
        affix('svg#canvas');

        var mockAxis = new MockAxis();
        d3.svg.axis = function () {
            return mockAxis;
        };

        var canvas = d3.select('#canvas');
        var mockD3Node = buildD3SpyNode(canvas, 'g');

        var canvasAppendSpy = spyOn(canvas, 'append').and.returnValue(mockD3Node);

        var xScale = new MockLinearScale();
        var xTranslate = 35;
        var yTranslate = 20;
        renderXAxis(canvas, xScale, xTranslate, yTranslate);

        expect(canvasAppendSpy).toHaveBeenCalledWith('g');
        expect(mockD3Node.attr).toHaveBeenCalledWith('class', 'x axis');
        expect(mockD3Node.attr).toHaveBeenCalledWith('transform', 'translate(35 ,20)');
        expect(mockD3Node.call).toHaveBeenCalledWith(mockAxis);
        expect(mockAxis.scalePassedIn).toEqual(xScale);
        expect(mockAxis.orientation).toEqual("bottom");

    });

    it('should be able to render the y axis', function () {
        affix('svg#canvas');

        var mockAxis = new MockAxis();
        d3.svg.axis = function () {
            return mockAxis;
        };

        var canvas = d3.select('#canvas');
        var mockD3Node = buildD3SpyNode(canvas, 'g');

        var canvasAppendSpy = spyOn(canvas, 'append').and.returnValue(mockD3Node);

        var yScale = new MockLinearScale();
        var xTranslate = 20;
        var yTranslate = 15;
        renderYAxis(canvas, yScale, xTranslate, yTranslate);

        expect(canvasAppendSpy).toHaveBeenCalledWith('g');
        expect(mockD3Node.attr).toHaveBeenCalledWith('class', 'y axis');
        expect(mockD3Node.attr).toHaveBeenCalledWith('transform', 'translate(20 ,15)');
        expect(mockD3Node.call).toHaveBeenCalledWith(mockAxis);
        expect(mockAxis.scalePassedIn).toEqual(yScale);
        expect(mockAxis.orientation).toEqual("left");
    });


});