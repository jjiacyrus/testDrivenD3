function DotPlot(plotModel, plotSpec, experiment) {
    plotSpec.addObserver(this);
    experiment.addObserver(this);

    function buildXScale(plotSpec, width, xRightPadding) {
        if(plotSpec.getXScale() == LOG){
            return D3Helper.buildLogXScale(new Range(0, width - xRightPadding), plotSpec.getXRange());
        }
        return D3Helper.buildLinearXScale(new Range(0, width - xRightPadding), plotSpec.getXRange());
    }

    function buildYScale(plotSpec, yBottomPadding, yHeight) {
        if(plotSpec.getYScale() == LOG){
            return D3Helper.buildLogYScale(new Range(yBottomPadding, yHeight), plotSpec.getYRange());
        }
        return D3Helper.buildLinearYScale(new Range(yBottomPadding, yHeight), plotSpec.getYRange());
    }

    this.renderPlot = function () {
        var height = plotModel.getHeight();
        var width = plotModel.getWidth();
        var xRightPadding = 65;
        var yBottomPadding = 10;
        var yTopPadding = 30;
        var yHeight = height - yTopPadding;

        var xScale = buildXScale(plotSpec,width, xRightPadding);
        var yScale = buildYScale(plotSpec, yBottomPadding, yHeight);

        var xAxisOffset = 50;
        var canvas = D3Helper.renderCanvas(plotModel.getParentNode(), plotModel.getPlotId(), width, height);

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
        D3Helper.renderXAxis(canvas, xScale, xAxisOffset, yHeight);
        D3Helper.renderYAxis(canvas, yScale, xAxisOffset, 0);
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
        var formattedData = DotPlotHelper.formatData(xChannelData, yChannelData, xScale, yScale, plotSpec.getXRange(), plotSpec.getYRange());
        DotPlotHelper.renderScatterPlotData(canvas, formattedData, xAxisOffset, 0);
    }


    function clearGraphic() {
        d3.select('svg#' + plotModel.getPlotId()).remove();
    }

}