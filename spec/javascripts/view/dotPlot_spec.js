afterEach(function () {
    d3.selectAll('svg').remove();
});

describe("Dot Plot", function () {
    it("renders a canvas, and axis in the a div", function () {

        var parentNode = "div#target-div";
        affix(parentNode);

        var plotSpec = new PlotSpecification();


        var xDomain = new Range(12, 223);
        var yDomain = new Range(46212, 223);
        plotSpec.setXRange(xDomain);
        plotSpec.setYRange(yDomain);

        var plotClass = "plotterton";
        var dataset = new Dataset([], [], [], []);
        dotPlot = new DotPlot(plotClass, plotSpec, dataset);


        var width = 1000;
        var height = 500;

        var expectedCanvas = d3.select('body').append('svg');
        var mockXScale = new MockScale();
        var mockYScale = new MockScale();
        var expectedTranslate = 50;


        var renderCanvasSpy = spyOn(window, 'renderCanvas').and.returnValue(expectedCanvas);

        var buildXScaleSpy = spyOn(window, 'buildXScale').and.returnValue(mockXScale);
        var buildYScaleSpy = spyOn(window, 'buildYScale').and.returnValue(mockYScale);

        var renderXAxisSpy = spyOn(window, 'renderXAxis');
        var renderYAxisSpy = spyOn(window, 'renderYAxis');

        dotPlot.renderPlot(parentNode, width, height);
        expect(renderCanvasSpy).toHaveBeenCalledWith(parentNode, plotClass, 1000, 500);
        expect(buildXScaleSpy).toHaveBeenCalledWith(new Range(0, 935), xDomain);
        expect(buildYScaleSpy).toHaveBeenCalledWith(new Range(10, 470), yDomain);

        expect(renderXAxisSpy).toHaveBeenCalledWith(expectedCanvas, mockXScale, expectedTranslate, 470);
        expect(renderYAxisSpy).toHaveBeenCalledWith(expectedCanvas, mockYScale, expectedTranslate, 0);

    });

    it("scales and renders the data in the canvas", function () {

        var parentNode = "div#target-div";
        affix(parentNode);

        var plotSpec = new PlotSpecification();


        plotSpec.setXParameter(CH2);
        plotSpec.setYParameter(CH4);

        var plotClass = "plotterton";
        var dataset = new Dataset([], [], [], []);
        dotPlot = new DotPlot(plotClass, plotSpec, dataset);


        var canvas = d3.select('body').append('svg');
        var mockXScale = new MockScale();
        var mockYScale = new MockScale();
        var channel2Data = [124, 12412, 412, 4, 12414];
        var channel4Data = [163224, 34, 413422, 3424, 414];


        spyOn(window, 'renderCanvas').and.returnValue(canvas);

        var i = 0;
        spyOn(window, 'buildXScale').and.returnValue(mockXScale);
        spyOn(window, 'buildYScale').and.returnValue(mockYScale);
        var getChannel2Spy = spyOn(dataset, 'getChannel2').and.returnValue(channel2Data);
        var getChannel4Spy = spyOn(dataset, 'getChannel4').and.returnValue(channel4Data);
        var formattedData = [
            [3523, 3423],
            [35325, 532],
            [3532, 43423],
            [53253, 23423]
        ];
        spyOn(window, 'renderXAxis');
        spyOn(window, 'renderYAxis');
        var formatDataSpy = spyOn(window, 'formatData').and.returnValue(formattedData);
        var renderDataSpy = spyOn(window, 'renderData');


        dotPlot.renderPlot(parentNode, 1000, 500);

        expect(getChannel2Spy).toHaveBeenCalled();
        expect(getChannel4Spy).toHaveBeenCalled();
        expect(formatDataSpy).toHaveBeenCalledWith(channel2Data, channel4Data, mockXScale, mockYScale);
        expect(renderDataSpy).toHaveBeenCalledWith(canvas, formattedData,50, 0);

    });

    it("scales and renders the data in the canvas with different channels", function () {

        var parentNode = "div#target-div";
        affix(parentNode);

        var plotSpec = new PlotSpecification();


        plotSpec.setXParameter(CH3);
        plotSpec.setYParameter(CH1);

        var plotClass = "plotterton";
        var dataset = new Dataset([], [], [], []);
        dotPlot = new DotPlot(plotClass, plotSpec, dataset);


        var canvas = d3.select('body').append('svg');
        var mockXScale = new MockScale();
        var mockYScale = new MockScale();
        var channel1Data = [124, 12412, 412, 4, 12414];
        var channel3Data = [163224, 34, 413422, 3424, 414];


        spyOn(window, 'renderCanvas').and.returnValue(canvas);

        var i = 0;
        spyOn(window, 'buildXScale').and.returnValue(mockXScale);
        spyOn(window, 'buildYScale').and.returnValue(mockYScale);
        var getChannel1Spy = spyOn(dataset, 'getChannel1').and.returnValue(channel1Data);
        var getChannel3Spy = spyOn(dataset, 'getChannel3').and.returnValue(channel3Data);
        var formattedData = [
            [3523, 3423],
            [35325, 532],
            [3532, 43423],
            [53253, 23423]
        ];
        spyOn(window, 'renderXAxis');
        spyOn(window, 'renderYAxis');
        var formatDataSpy = spyOn(window, 'formatData').and.returnValue(formattedData);
        var renderDataSpy = spyOn(window, 'renderData');


        dotPlot.renderPlot(parentNode, 1000, 500);

        expect(getChannel1Spy).toHaveBeenCalled();
        expect(getChannel3Spy).toHaveBeenCalled();
        expect(formatDataSpy).toHaveBeenCalledWith(channel3Data, channel1Data, mockXScale, mockYScale);
        expect(renderDataSpy).toHaveBeenCalledWith(canvas, formattedData,50, 0);

    });


});


