describe("Plot Control Builder", function () {


    it('create set of create buttons', function () {
        affix("div#top-div");

        var plotCorral = new MockPlotCorral();
        PlotControlBuilder.singleton().addCreateButtons('div#top-div', plotCorral);
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

    it('should create a destroy button', function () {

        affix("div#top-div");

        var plotCorral = new MockPlotCorral();
        var destroySpy = spyOn(plotCorral, 'destroyPlot');

        PlotControlBuilder.singleton().addDestroyButton('#top-div', plotCorral);
        var destroyButton = $('#top-div').find('button.destroy');
        expect(destroyButton.length).toBeGreaterThan(0);
        expect($(destroyButton).text()).toEqual('x');
        $(destroyButton).click();
        expect(destroySpy).toHaveBeenCalled();
    });


    it('should be able to create a dot plot set of controls', function () {

        affix("div#top-div");
        var plotSpec = new PlotSpecification(CH1, CH2, new Range(2, 100), new Range(5, 170));

        var parentSelector = 'div#top-div';
        PlotControlBuilder.singleton().addDotPlotControls(parentSelector, plotSpec);
        checkEditSpecsButton(parentSelector);
        var controlsDiv = $('#top-div').find('div.controls');
        expect($(controlsDiv).attr('style')).toEqual('display:none');
        expect(controlsDiv.length).toBeGreaterThan(0);

        var controlsSelector = parentSelector + ' div.controls';
        checkXParameterSelector(controlsSelector, plotSpec);
        checkXScaleSelector(controlsSelector, plotSpec);
        checkYParameterSelector(controlsSelector, plotSpec);
        checkYScaleSelector(controlsSelector, plotSpec);
        checkXRangeControls(controlsSelector, plotSpec);
        checkYRangeControls(controlsSelector, plotSpec);


    });
    it('should be able to create a histogram plot set of controls', function () {

        affix("div#top-div");
        var histogramSpec = new HistogramSpecification(CH1, new Range(5, 170), 125);

        var parentSelector = 'div#top-div';
        PlotControlBuilder.singleton().addHistogramControls(parentSelector, histogramSpec);
        checkEditSpecsButton(parentSelector);

        var controlsDiv = $('#top-div').find('div.controls');
        expect($(controlsDiv).attr('style')).toEqual('display:none');
        expect(controlsDiv.length).toBeGreaterThan(0);

        var controlsSelector = parentSelector + ' div.controls';
        checkXParameterSelector(controlsSelector, histogramSpec);
        checkXScaleSelector(controlsSelector, histogramSpec);
        checkXRangeControls(controlsSelector, histogramSpec);

        checkBinSetterControls(controlsSelector, histogramSpec);
    });

    function checkEditSpecsButton(parentSelector) {
        var editSpec = $('#top-div').find('button.editSpecification');
        var hideControls = $('#top-div').find('button.hideControls');

        expect(editSpec.length).toBeGreaterThan(0);
        expect($(editSpec).text()).toEqual('Change Specification');

        expect(hideControls.length).toBeGreaterThan(0);
        expect($(hideControls).text()).toEqual('Hide Controls');
        expect($(hideControls).attr('style')).toEqual('display:none');

        var slideDownSpy = spyOn($.fn, 'slideDown');
        var slideUpSpy = spyOn($.fn, 'slideUp');
        var hideSpy = spyOn($.fn, 'hide');
        var showSpy = spyOn($.fn, 'show');

        $(editSpec).click();
        expect(slideDownSpy.calls.count()).toEqual(1);
        expect(slideDownSpy.calls.mostRecent().object.selector).toEqual(parentSelector + ' div.controls');

        expect(hideSpy.calls.count()).toEqual(1);
        expect(hideSpy.calls.mostRecent().object.selector).toEqual(parentSelector + ' button.editSpecification');

        expect(showSpy.calls.count()).toEqual(1);
        expect(showSpy.calls.mostRecent().object.selector).toEqual(parentSelector + ' button.hideControls');

        $(hideControls).click();

        expect(slideUpSpy.calls.count()).toEqual(1);
        expect(slideUpSpy.calls.mostRecent().object.selector).toEqual(parentSelector + ' div.controls');

        expect(hideSpy.calls.count()).toEqual(2);
        expect(hideSpy.calls.mostRecent().object.selector).toEqual(parentSelector + ' button.hideControls');

        expect(showSpy.calls.count()).toEqual(2);
        expect(showSpy.calls.mostRecent().object.selector).toEqual(parentSelector + ' button.editSpecification');
    }

    function checkXParameterSelector(parentNode, plotSpec) {
        expect($($(parentNode).find('div.xLabel')).text()).toEqual('X Parameter');
        var xDropdown = $(parentNode).find('select.xParameter');
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
        expect(xDropdown.find('option:selected').text()).toEqual(plotSpec.getXParameter());
        $('select.xParameter>option:eq(3)').prop('selected', true);
        $('select.xParameter').change();
        expect(plotSpec.getXParameter()).toEqual(CH4);
    }


    function checkXScaleSelector(parentNode, plotSpec) {
        var xDropdown = $(parentNode).find('select.xScale');
        expect(xDropdown.length).toBeGreaterThan(0);
        var xOptions = xDropdown.find('option');
        expect(xOptions.length).toEqual(2);
        expect($(xOptions[0]).attr('value')).toEqual(LIN);
        expect($(xOptions[0]).text()).toEqual('Linear');
        expect($(xOptions[1]).attr('value')).toEqual(LOG);
        expect($(xOptions[1]).text()).toEqual('Log');
        expect(xDropdown.find('option:selected').attr('value')).toEqual(plotSpec.getXScale());
        $('select.xScale>option:eq(0)').prop('selected', true);
        $('select.xScale').change();
        expect(plotSpec.getXScale()).toEqual(LIN);
    }

    function checkYParameterSelector(parentNode, plotSpec) {
        expect($($(parentNode).find('div.yLabel')).text()).toEqual('Y Parameter');
        var yDropdown = $(parentNode).find('select.yParameter');
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
        expect(yDropdown.find('option:selected').text()).toEqual(plotSpec.getYParameter());
        $('select.yParameter>option:eq(0)').prop('selected', true);
        $('select.yParameter').change();
        expect(plotSpec.getYParameter()).toEqual(CH1);
    }


    function checkYScaleSelector(parentNode, plotSpec) {
        var yDropdown = $(parentNode).find('select.yScale');
        expect(yDropdown.length).toBeGreaterThan(0);
        var yOptions = yDropdown.find('option');
        expect(yOptions.length).toEqual(2);
        expect($(yOptions[0]).attr('value')).toEqual(LIN);
        expect($(yOptions[0]).text()).toEqual('Linear');
        expect($(yOptions[1]).attr('value')).toEqual(LOG);
        expect($(yOptions[1]).text()).toEqual('Log');
        expect(yDropdown.find('option:selected').attr('value')).toEqual(plotSpec.getYScale());
        $('select.yScale>option:eq(0)').prop('selected', true);
        $('select.yScale').change();
        expect(plotSpec.getYScale()).toEqual(LIN);
    }

    function checkXRangeControls(parentNode, plotSpec) {
        var xRangeDiv = $($(parentNode).find('div.xRangeSelector'));
        expect($(xRangeDiv.find('div.xRangeLabel')).text()).toEqual('X Range');
        var xMin = $(xRangeDiv.find('input.xRangeMin'));
        var xMax = $(xRangeDiv.find('input.xRangeMax'));
        expect(xMin.val()).toEqual(plotSpec.getXRange().min + '');
        expect(xMin.attr('type')).toEqual('text');
        expect(xMax.val()).toEqual(plotSpec.getXRange().max + '');
        expect(xMax.attr('type')).toEqual('text');

        var setXRangeButton = $($(xRangeDiv).find('button.setXRange'));
        expect(setXRangeButton.text()).toEqual('Set X Range');
        xMin.val(69);
        xMax.val(290);

        setXRangeButton.click();

        expect(new Range(69, 290)).toEqual(plotSpec.getXRange());
    }

    function checkYRangeControls(parentNode, plotSpec) {
        var yRangeDiv = $($(parentNode).find('div.yRangeSelector'));
        expect($(yRangeDiv.find('div.yRangeLabel')).text()).toEqual('Y Range');
        var yMin = $(yRangeDiv.find('input.yRangeMin'));
        var yMax = $(yRangeDiv.find('input.yRangeMax'));
        expect(yMin.val()).toEqual(plotSpec.getYRange().min + '');
        expect(yMin.attr('type')).toEqual('text');
        expect(yMax.val()).toEqual(plotSpec.getYRange().max + '');
        expect(yMax.attr('type')).toEqual('text');

        var setYRangeButton = $($(yRangeDiv).find('button.setYRange'));
        expect(setYRangeButton.text()).toEqual('Set Y Range');
        yMin.val(69);
        yMax.val(290);

        setYRangeButton.click();

        expect(new Range(69, 290)).toEqual(plotSpec.getYRange());
    }


    function checkBinSetterControls(parentNode, spec) {
        expect($(parentNode).find('div.numberOfBinsLabel').text()).toEqual('Number of Bins');
        var binInput = $(parentNode).find('input.numberOfBins');
        expect($(binInput).attr('type')).toEqual('text');
        expect($(binInput).val()).toEqual('' + spec.getNumberOfBins());
        $(binInput).val('24');
        $(binInput).blur();
        expect(spec.getNumberOfBins()).toEqual(24);
    }

});