function PlotControlBuilder() {

}

PlotControlBuilder.addCreateButtons = function (parentDiv, plotCorral) {
    $(parentDiv).append("<div class='createButtons'></div>");
    var createButtonsSelector = parentDiv + ' div.createButtons';
    $(createButtonsSelector).append("<button class='createDotPlot'>D</button>");
    $(createButtonsSelector + ' button.createDotPlot').on('click', function () {
        plotCorral.createDotPlot();
    })

    $(createButtonsSelector).append("<button class='createHistogramPlot'>H</button>");
    $(createButtonsSelector + ' button.createHistogramPlot').on('click', function () {
        plotCorral.createHistogramPlot();
    })
}

PlotControlBuilder.addDestroyButton = function (parentDiv, plotCorral) {

    $(parentDiv).append("<button class='destroy'>x</button>");
    $(parentDiv + ' button.destroy').on('click', function () {
        plotCorral.destroyPlot();
    })
}

function determineSelection(channel, plotSpecChannel) {
    if (plotSpecChannel == channel) {
        return ' selected';
    }
    return '';
}


PlotControlBuilder.addXParameterSelector = function (parentDiv, plotSpec) {
    $(parentDiv).append("<div class='xLabel'>X Parameter</div>");

    var xDropdownNode = parentDiv + ' select.xParameter';
    $(parentDiv).append("<select class='xParameter'></select>");
    $(xDropdownNode).on('change', function () {
        plotSpec.setXParameter($(xDropdownNode + ' option:selected').val());

    });

    var currentXParameter = plotSpec.getXParameter();
    $(xDropdownNode).append("<option value=" + CH1 + determineSelection(CH1, currentXParameter) + ">" + CH1 + "</option>");
    $(xDropdownNode).append("<option value=" + CH2 + determineSelection(CH2, currentXParameter) + ">" + CH2 + "</option>");
    $(xDropdownNode).append("<option value=" + CH3 + determineSelection(CH3, currentXParameter) + ">" + CH3 + "</option>");
    $(xDropdownNode).append("<option value=" + CH4 + determineSelection(CH4, currentXParameter) + ">" + CH4 + "</option>");
}

PlotControlBuilder.addXRangeSetter = function (parentDiv, plotSpec) {
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
    })
}

PlotControlBuilder.addYRangeSetter = function(parentNode, plotSpec){
    $(parentNode).append("<div class='yRangeSelector'></div>");
    var rangeSelectorDiv = $(parentNode + ' div.yRangeSelector');
    rangeSelectorDiv.append("<div class='yRangeLabel'>Y Range</div>")
    rangeSelectorDiv.append("<input class='yRangeMin' type='text' value='" + plotSpec.getYRange().min + "'>")
    rangeSelectorDiv.append("<input class='yRangeMax' type='text' value='" + plotSpec.getYRange().max + "'>")
    rangeSelectorDiv.append("<button class='setYRange'>Set Y Range</button>");
    var yMin = $(parentNode + " div.yRangeSelector input.yRangeMin");
    var yMax = $(parentNode + " div.yRangeSelector input.yRangeMax");
    $(parentNode + " div.yRangeSelector button.setYRange").on('click', function () {
        plotSpec.setYRange(new Range(parseInt(yMin.val()), parseInt(yMax.val())));
    })
}


PlotControlBuilder.addYParameterSelector = function (parentDiv, plotSpec) {
    $(parentDiv).append("<div class='yLabel'>Y Parameter</div>");

    var yDropdownNode = parentDiv + ' select.yParameter';
    $(parentDiv).append("<select class='yParameter'></select>");
    $(yDropdownNode).on('change', function () {
        plotSpec.setYParameter($(yDropdownNode + ' option:selected').val());

    });

    var currentYParameter = plotSpec.getYParameter();
    $(yDropdownNode).append("<option value=" + CH1 + determineSelection(CH1, currentYParameter) + ">" + CH1 + "</option>");
    $(yDropdownNode).append("<option value=" + CH2 + determineSelection(CH2, currentYParameter) + ">" + CH2 + "</option>");
    $(yDropdownNode).append("<option value=" + CH3 + determineSelection(CH3, currentYParameter) + ">" + CH3 + "</option>");
    $(yDropdownNode).append("<option value=" + CH4 + determineSelection(CH4, currentYParameter) + ">" + CH4 + "</option>");

}


PlotControlBuilder.addBinSetter = function (parentDiv, histogramSpec) {
    $(parentDiv).append("<div class='numberOfBinsLabel'>Number of Bins</div>")
    $(parentDiv).append("<input class='numberOfBins' type='text' value='" + histogramSpec.getNumberOfBins() + "'>")
    $(parentDiv + ' input.numberOfBins').on('blur', function () {
        histogramSpec.setNumberOfBins(parseInt($(parentDiv + ' input.numberOfBins').val()));
    });
}