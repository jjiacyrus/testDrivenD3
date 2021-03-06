describe("Plot Corral", function () {


    it('should create the set of create buttons on construction', function () {
        var parentDivSelector = "div#top-div";
        affix(parentDivSelector);
        var mockBuilder = new MockPlotControlBuilder();
        spyOn(PlotControlBuilder, 'singleton').and.returnValue(mockBuilder);

        var experiment = new Experiment();
        var plotCorral = new PlotCorral('div#top-div', 1, experiment);
        expect(mockBuilder.addCreateButtons).toHaveBeenCalledWith(parentDivSelector, plotCorral);

    });


    it('should create a dot plot, and some controls inside the on create dot plot', function () {
        var parentDivSelector = "div#top-div";
        affix(parentDivSelector);

        var experiment = new Experiment();
        var plotCorral = new PlotCorral('div#top-div', 1, experiment);
        var mockDotPlot = new MockDotPlot();
        var mockBuilder = new MockPlotControlBuilder();
        var dotPlotConstructorSpy = spyOn(window, 'DotPlot').and.returnValue(mockDotPlot);
        spyOn(PlotControlBuilder, 'singleton').and.returnValue(mockBuilder);

        plotCorral.createDotPlot();

        expect(dotPlotConstructorSpy.calls.count()).toEqual(1);
        var arguments = dotPlotConstructorSpy.calls.argsFor(0);

        checkPlotModel(arguments);
        var plotSpec = arguments[1];
        checkPlotSpec(plotSpec);
        expect(arguments[2]).toEqual(experiment);
        expect($('#top-div').find('div#canvas1').length).toBeGreaterThan(0);
        expect(mockDotPlot.renderCalled).toBeTruthy();
        expect(mockBuilder.addDestroyButton).toHaveBeenCalledWith(parentDivSelector, plotCorral);
        expect(mockBuilder.addDotPlotControls).toHaveBeenCalledWith(parentDivSelector, plotSpec);

    });


    it('should create a histogram plot, and some controls inside the on create histogram', function () {
        var parentNodeSelector = "div#top-div";
        affix(parentNodeSelector);

        var experiment = new Experiment();
        var plotCorral = new PlotCorral('div#top-div', 1, experiment);
        var mockHistogram = new MockHistogramPlot();
        var constructorSpy = spyOn(window, 'HistogramPlot').and.returnValue(mockHistogram);
        var mockBuilder = new MockPlotControlBuilder();
        spyOn(PlotControlBuilder, 'singleton').and.returnValue(mockBuilder);

        plotCorral.createHistogramPlot();

        expect(constructorSpy.calls.count()).toEqual(1);
        var arguments = constructorSpy.calls.argsFor(0);

        checkPlotModel(arguments);
        var histogramSpec = arguments[1];
        checkHistogramSpec(histogramSpec);
        expect(arguments[2]).toEqual(experiment);
        expect($('#top-div').find('div#canvas1').length).toBeGreaterThan(0);
        expect(mockHistogram.renderCalled).toBeTruthy();
        expect(mockBuilder.addDestroyButton).toHaveBeenCalledWith(parentNodeSelector, plotCorral);
        expect(mockBuilder.addHistogramControls).toHaveBeenCalledWith(parentNodeSelector , histogramSpec);


    });

    it('should clear prexisting stuff before creating dot plot', function () {
        affix("div#top-div div#contents, div#contents2");

        var experiment = new Experiment();

        var plotCorral = new PlotCorral('div#top-div', 1, experiment);

        var mockDotPlot = new MockDotPlot();
        spyOn(window, 'DotPlot').and.returnValue(mockDotPlot);

        expect($('#top-div').find('div#contents').length).toEqual(1);
        expect($('#top-div').find('div#contents2').length).toEqual(1);

        plotCorral.createDotPlot();

        expect($('#top-div').find('div#contents').length).toEqual(0);
        expect($('#top-div').find('div#contents2').length).toEqual(0);
    });

    it('should clear prexisting stuff before creating a histogram', function () {
        affix("div#top-div div#contents, div#contents2");

        var experiment = new Experiment();

        var plotCorral = new PlotCorral('div#top-div', 1, experiment);

        var mockPlot = new MockHistogramPlot();
        spyOn(window, 'HistogramPlot').and.returnValue(mockPlot);

        expect($('#top-div').find('div#contents').length).toEqual(1);
        expect($('#top-div').find('div#contents2').length).toEqual(1);

        plotCorral.createHistogramPlot();

        expect($('#top-div').find('div#contents').length).toEqual(0);
        expect($('#top-div').find('div#contents2').length).toEqual(0);
    });

    it('should clear all content and put add control in when destroy plot is called', function () {
        affix("div#top-div div#contents, div#contents2");
        var experiment = new Experiment();

        var parentNodeSelector = 'div#top-div';
        var plotCorral = new PlotCorral(parentNodeSelector, 1, experiment);
        var mockDotPlot = new MockDotPlot();
        var mockHistogramPlot = new MockHistogramPlot();

        spyOn(window, 'DotPlot').and.returnValue(mockDotPlot);
        spyOn(window, 'HistogramPlot').and.returnValue(mockHistogramPlot);
        var destroyDotPlotSpy = spyOn(mockDotPlot, 'destroy');
        var destroyHistogramPlotSpy = spyOn(mockHistogramPlot, 'destroy');

        expect($('#top-div').find('div#contents').length).toEqual(1);
        expect($('#top-div').find('div#contents2').length).toEqual(1);
        plotCorral.createDotPlot();
        plotCorral.createHistogramPlot();

        var mockBuilder = new MockPlotControlBuilder();
        spyOn(PlotControlBuilder, 'singleton').and.returnValue(mockBuilder);

        plotCorral.destroyPlot();
        expect(destroyDotPlotSpy).toHaveBeenCalled();
        expect(destroyHistogramPlotSpy).toHaveBeenCalled();
        expect($('#top-div').find('div#contents').length).toEqual(0);
        expect($('#top-div').find('div#contents2').length).toEqual(0);


        expect(mockBuilder.addCreateButtons).toHaveBeenCalledWith(parentNodeSelector, plotCorral);


    });

    function checkPlotModel(arguments) {
        expect(arguments[0].getParentNode()).toEqual('div#canvas1');
        expect(arguments[0].getPlotId()).toEqual('plot1');
        expect(arguments[0].getWidth()).toEqual(300);
        expect(arguments[0].getHeight()).toEqual(300);
    }

    function checkPlotSpec(plotSpec) {
        expect(plotSpec.getXParameter()).toEqual(CH1);
        expect(plotSpec.getYParameter()).toEqual(CH2);
        expect(plotSpec.getXRange()).toEqual(new Range(0, 100));
        expect(plotSpec.getYRange()).toEqual(new Range(0, 100));
    }

    function checkHistogramSpec(histogramSpec) {
        expect(histogramSpec.getXParameter()).toEqual(CH1);
        expect(histogramSpec.getXRange()).toEqual(new Range(0, 100));
        expect(histogramSpec.getNumberOfBins()).toEqual(10);
    }


});