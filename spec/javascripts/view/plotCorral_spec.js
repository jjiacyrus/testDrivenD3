describe("Plot Corral", function () {

    function checkPlotModel(arguments) {
        expect(arguments[0].getParentNode()).toEqual('div#canvas1');
        expect(arguments[0].getPlotId()).toEqual('plot1');
        expect(arguments[0].getWidth()).toEqual(300);
        expect(arguments[0].getHeight()).toEqual(300);
    }

    function checkPlotSpec(arguments) {
        expect(arguments[1].getXParameter()).toEqual(CH1);
        expect(arguments[1].getYParameter()).toEqual(CH2);
        expect(arguments[1].getXRange()).toEqual(new Range(0, 100));
        expect(arguments[1].getYRange()).toEqual(new Range(0, 100));
    }
    function checkHistogramSpec(arguments){
        expect(arguments[1].getXParameter()).toEqual(CH1);
        expect(arguments[1].getXRange()).toEqual(new Range(0, 100));
        expect(arguments[1].getNumberOfBins()).toEqual(10);
    }
    it('should create the set of create buttons on construction', function(){
        affix("div#top-div");

        var experiment = new Experiment();
        var plotCorral = new PlotCorral('div#top-div', 1, experiment);

        var createDotPlotButton = $('#top-div').find('div.createButtons button.createDotPlot');
        expect(createDotPlotButton.length).toBeGreaterThan(0);
        expect($(createDotPlotButton).text()).toEqual('D');
        var createDotPlotSpy = spyOn(plotCorral, 'createDotPlot');

        $(createDotPlotButton).click();
        expect(createDotPlotSpy).toHaveBeenCalled();


        var createHistogramPlotButton = $('#top-div').find('div.createButtons button.createHistogramPlot');
        expect(createHistogramPlotButton.length).toBeGreaterThan(0);
        expect($(createHistogramPlotButton).text()).toEqual('H');

        var createHistogramPlotSpy = spyOn(plotCorral, 'createHistogramPlot');
        $(createHistogramPlotButton).click();

        expect(createHistogramPlotSpy).toHaveBeenCalled();
    })

    it('should create a dot plot, and some controls inside the on create dot plot', function () {
        affix("div#top-div");

        var experiment = new Experiment();
        var plotCorral = new PlotCorral('div#top-div', 1, experiment);
        var destroySpy = spyOn(plotCorral, 'destroyPlot');
        var mockDotPlot = new MockDotPlot();
        var dotPlotConstructorSpy = spyOn(window, 'DotPlot').and.returnValue(mockDotPlot);

        plotCorral.createDotPlot();

        expect(dotPlotConstructorSpy.calls.count()).toEqual(1);
        var arguments = dotPlotConstructorSpy.calls.argsFor(0);

        checkPlotModel(arguments);
        checkPlotSpec(arguments);
        expect(arguments[2]).toEqual(experiment);
        expect($('#top-div').find('div#canvas1').length).toBeGreaterThan(0);
        expect(mockDotPlot.renderCalled).toBeTruthy();
        var destroyButton = $('#top-div').find('button.destroy');
        expect(destroyButton.length).toBeGreaterThan(0);
        expect($(destroyButton).text()).toEqual('x');
        $(destroyButton).click();
        expect(destroySpy).toHaveBeenCalled();
    });


    it('should create a histogram plot, and some controls inside the on create histogram', function () {
        affix("div#top-div");

        var experiment = new Experiment();
        var plotCorral = new PlotCorral('div#top-div', 1, experiment);
        var destroySpy = spyOn(plotCorral, 'destroyPlot');
        var mockHistogram = new MockHistogramPlot();
        var constructorSpy = spyOn(window, 'HistogramPlot').and.returnValue(mockHistogram);

        plotCorral.createHistogramPlot();

        expect(constructorSpy.calls.count()).toEqual(1);
        var arguments = constructorSpy.calls.argsFor(0);

        checkPlotModel(arguments);
        checkHistogramSpec(arguments);
        expect(arguments[2]).toEqual(experiment);
        expect($('#top-div').find('div#canvas1').length).toBeGreaterThan(0);
        expect(mockHistogram.renderCalled).toBeTruthy();
        var destroyButton = $('#top-div').find('button.destroy');
        expect(destroyButton.length).toBeGreaterThan(0);
        expect($(destroyButton).text()).toEqual('x');
        $(destroyButton).click();
        expect(destroySpy).toHaveBeenCalled();
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

        var plotCorral = new PlotCorral('div#top-div', 1, experiment);
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

        plotCorral.destroyPlot();
        expect(destroyDotPlotSpy).toHaveBeenCalled();
        expect(destroyHistogramPlotSpy).toHaveBeenCalled();
        expect($('#top-div').find('div#contents').length).toEqual(0);
        expect($('#top-div').find('div#contents2').length).toEqual(0);


        var createDotPlotButton = $('#top-div').find('div.createButtons button.createDotPlot');
        expect(createDotPlotButton.length).toBeGreaterThan(0);
        expect($(createDotPlotButton).text()).toEqual('D');
        var createDotPlotSpy = spyOn(plotCorral, 'createDotPlot');

        $(createDotPlotButton).click();
        expect(createDotPlotSpy).toHaveBeenCalled();


        var createHistogramPlotButton = $('#top-div').find('div.createButtons button.createHistogramPlot');
        expect(createHistogramPlotButton.length).toBeGreaterThan(0);
        expect($(createHistogramPlotButton).text()).toEqual('H');

        var createHistogramPlotSpy = spyOn(plotCorral, 'createHistogramPlot');
        $(createHistogramPlotButton).click();

        expect(createHistogramPlotSpy).toHaveBeenCalled();

    });
    it('create parameter selectors on create dot plot', function () {
        targetDiv = affix("div#top-div");

        spyOn(window, 'DotPlot').and.returnValue(new MockDotPlot());
        var plotSpec = new PlotSpecification(CH1, CH2, new Range(0, 1), new Range(0, 1));
        spyOn(window, 'PlotSpecification').and.returnValue(plotSpec);
        var experiment = new Experiment();

        var parentNode = 'div#top-div';
        var plotCorral = new PlotCorral(parentNode, 1, experiment);
        plotCorral.createDotPlot();

        var controlDiv = $('#top-div').find('div.controls');
        expect(controlDiv.length).toBeGreaterThan(0);

        checkXParameterSelector(controlDiv);
        checkYParameterSelector(controlDiv);
        $('select.xParameter>option:eq(3)').prop('selected', true);
        $('select.xParameter').change();

        expect(plotSpec.getXParameter()).toEqual(CH4);


        $('select.yParameter>option:eq(0)').prop('selected', true);
        $('select.yParameter').change();

        expect(plotSpec.getYParameter()).toEqual(CH1);
    });
    it('create parameter selectors on create histogram plot', function () {
        targetDiv = affix("div#top-div");

        spyOn(window, 'HistogramPlot').and.returnValue(new MockHistogramPlot());
        var spec = new HistogramSpecification(CH1, new Range(0,1), 24);
        spyOn(window, 'HistogramSpecification').and.returnValue(spec);
        var experiment = new Experiment();

        var parentNode = 'div#top-div';
        var plotCorral = new PlotCorral(parentNode, 1, experiment);
        plotCorral.createHistogramPlot();

        var controlDiv = $('#top-div').find('div.controls');
        expect(controlDiv.length).toBeGreaterThan(0);

        checkXParameterSelector(controlDiv);
        $('select.xParameter>option:eq(3)').prop('selected', true);
        $('select.xParameter').change();

        expect(spec.getXParameter()).toEqual(CH4);

    });
    function checkXParameterSelector(controlDiv) {
        var xDropdown = controlDiv.find('select.xParameter');
        expect(xDropdown.length).toBeGreaterThan(0);

        var xOptions = xDropdown.find('option');
        expect(xOptions.length).toEqual(4);
        expect($(xOptions[0]).attr('value')).toEqual('CH1');
        expect($(xOptions[0]).text()).toEqual('CH1');
        expect($(xOptions[1]).attr('value')).toEqual('CH2');
        expect($(xOptions[1]).text()).toEqual('CH2');
        expect($(xOptions[2]).attr('value')).toEqual('CH3');
        expect($(xOptions[2]).text()).toEqual('CH3');
        expect($(xOptions[3]).attr('value')).toEqual('CH4');
        expect($(xOptions[3]).text()).toEqual('CH4');
        expect(xDropdown.find('option:selected').text()).toEqual('CH1');
    }

    function checkYParameterSelector(controlDiv) {
        var yDropdown = controlDiv.find('select.yParameter');
        expect(yDropdown.length).toBeGreaterThan(0);

        var yOptions = yDropdown.find('option');
        expect(yOptions.length).toEqual(4);
        expect($(yOptions[0]).attr('value')).toEqual('CH1');
        expect($(yOptions[0]).text()).toEqual('CH1');
        expect($(yOptions[1]).attr('value')).toEqual('CH2');
        expect($(yOptions[1]).text()).toEqual('CH2');
        expect($(yOptions[2]).attr('value')).toEqual('CH3');
        expect($(yOptions[2]).text()).toEqual('CH3');
        expect($(yOptions[3]).attr('value')).toEqual('CH4');
        expect($(yOptions[3]).text()).toEqual('CH4');
        expect(yDropdown.find('option:selected').text()).toEqual('CH2');

    }

});