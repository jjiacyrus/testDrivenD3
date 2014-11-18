function DotPlot(plotModel, plotSpec, experiment) {
    plotSpec.addObserver(this);
    experiment.addObserver(this);

    this.renderPlot = function () {
        var height = plotModel.getHeight();
        var width = plotModel.getWidth();
        var xRightPadding = 65;
        var yBottomPadding = 10;
        var yTopPadding = 30;
        var yHeight = height - yTopPadding;

        var xScale = buildLinearXScale(new Range(0, width - xRightPadding), plotSpec.getXRange());
        var yScale = buildLinearYScale(new Range(yBottomPadding, yHeight), plotSpec.getYRange());

        var xAxisOffset = 50;
        var canvas = renderCanvas(plotModel.getParentNode(), plotModel.getPlotId(), width, height);

        renderAxes(canvas, xScale, yScale, xAxisOffset, yHeight);
        renderPlotData(canvas, experiment.getCurrentDataset(), plotSpec, xScale, yScale, xAxisOffset);
    }

    this.specificationChanged = function () {
        clearGraphic();
        this.renderPlot();
    }
    this.datasetChanged = function () {
        clearGraphic();
        this.renderPlot();
    }

    this.destroy = function(){
        clearGraphic();
        plotSpec.removeObserver(this);
        experiment.removeObserver(this);
    }

    function renderAxes(canvas, xScale, yScale, xAxisOffset, yHeight) {
        renderXAxis(canvas, xScale, xAxisOffset, yHeight);
        renderYAxis(canvas, yScale, xAxisOffset, 0);
    }

    function getChannelData(dataSet, parameter) {
        if (parameter == CH1) {
            return dataSet.getChannel1();
        }
        if (parameter == CH2) {
            return dataSet.getChannel2();
        }
        if (parameter == CH3) {
            return dataSet.getChannel3();
        }
        return dataSet.getChannel4();
    }

    function renderPlotData(canvas, dataSet, plotSpec, xScale, yScale, xAxisOffset) {
        var xChannelData = getChannelData(dataSet, plotSpec.getXParameter());
        var yChannelData = getChannelData(dataSet, plotSpec.getYParameter());
        var formattedData = formatData(xChannelData, yChannelData, xScale, yScale, plotSpec.getXRange(), plotSpec.getYRange());
        renderScatterPlotData(canvas, formattedData, xAxisOffset, 0);
    }


    function clearGraphic() {
        d3.select('svg#' + plotModel.getPlotId()).remove();
    }

}