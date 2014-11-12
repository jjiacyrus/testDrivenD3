function PlotCorral(parentNode, corralNumber, dataSet) {

    function createDestroyButton(plotCorral) {
        $(parentNode).append("<button class='destroy'>x</button>");
        $(parentNode + ' button.destroy').on('click', function () {
            plotCorral.destroyPlot();
        })
    }


    function createAddButton(plotCorral) {
        $(parentNode).append("<button class='createDotPlot'>+</button>");
        $(parentNode + ' button.createDotPlot').on('click', function () {
            plotCorral.createDotPlot();
        })
    }

    this.createDotPlot = function () {
        $(parentNode).empty();

        createDestroyButton(this);
        $(parentNode).append("<div class='canvas' id='canvas" + corralNumber + "'></div>");

        var plotModel = new PlotModel("div#canvas" + corralNumber, "plot" + corralNumber, 300, 300);
        var plotSpecId = "plotSpec" + corralNumber;
        var plotSpec = new PlotSpecification(plotSpecId, CH1, CH2, new Range(0, 100), new Range(0, 100));
        var dotPlot = new DotPlot(plotModel, plotSpec, dataSet);
        dotPlot.renderPlot();

        $(parentNode).append("<div class='controls'></div>");
        createXParameterSelector(plotSpec);
        createYParameterSelector(plotSpec);
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
        $(parentNode).empty();
        createAddButton(this);
    }
}