describe("Plot Control Builder", function () {


    it('create set of create buttons', function () {
        affix("div#top-div");

        var plotCorral = new MockPlotCorral();
        PlotControlBuilder.addCreateButtons('div#top-div', plotCorral);
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

        PlotControlBuilder.addDestroyButton('#top-div', plotCorral);
        var destroyButton = $('#top-div').find('button.destroy');
        expect(destroyButton.length).toBeGreaterThan(0);
        expect($(destroyButton).text()).toEqual('x');
        $(destroyButton).click();
        expect(destroySpy).toHaveBeenCalled();
    });

    it('should create a x parameter selector', function () {

        affix("div#top-div");

        var plotSpec = new PlotSpecification();
        plotSpec.setXParameter(CH2);
        PlotControlBuilder.addXParameterSelector('#top-div', plotSpec);
        expect($($('#top-div').find('div.xLabel')).text()).toEqual('X Parameter');
        var xDropdown = $('#top-div').find('select.xParameter');
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
    });

    it('creates an x range setter', function () {
        affix("div#top-div");

        var plotSpec = new PlotSpecification();
        var range = new Range(21, 42);
        plotSpec.setXRange(range);

        PlotControlBuilder.addXRangeSetter('#top-div', plotSpec);

        var xRangeDiv = $($('#top-div').find('div.xRangeSelector'));
        expect($(xRangeDiv.find('div.xRangeLabel')).text()).toEqual('X Range');
        var xMin = $(xRangeDiv.find('input.xRangeMin'));
        var xMax = $(xRangeDiv.find('input.xRangeMax'));
        expect(xMin.val()).toEqual('21');
        expect(xMin.attr('type')).toEqual('text');
        expect(xMax.val()).toEqual('42');
        expect(xMax.attr('type')).toEqual('text');

        var setXRangeButton = $($(xRangeDiv).find('button.setXRange'));
        expect(setXRangeButton.text()).toEqual('Set X Range');
        xMin.val(69);
        xMax.val(290);

        setXRangeButton.click();

        expect(new Range(69, 290)).toEqual(plotSpec.getXRange());
    })

    it('creates an y range setter', function () {
        affix("div#top-div");

        var plotSpec = new PlotSpecification();
        var range = new Range(221, 442);
        plotSpec.setYRange(range);

        PlotControlBuilder.addYRangeSetter('#top-div', plotSpec);

        var yRangeDiv = $($('#top-div').find('div.yRangeSelector'));
        expect($(yRangeDiv.find('div.yRangeLabel')).text()).toEqual('Y Range');
        var yMin = $(yRangeDiv.find('input.yRangeMin'));
        var yMax = $(yRangeDiv.find('input.yRangeMax'));
        expect(yMin.val()).toEqual('221');
        expect(yMin.attr('type')).toEqual('text');
        expect(yMax.val()).toEqual('442');
        expect(yMax.attr('type')).toEqual('text');

        var setYRangeButton = $($(yRangeDiv).find('button.setYRange'));
        expect(setYRangeButton.text()).toEqual('Set Y Range');
        yMin.val(69);
        yMax.val(290);

        setYRangeButton.click();

        expect(new Range(69, 290)).toEqual(plotSpec.getYRange());
    })
    it('should create a y parameter selector', function () {

        affix("div#top-div");


        var plotSpec = new PlotSpecification();
        plotSpec.setYParameter(CH4);
        PlotControlBuilder.addYParameterSelector('#top-div', plotSpec);
        expect($($('#top-div').find('div.yLabel')).text()).toEqual('Y Parameter');
        var yDropdown = $('#top-div').find('select.yParameter');
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
    });


    it('creates a bin setter', function () {
        targetDiv = affix("div#top-div");
        var spec = new HistogramSpecification(CH1, new Range(0,1), 15);
        PlotControlBuilder.addBinSetter('#top-div', spec);
        expect($('#top-div').find('div.numberOfBinsLabel').text()).toEqual('Number of Bins');
        var binInput = $('#top-div').find('input.numberOfBins');
        expect($(binInput).attr('type')).toEqual('text');
        expect($(binInput).val()).toEqual('' + spec.getNumberOfBins());
        $(binInput).val('24');
        $(binInput).blur();
        expect(spec.getNumberOfBins()).toEqual(24);
    });

    });