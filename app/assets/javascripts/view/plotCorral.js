function PlotCorral(parentNode, corralNumber, experiment) {
    var dotPlot;
    var histogramPlot;
    createAddButtons(this);

    function createDestroyButton(plotCorral) {
        $(parentNode).append("<button class='destroy'>x</button>");
        $(parentNode + ' button.destroy').on('click', function () {
            plotCorral.destroyPlot();
        })
    }


    function createAddButtons(plotCorral) {

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
    }

    this.createDotPlot = function () {

        $(parentNode).empty();

        createDestroyButton(this);
        $(parentNode).append("<div class='canvas' id='canvas" + corralNumber + "'></div>");

        var plotModel = new PlotModel("div#canvas" + corralNumber, "plot" + corralNumber, 300, 300);
        var plotSpec = new PlotSpecification(CH1, CH2, new Range(0, 100), new Range(0, 100));
        dotPlot = new DotPlot(plotModel, plotSpec, experiment);
        dotPlot.renderPlot();

        $(parentNode).append("<div class='controls'></div>");
        createXParameterSelector(plotSpec);
        createYParameterSelector(plotSpec);
    }

    this.createHistogramPlot = function () {
        $(parentNode).empty();

        createDestroyButton(this);
        $(parentNode).append("<div class='canvas' id='canvas" + corralNumber + "'></div>");

        var plotModel = new PlotModel("div#canvas" + corralNumber, "plot" + corralNumber, 300, 300);
        var plotSpec = new HistogramSpecification(CH1, new Range(0, 100), 10);
        histogramPlot = new HistogramPlot(plotModel, plotSpec, experiment);
        histogramPlot.renderPlot();
        $(parentNode).append("<div class='controls'></div>");
        createXParameterSelector(plotSpec);
    }

    function createXParameterSelector(plotSpec) {
        var xDropdownNode = parentNode + ' .controls select.xParameter';
        $(parentNode + ' .controls').append("<select class='xParameter'></select>");
        $(xDropdownNode).on('change', function () {
            plotSpec.setXParameter($(xDropdownNode + ' option:selected').val());

        });
        $(xDropdownNode).append("<option value=" + CH1 + " selected>" + CH1 + "</option>");
        $(xDropdownNode).append("<option value=" + CH2 + ">" + CH2 + "</option>");
        $(xDropdownNode).append("<option value=" + CH3 + ">" + CH3 + "</option>");
        $(xDropdownNode).append("<option value=" + CH4 + ">" + CH4 + "</option>");
    }

    function createYParameterSelector(plotSpec) {
        var yDropdownNode = parentNode + ' .controls select.yParameter';
        $(parentNode + ' .controls').append("<select class='yParameter'></select>");
        $(yDropdownNode).on('change', function () {
            plotSpec.setYParameter($(yDropdownNode + ' option:selected').val());
        });

        $(yDropdownNode).append("<option value=" + CH1 + ">" + CH1 + "</option>");
        $(yDropdownNode).append("<option value=" + CH2 + " selected>" + CH2 + "</option>");
        $(yDropdownNode).append("<option value=" + CH3 + ">" + CH3 + "</option>");
        $(yDropdownNode).append("<option value=" + CH4 + ">" + CH4 + "</option>");
    }

    this.destroyPlot = function () {
        if (dotPlot != undefined) {

            dotPlot.destroy();
            dotPlot = undefined;
        }
        if(histogramPlot != undefined){
            histogramPlot.destroy();
            histogramPlot = undefined;
        }
        $(parentNode).empty();
        createAddButtons(this);
    }
}