function PlotCorral(parentNode, corralNumber, experiment) {
    var dotPlot;
    var histogramPlot;
    PlotControlBuilder.addCreateButtons(parentNode, this);

    this.createDotPlot = function () {

        $(parentNode).empty();

        PlotControlBuilder.addDestroyButton(parentNode, this);
        $(parentNode).append("<div class='canvas' id='canvas" + corralNumber + "'></div>");

        var plotModel = new PlotModel("div#canvas" + corralNumber, "plot" + corralNumber, 300, 300);
        var plotSpec = new PlotSpecification(CH1, CH2, new Range(0, 100), new Range(0, 100));
        dotPlot = new DotPlot(plotModel, plotSpec, experiment);
        dotPlot.renderPlot();

        $(parentNode).append("<div class='controls'></div>");
        var controlNode = parentNode + ' div.controls';
        PlotControlBuilder.addXParameterSelector(controlNode, plotSpec);
        PlotControlBuilder.addXScaleSelector(controlNode, plotSpec);
        PlotControlBuilder.addYParameterSelector(controlNode, plotSpec);
        PlotControlBuilder.addYScaleSelector(controlNode, plotSpec);
        PlotControlBuilder.addXRangeSetter(controlNode, plotSpec);
        PlotControlBuilder.addYRangeSetter(controlNode, plotSpec);


    }

    this.createHistogramPlot = function () {
        $(parentNode).empty();

        PlotControlBuilder.addDestroyButton(parentNode, this);
        $(parentNode).append("<div class='canvas' id='canvas" + corralNumber + "'></div>");

        var plotModel = new PlotModel("div#canvas" + corralNumber, "plot" + corralNumber, 300, 300);
        var plotSpec = new HistogramSpecification(CH1, new Range(0, 100), 10);
        histogramPlot = new HistogramPlot(plotModel, plotSpec, experiment);
        histogramPlot.renderPlot();
        $(parentNode).append("<div class='controls'></div>");
        var controlsNode = parentNode + ' div.controls';
        PlotControlBuilder.addXParameterSelector(controlsNode, plotSpec);
        PlotControlBuilder.addBinSetter(controlsNode, plotSpec);
        PlotControlBuilder.addXRangeSetter(controlsNode, plotSpec);

    }


    this.destroyPlot = function () {
        if (dotPlot != undefined) {

            dotPlot.destroy();
            dotPlot = undefined;
        }
        if (histogramPlot != undefined) {
            histogramPlot.destroy();
            histogramPlot = undefined;
        }
        $(parentNode).empty();
        PlotControlBuilder.addCreateButtons(parentNode,this);
    }
}