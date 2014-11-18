function HistogramPlot(plotModel, histogramSpec, experiment) {
    histogramSpec.addObserver(this);
    experiment.addObserver(this);

    this.renderPlot = function () {
        var height = plotModel.getHeight();
        var width = plotModel.getWidth();
        var xRightPadding = 65;
        var yBottomPadding = 10;
        var yTopPadding = 30;
        var yHeight = height - yTopPadding;

        var xScale = buildLinearXScale(new Range(0, width - xRightPadding), histogramSpec.getXRange());

        var channelData = getChannelData(experiment.getCurrentDataset(), histogramSpec.getXParameter());
        var binnedData = binData(channelData, xScale, histogramSpec.getNumberOfBins());

        var yScale = buildLinearYScale(new Range(yBottomPadding, yHeight), new Range(0, Math.floor(d3.max(binnedData, function (d) {
            return d.y;
        }) * 1.1)));

        var xAxisOffset = 50;
        var canvas = renderCanvas(plotModel.getParentNode(), plotModel.getPlotId(), width, height);
        renderAxes(canvas, xScale, xAxisOffset, yHeight, yScale);
        var scaledBinnedData = scaleBinnedData(binnedData, xScale, yScale);
        renderHistogramData(canvas, scaledBinnedData, xAxisOffset, 0, yHeight);
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
        histogramSpec.removeObserver(this);
        experiment.removeObserver(this);
    }

    function clearGraphic() {
        d3.select('svg#' + plotModel.getPlotId()).remove();
    }

    function renderAxes(canvas, xScale, xAxisOffset, yHeight, yScale) {
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
}