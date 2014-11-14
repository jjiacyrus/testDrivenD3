function buildXScale(range, domain) {
    var scale = d3.scale;

    var linear = scale.linear();
    linear.range([range.min, range.max]);
    linear.domain([domain.min, domain.max]);
    return linear;
}
function buildYScale(range, domain){
    var scale = d3.scale;
    var linear = scale.linear();
    linear.range([range.min, range.max]);
    linear.domain([domain.max, domain.min]);
    return linear;
}
function renderCanvas(parent, plotId, width, height) {
    var canvas = d3.select(parent).append('svg').attr('id', plotId)
        .attr('height', height)
        .attr('width', width);
    return canvas;
}

function buildAxis(canvas, scale, xTranslate, yTranslate, className, orientation) {
    var axisGroup = canvas.append("g");
    axisGroup
        .attr("class", className)
        .attr("transform", "translate(" + xTranslate + " ," + yTranslate + ")");
    var axis = d3.svg.axis().scale(scale).orient(orientation);
    axisGroup.call(axis);
}

function renderXAxis(canvas, xScale, xTranslate, yTranslate) {

    buildAxis(canvas, xScale, xTranslate, yTranslate, 'x axis', 'bottom');
}

function renderYAxis(canvas, yScale, xTranslate, yTranslate) {
    buildAxis(canvas, yScale, xTranslate, yTranslate, 'y axis', 'left');
}
