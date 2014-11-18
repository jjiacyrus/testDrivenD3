afterEach(function () {
    d3.selectAll('svg').remove();
});

describe("Histogram Plot", function () {
    it("renders a canvas, and an x axis, and a y axis based on the binned data in the a div", function () {

        var parentNode = "div#target-div";
        affix(parentNode);
        var xDomain = new Range(12, 223);

        var numberOfBins = 52;
        var histogramSpec = new HistogramSpecification(CH2, xDomain, numberOfBins);

        var plotId = "plotterton";
        var channelData = [52, 12, 5, 62, 100, 200];
        var dataset = new Dataset('', [], channelData, [], []);
        var width = 1000;
        var height = 500;

        var plotModel = new PlotModel(parentNode, plotId, width, height);
        var experiment = new Experiment(dataset);
        var histoPlot = new HistogramPlot(plotModel, histogramSpec, experiment);


        var expectedCanvas = d3.select('body').append('svg');
        var mockXScale = new MockLinearScale();
        var mockYScale = new MockLinearScale();
        var expectedTranslate = 50;

        var binnedData = [
            {x: 3523, y: 9},
            {x: 3523, y: 100},
            {x: 3523, y: 50},
        ];
        var binSpy = spyOn(window, 'binData').and.returnValue(binnedData);

        var renderCanvasSpy = spyOn(window, 'renderCanvas').and.returnValue(expectedCanvas);


        var buildXScaleSpy = spyOn(window, 'buildLinearXScale').and.returnValue(mockXScale);
        var buildYScaleSpy = spyOn(window, 'buildLinearYScale').and.returnValue(mockYScale);

        var renderXAxisSpy = spyOn(window, 'renderXAxis');
        var renderYAxisSpy = spyOn(window, 'renderYAxis');

        histoPlot.renderPlot();
        expect(renderCanvasSpy).toHaveBeenCalledWith(parentNode, plotId, 1000, 500);
        expect(binSpy).toHaveBeenCalledWith(channelData, mockXScale, numberOfBins);

        expect(buildXScaleSpy).toHaveBeenCalledWith(new Range(0, 935), xDomain);
        expect(renderXAxisSpy).toHaveBeenCalledWith(expectedCanvas, mockXScale, expectedTranslate, 470);

        expect(buildYScaleSpy).toHaveBeenCalledWith(new Range(10, 470), new Range(0, 110));
        expect(renderYAxisSpy).toHaveBeenCalledWith(expectedCanvas, mockYScale, expectedTranslate, 0);

    });
    it("bins, scales and renders the data in the canvas", function () {

        var parentNode = "div#target-div";
        affix(parentNode);
        var xDomain = new Range(12, 223);

        var numberOfBins = 52;
        var histogramSpec = new HistogramSpecification(CH2, xDomain, numberOfBins);

        var plotId = "plotterton";
        var ch2 = [52, 12, 5, 62, 100, 200];
        var dataset = new Dataset('', [], ch2, [], []);
        var width = 1000;
        var height = 500;

        var plotModel = new PlotModel(parentNode, plotId, width, height);
        var experiment = new Experiment(dataset);
        var histoPlot = new HistogramPlot(plotModel, histogramSpec, experiment);

        var canvas = d3.select('body').append('svg');
        var mockXScale = new MockLinearScale();
        var mockYScale = new MockLinearScale();


        spyOn(window, 'renderCanvas').and.returnValue(canvas);

        spyOn(window, 'buildLinearXScale').and.returnValue(mockXScale);
        spyOn(window, 'buildLinearYScale').and.returnValue(mockYScale);
        var binnedData = [
            {x: 3523, y: 3423}
        ];
        var scaledData = [
            {x: 23, y: 245}
        ];
        spyOn(window, 'renderXAxis');
        spyOn(window, 'renderYAxis');
        var binSpy = spyOn(window, 'binData').and.returnValue(binnedData);
        var scaleSpy = spyOn(window, 'scaleBinnedData').and.returnValue(scaledData);
        var renderDataSpy = spyOn(window, 'renderHistogramData');

        histoPlot.renderPlot();

        expect(binSpy).toHaveBeenCalledWith(ch2, mockXScale, numberOfBins);
        expect(scaleSpy).toHaveBeenCalledWith(binnedData, mockXScale, mockYScale);
        expect(renderDataSpy).toHaveBeenCalledWith(canvas, scaledData, 50, 0, 470);

    });

    it('adds itself as observer to the plot spec and experiment on construction', function () {

        var parentNode = "div#target-div";
        affix(parentNode);
        var xDomain = new Range(12, 223);

        var numberOfBins = 52;
        var histogramSpec = new HistogramSpecification(CH2, xDomain, numberOfBins);

        var plotId = "plotterton";
        var ch2 = [52, 12, 5, 62, 100, 200];
        var dataset = new Dataset('', [], ch2, [], []);
        var width = 1000;
        var height = 500;

        var experiment = new Experiment(dataset);

        var plotSpecAddObserverSpy = spyOn(histogramSpec, 'addObserver');
        var experimentAddObserverSpy = spyOn(experiment, 'addObserver');

        var histoPlot = new HistogramPlot(new PlotModel(parentNode, plotId, width, height), histogramSpec, experiment);

        expect(plotSpecAddObserverSpy).toHaveBeenCalledWith(histoPlot);
        expect(experimentAddObserverSpy).toHaveBeenCalledWith(histoPlot);
    });

    it('removes the previous svg and re-renders when specification changed is called', function () {
        var parentNode = "div#target-div";

        var plotSpec = new HistogramSpecification();
        var plotModel = new PlotModel(parentNode, "plotterton", 1000, 500);
        var experiment = new Experiment(new Dataset('', [], [], [], []));

        var histoPlot = new HistogramPlot(plotModel, plotSpec, experiment);
        var renderSpy = spyOn(histoPlot, 'renderPlot');
        var svgSpy = buildD3SpyNode(parentNode, 'svg');
        var selectSpy = spyOn(d3, 'select').and.returnValue(svgSpy);

        histoPlot.specificationChanged();
        expect(selectSpy).toHaveBeenCalledWith('svg#plotterton');
        expect(svgSpy.remove).toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalled();


    });
    it('removes the previous svg and re-renders when dataset changed is called', function () {
        var parentNode = "div#target-div";

        var plotSpec = new HistogramSpecification();
        var plotModel = new PlotModel(parentNode, "plotterton", 1000, 500);
        var experiment = new Experiment(new Dataset('', [], [], [], []));

        var histoPlot = new HistogramPlot(plotModel, plotSpec, experiment);
        var renderSpy = spyOn(histoPlot, 'renderPlot');
        var svgSpy = buildD3SpyNode(parentNode, 'svg');
        var selectSpy = spyOn(d3, 'select').and.returnValue(svgSpy);

        histoPlot.datasetChanged();
        expect(selectSpy).toHaveBeenCalledWith('svg#plotterton');
        expect(svgSpy.remove).toHaveBeenCalled();
        expect(renderSpy).toHaveBeenCalled();
    });

    it('removes itself as observer when destroy is called', function () {
        var parentNode = "div#target-div";

        var plotSpec = new HistogramSpecification();
        var experiment = new Experiment(new Dataset('', [], [], [], []));

        var plotSpecRemoveObserverSpy = spyOn(plotSpec, 'removeObserver');
        var experimentRemoveObserverSpy = spyOn(experiment, 'removeObserver');
        var svgSpy = buildD3SpyNode(parentNode, 'svg');

        var plotModel = new PlotModel(parentNode, "plotterton", 1000, 500);
        var selectSpy = spyOn(d3, 'select').and.returnValue(svgSpy);

        var histoPlot = new HistogramPlot(plotModel, plotSpec, experiment);
        histoPlot.destroy();

        expect(selectSpy).toHaveBeenCalledWith('svg#plotterton');
        expect(svgSpy.remove).toHaveBeenCalled();
        expect(plotSpecRemoveObserverSpy).toHaveBeenCalledWith(histoPlot);
        expect(experimentRemoveObserverSpy).toHaveBeenCalledWith(histoPlot);
    });

});

