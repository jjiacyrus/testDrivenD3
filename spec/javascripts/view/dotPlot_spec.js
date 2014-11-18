afterEach(function () {
    d3.selectAll('svg').remove();
});

beforeEach(function(){
    function rangeEqualityChecker(expected,actual){

        if(expected instanceof Range && actual instanceof Range) {
            return expected.max == actual.max && expected.min == actual.min
        };
    }
    jasmine.addCustomEqualityTester(rangeEqualityChecker);
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

        var plotId = "plotterton";
        var dataset = new Dataset('', [], [], [], []);
        var width = 1000;
        var height = 500;

        var plotModel = new PlotModel(parentNode, plotId, width, height);
        var experiment = new Experiment(dataset);
        var dotPlot = new DotPlot(plotModel, plotSpec, experiment);


        var expectedCanvas = d3.select('body').append('svg');
        var mockXScale = new MockLinearScale();
        var mockYScale = new MockLinearScale();
        var expectedTranslate = 50;


        var renderCanvasSpy = spyOn(D3Helper, 'renderCanvas').and.returnValue(expectedCanvas);

        var buildXScaleSpy = spyOn(D3Helper, 'buildLinearXScale').and.returnValue(mockXScale);
        var buildYScaleSpy = spyOn(D3Helper, 'buildLinearYScale').and.returnValue(mockYScale);

        var renderXAxisSpy = spyOn(D3Helper, 'renderXAxis');
        var renderYAxisSpy = spyOn(D3Helper, 'renderYAxis');

        dotPlot.renderPlot();


        expect(new Range(0,10)).toEqual(new Range(0,10));

        expect(renderCanvasSpy).toHaveBeenCalledWith(parentNode, plotId, 1000, 500);

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

        var xDomain = new Range(12, 223);
        var yDomain = new Range(46212, 223);
        plotSpec.setXRange(xDomain);
        plotSpec.setYRange(yDomain);

        var plotId = "plotterton";
        var dataset = new Dataset([], [], [], []);
        var plotModel = new PlotModel(parentNode, plotId, 1000, 500);
        var experiment = new Experiment(dataset);

        var dotPlot = new DotPlot(plotModel, plotSpec, experiment);


        var canvas = d3.select('body').append('svg');
        var mockXScale = new MockLinearScale();
        var mockYScale = new MockLinearScale();
        var channel2Data = [124, 12412, 412, 4, 12414];
        var channel4Data = [163224, 34, 413422, 3424, 414];


        spyOn(D3Helper, 'renderCanvas').and.returnValue(canvas);

        spyOn(D3Helper, 'buildLinearXScale').and.returnValue(mockXScale);
        spyOn(D3Helper, 'buildLinearYScale').and.returnValue(mockYScale);
        var getChannel2Spy = spyOn(dataset, 'getChannel2').and.returnValue(channel2Data);
        var getChannel4Spy = spyOn(dataset, 'getChannel4').and.returnValue(channel4Data);
        var formattedData = [
            [3523, 3423],
            [35325, 532],
            [3532, 43423],
            [53253, 23423]
        ];
        spyOn(D3Helper, 'renderXAxis');
        spyOn(D3Helper, 'renderYAxis');
        var formatDataSpy = spyOn(DotPlotHelper, 'formatData').and.returnValue(formattedData);
        var renderDataSpy = spyOn(DotPlotHelper, 'renderScatterPlotData');


        dotPlot.renderPlot();

        expect(getChannel2Spy).toHaveBeenCalled();
        expect(getChannel4Spy).toHaveBeenCalled();
        expect(formatDataSpy).toHaveBeenCalledWith(channel2Data, channel4Data, mockXScale, mockYScale, xDomain, yDomain);
        expect(renderDataSpy).toHaveBeenCalledWith(canvas, formattedData, 50, 0);

    });

    it("scales and renders the data in the canvas with different channels", function () {

        var parentNode = "div#target-div";
        affix(parentNode);

        var plotSpec = new PlotSpecification();
        var xRange = new Range(214, 5225);
        var yRange = new Range(114,225);
        plotSpec.setXRange(xRange);
        plotSpec.setYRange(yRange);

        plotSpec.setXParameter(CH3);
        plotSpec.setYParameter(CH1);

        var plotId = "plotterton";
        var dataset = new Dataset('', [], [], [], []);

        var plotModel = new PlotModel(parentNode, plotId, 1000, 500);
        var experiment = new Experiment(dataset);

        var dotPlot = new DotPlot(plotModel, plotSpec, experiment);


        var canvas = d3.select('body').append('svg');
        var mockXScale = new MockLinearScale();
        var mockYScale = new MockLinearScale();
        var channel1Data = [124, 12412, 412, 4, 12414];
        var channel3Data = [163224, 34, 413422, 3424, 414];


        spyOn(D3Helper, 'renderCanvas').and.returnValue(canvas);

        spyOn(D3Helper, 'buildLinearXScale').and.returnValue(mockXScale);
        spyOn(D3Helper, 'buildLinearYScale').and.returnValue(mockYScale);
        var getChannel1Spy = spyOn(dataset, 'getChannel1').and.returnValue(channel1Data);
        var getChannel3Spy = spyOn(dataset, 'getChannel3').and.returnValue(channel3Data);
        var formattedData = [
            [3523, 3423],
            [35325, 532],
            [3532, 43423],
            [53253, 23423]
        ];
        spyOn(D3Helper, 'renderXAxis');
        spyOn(D3Helper, 'renderYAxis');
        var formatDataSpy = spyOn(DotPlotHelper, 'formatData').and.returnValue(formattedData);
        var renderDataSpy = spyOn(DotPlotHelper, 'renderScatterPlotData');


        dotPlot.renderPlot();

        expect(getChannel1Spy).toHaveBeenCalled();
        expect(getChannel3Spy).toHaveBeenCalled();
        expect(formatDataSpy).toHaveBeenCalledWith(channel3Data, channel1Data, mockXScale, mockYScale, xRange, yRange);
        expect(renderDataSpy).toHaveBeenCalledWith(canvas, formattedData, 50, 0);

    });

    it('adds itself as observer to the plot spec and experiment on construction', function () {
        var parentNode = "div#target-div";

        var plotSpec = new PlotSpecification();
        var experiment = new Experiment(new Dataset('', [], [], [], []));

        var plotSpecAddObserverSpy = spyOn(plotSpec, 'addObserver');
        var experimentAddObserverSpy = spyOn(experiment, 'addObserver');

        var plotModel = new PlotModel(parentNode, "plotterton", 1000, 500);

        var dotPlot = new DotPlot(plotModel, plotSpec, experiment);
        expect(plotSpecAddObserverSpy).toHaveBeenCalledWith(dotPlot);
        expect(experimentAddObserverSpy).toHaveBeenCalledWith(dotPlot);
    });

    it('removes the previous svg and re-renders when specification changed is called', function () {
        var parentNode = "div#target-div";

        var plotSpec = new PlotSpecification();
        var plotModel = new PlotModel(parentNode, "plotterton", 1000, 500);
        var experiment = new Experiment(new Dataset('', [], [], [], []));

        var dotPlot = new DotPlot(plotModel, plotSpec, experiment);
        var renderSpy = spyOn(dotPlot, 'renderPlot');
        var svgSpy = buildD3SpyNode(parentNode, 'svg');
        var selectSpy = spyOn(d3, 'select').and.returnValue(svgSpy);

        dotPlot.specificationChanged();
        expect(selectSpy).toHaveBeenCalledWith('svg#plotterton');
        expect(svgSpy.remove).toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalled();


    });
    it('removes the previous svg and re-renders when dataset changed is called', function () {
        var parentNode = "div#target-div";

        var plotSpec = new PlotSpecification();
        var plotModel = new PlotModel(parentNode, "plotterton", 1000, 500);
        var experiment = new Experiment(new Dataset('', [], [], [], []));

        var dotPlot = new DotPlot(plotModel, plotSpec, experiment);
        var renderSpy = spyOn(dotPlot, 'renderPlot');
        var svgSpy = buildD3SpyNode(parentNode, 'svg');
        var selectSpy = spyOn(d3, 'select').and.returnValue(svgSpy);

        dotPlot.datasetChanged();
        expect(selectSpy).toHaveBeenCalledWith('svg#plotterton');
        expect(svgSpy.remove).toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalled();
    });

    it('removes itself as observer when destroy is called', function () {
        var parentNode = "div#target-div";

        var plotSpec = new PlotSpecification();
        var experiment = new Experiment(new Dataset('', [], [], [], []));

        var plotSpecRemoveObserverSpy = spyOn(plotSpec, 'removeObserver');
        var experimentRemoveObserverSpy = spyOn(experiment, 'removeObserver');
        var svgSpy = buildD3SpyNode(parentNode, 'svg');

        var plotModel = new PlotModel(parentNode, "plotterton", 1000, 500);
        var selectSpy = spyOn(d3, 'select').and.returnValue(svgSpy);

        var dotPlot = new DotPlot(plotModel, plotSpec, experiment);
        dotPlot.destroy();

        expect(selectSpy).toHaveBeenCalledWith('svg#plotterton');
        expect(svgSpy.remove).toHaveBeenCalled();
        expect(plotSpecRemoveObserverSpy).toHaveBeenCalledWith(dotPlot);
        expect(experimentRemoveObserverSpy).toHaveBeenCalledWith(dotPlot);
    });


});


