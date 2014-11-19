function PlotCorral(parentNode, corralNumber, experiment) {
    var dotPlot;
    var histogramPlot;
    PlotControlBuilder.singleton().addCreateButtons(parentNode, this);

    this.createDotPlot = function () {

        $(parentNode).empty();

        PlotControlBuilder.singleton().addDestroyButton(parentNode, this);
        $(parentNode).append("<div class='canvas' id='canvas" + corralNumber + "'></div>");

        var plotModel = new PlotModel("div#canvas" + corralNumber, "plot" + corralNumber, 300, 300);
        var plotSpec = new PlotSpecification(CH1, CH2, new Range(0, 100), new Range(0, 100));
        dotPlot = new DotPlot(plotModel, plotSpec, experiment);
        dotPlot.renderPlot();
        PlotControlBuilder.singleton().addDotPlotControls(parentNode, plotSpec);
    }

    this.createHistogramPlot = function () {
        $(parentNode).empty();

        PlotControlBuilder.singleton().addDestroyButton(parentNode, this);
        $(parentNode).append("<div class='canvas' id='canvas" + corralNumber + "'></div>");

        var plotModel = new PlotModel("div#canvas" + corralNumber, "plot" + corralNumber, 300, 300);
        var plotSpec = new HistogramSpecification(CH1, new Range(0, 100), 10);
        histogramPlot = new HistogramPlot(plotModel, plotSpec, experiment);
        histogramPlot.renderPlot();
        PlotControlBuilder.singleton().addHistogramControls(parentNode, plotSpec);

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
        PlotControlBuilder.singleton().addCreateButtons(parentNode,this);
    }
}