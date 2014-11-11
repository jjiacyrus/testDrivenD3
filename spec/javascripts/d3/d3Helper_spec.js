describe('d3 Helpers', function () {


    it('should return a scale based on the canvas size and the range', function () {
        var scaleToReturn = new MockLinearScale();
        d3.scale.linear = function () {
            return scaleToReturn;
        };

        var theRange = new Range(10, 500);
        var theDomain = new Range(50, 300);
        scale = buildXScale(theRange, theDomain);
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
        scale = buildYScale(theRange, theDomain);
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

    it('should be able to render data', function () {

        var canvas = d3.select('body').append('svg');
        data = [
            [51, 90],
            [52, 90],
            [53, 90],
            [20, 20]
        ];
        renderData(canvas, data, 25, 50);

        var dataGroup = canvas.select('g');
        expect(dataGroup.empty()).toBeFalsy();
        expect(dataGroup.attr('transform')).toBe("translate(25, 50)");

        var dots = dataGroup.selectAll('circle.dot');
        var allDots = dots[0];
        expect(allDots.length).toEqual(4);

        function checkDot(index, expectedX, expectedY) {

            expect(d3.select(allDots[index]).attr('r')).toEqual('2');
            expect(d3.select(allDots[index]).attr('cx')).toEqual(expectedX + '');
            expect(d3.select(allDots[index]).attr('cy')).toEqual(expectedY + '');
        }

        checkDot(0, 51, 90);
        checkDot(1, 52, 90);
        checkDot(2, 53, 90);
        checkDot(3, 20, 20);
    });

    it('should scale data and put it into the correct format', function(){
        xData = [352,234,22,41];
        yData = [120,154,52,49];
        scaledXData = {};
        scaledXData[352] = 35.2;
        scaledXData[234] = 23.4;
        scaledXData[22] = 2.2;
        scaledXData[41] = 4.1;


        var mockXScale = MockScale(scaledXData);


        scaledYData = {};
        scaledYData[120] = 1200;
        scaledYData[154] = 1540;
        scaledYData[52] = 520;
        scaledYData[49] = 490;

        var mockYScale = MockScale(scaledYData);

        var formattedData = formatData(xData, yData, mockXScale, mockYScale);

        expect(formattedData).toEqual([[35.2,1200],[23.4,1540],[2.2,520],[4.1,490]]);
    });


});