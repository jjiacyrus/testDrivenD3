function PlotControlBuilder() {

}
PlotControlBuilder.singleton = (function () {

    var determineParameterSelection = function (channel, plotSpecChannel) {
        if (plotSpecChannel == channel) {
            return ' selected';
        }
        return '';
    }

    var determineScaleSelection = function (scale, plotScale) {
        if (plotScale == scale) {
            return ' selected';
        }
        return '';
    }

    var addXParameterSelector = function (parentNode, plotSpec) {
        $(parentNode).append("<div class='xLabel'>X Parameter</div>");

        var xDropdownNode = parentNode + ' select.xParameter';
        $(parentNode).append("<select class='xParameter'></select>");
        $(xDropdownNode).on('change', function () {
            plotSpec.setXParameter($(xDropdownNode + ' option:selected').val());

        });

        var currentXParameter = plotSpec.getXParameter();
        $(xDropdownNode).append("<option value=" + CH1 + determineParameterSelection(CH1, currentXParameter) + ">" + CH1 + "</option>");
        $(xDropdownNode).append("<option value=" + CH2 + determineParameterSelection(CH2, currentXParameter) + ">" + CH2 + "</option>");
        $(xDropdownNode).append("<option value=" + CH3 + determineParameterSelection(CH3, currentXParameter) + ">" + CH3 + "</option>");
        $(xDropdownNode).append("<option value=" + CH4 + determineParameterSelection(CH4, currentXParameter) + ">" + CH4 + "</option>");
    }
    var addXScaleSelector = function (parentNode, plotSpec) {
        var xDropdownNode = parentNode + ' select.xScale';
        $(parentNode).append("<select class='xScale'></select>");
        $(xDropdownNode).on('change', function () {
            plotSpec.setXScale($(xDropdownNode + ' option:selected').val());

        });
        $(xDropdownNode).append("<option value=" + LIN + determineScaleSelection(LIN, plotSpec.getXScale()) + ">Linear</option>");
        $(xDropdownNode).append("<option value=" + LOG + determineScaleSelection(LOG, plotSpec.getXScale()) + ">Log</option>");
    }
    var addYScaleSelector = function (parentNode, plotSpec) {
        var yDropdownNode = parentNode + ' select.yScale';
        $(parentNode).append("<select class='yScale'></select>");
        $(yDropdownNode).on('change', function () {
            plotSpec.setYScale($(yDropdownNode + ' option:selected').val());

        });
        $(yDropdownNode).append("<option value=" + LIN + determineScaleSelection(LIN, plotSpec.getYScale()) + ">Linear</option>");
        $(yDropdownNode).append("<option value=" + LOG + determineScaleSelection(LOG, plotSpec.getYScale()) + ">Log</option>");
    }
    var addXRangeSetter = function (parentDiv, plotSpec) {
        $(parentDiv).append("<div class='xRangeSelector'></div>");
        var rangeSelectorDiv = $(parentDiv + ' div.xRangeSelector');
        rangeSelectorDiv.append("<div class='xRangeLabel'>X Range</div>")
        rangeSelectorDiv.append("<input class='xRangeMin' type='text' value='" + plotSpec.getXRange().min + "'>")
        rangeSelectorDiv.append("<input class='xRangeMax' type='text' value='" + plotSpec.getXRange().max + "'>")
        rangeSelectorDiv.append("<button class='setXRange'>Set X Range</button>");
        var xMin = $(parentDiv + " div.xRangeSelector input.xRangeMin");
        var xMax = $(parentDiv + " div.xRangeSelector input.xRangeMax");
        $(parentDiv + " div.xRangeSelector button.setXRange").on('click', function () {
            plotSpec.setXRange(new Range(parseInt(xMin.val()), parseInt(xMax.val())));
        });
    }
    var addYRangeSetter = function (parentNode, plotSpec) {
        $(parentNode).append("<div class='yRangeSelector'></div>");
        var rangeSelectorDiv = $(parentNode + ' div.yRangeSelector');
        rangeSelectorDiv.append("<div class='yRangeLabel'>Y Range</div>");
        rangeSelectorDiv.append("<input class='yRangeMin' type='text' value='" + plotSpec.getYRange().min + "'>");
        rangeSelectorDiv.append("<input class='yRangeMax' type='text' value='" + plotSpec.getYRange().max + "'>");
        rangeSelectorDiv.append("<button class='setYRange'>Set Y Range</button>");
        var yMin = $(parentNode + " div.yRangeSelector input.yRangeMin");
        var yMax = $(parentNode + " div.yRangeSelector input.yRangeMax");
        $(parentNode + " div.yRangeSelector button.setYRange").on('click', function () {
            plotSpec.setYRange(new Range(parseInt(yMin.val()), parseInt(yMax.val())));
        });
    }
    var addYParameterSelector = function (parentNode, plotSpec) {
        $(parentNode).append("<div class='yLabel'>Y Parameter</div>");

        var yDropdownNode = parentNode + ' select.yParameter';
        $(parentNode).append("<select class='yParameter'></select>");
        $(yDropdownNode).on('change', function () {
            plotSpec.setYParameter($(yDropdownNode + ' option:selected').val());

        });

        var currentYParameter = plotSpec.getYParameter();
        $(yDropdownNode).append("<option value=" + CH1 + determineParameterSelection(CH1, currentYParameter) + ">" + CH1 + "</option>");
        $(yDropdownNode).append("<option value=" + CH2 + determineParameterSelection(CH2, currentYParameter) + ">" + CH2 + "</option>");
        $(yDropdownNode).append("<option value=" + CH3 + determineParameterSelection(CH3, currentYParameter) + ">" + CH3 + "</option>");
        $(yDropdownNode).append("<option value=" + CH4 + determineParameterSelection(CH4, currentYParameter) + ">" + CH4 + "</option>");

    }

    var addBinSetter = function (parentNode, histogramSpec) {
        $(parentNode).append("<div class='numberOfBinsLabel'>Number of Bins</div>")
        $(parentNode).append("<input class='numberOfBins' type='text' value='" + histogramSpec.getNumberOfBins() + "'>")
        $(parentNode + ' input.numberOfBins').on('blur', function () {
            histogramSpec.setNumberOfBins(parseInt($(parentNode + ' input.numberOfBins').val()));
        });
    }

    var addEditSpecsButton = function(parentNode) {
        $(parentNode).append("<button class='editSpecification'>Change Specification</button>");
        $(parentNode).append("<button class='hideControls' style='display:none'>Hide Controls</button>");
        $(parentNode + " button.editSpecification").on('click', function(){
            $(parentNode + " div.controls").slideDown();
            $(parentNode +" button.editSpecification").hide();
            $(parentNode + " button.hideControls").show();
        });

        $(parentNode + " button.hideControls").on('click', function(){
            $(parentNode + " div.controls").slideUp();
            $(parentNode +" button.hideControls").hide();
            $(parentNode + " button.editSpecification").show();
        });
    }

    return {
        addCreateButtons: function
            (parentNode, plotCorral) {
            $(parentNode).append("<div class='createButtons'></div>");
            var createButtonsSelector = parentNode + ' div.createButtons';
            $(createButtonsSelector).append("<button class='createDotPlot'>D</button>");
            $(createButtonsSelector + ' button.createDotPlot').on('click', function () {
                plotCorral.createDotPlot();
            })

            $(createButtonsSelector).append("<button class='createHistogramPlot'>H</button>");
            $(createButtonsSelector + ' button.createHistogramPlot').on('click', function () {
                plotCorral.createHistogramPlot();
            })
        },

        addDestroyButton: function (parentNode, plotCorral) {
            $(parentNode).append("<button class='destroy'>x</button>");
            $(parentNode + ' button.destroy').on('click', function () {
                plotCorral.destroyPlot();
            })
        },

        addDotPlotControls: function (parentNode, plotSpec) {

            addEditSpecsButton(parentNode);
            $(parentNode).append("<div class='controls' style='display:none'></div>");
            var controlsNodeSelector = parentNode + " div.controls";
            addXParameterSelector(controlsNodeSelector, plotSpec);
            addXScaleSelector(controlsNodeSelector, plotSpec);
            addYParameterSelector(controlsNodeSelector, plotSpec);
            addYScaleSelector(controlsNodeSelector, plotSpec);
            addXRangeSetter(controlsNodeSelector, plotSpec);
            addYRangeSetter(controlsNodeSelector, plotSpec);
        },
        addHistogramControls: function (parentNode, plotSpec) {
            addEditSpecsButton(parentNode);
            $(parentNode).append("<div class='controls' style='display:none'></div>");
            var controlsNodeSelector = parentNode + " div.controls";
            addXParameterSelector(controlsNodeSelector, plotSpec);
            addXScaleSelector(controlsNodeSelector, plotSpec);
            addXRangeSetter(controlsNodeSelector, plotSpec);
            addBinSetter(controlsNodeSelector, plotSpec);
        }


    }
});

