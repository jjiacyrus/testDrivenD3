function buildScale(range, domain) {
    var scale = d3.scale;

    var linear = scale.linear();
    linear.range([range.min, range.max]);
    linear.domain([domain.min, domain.max]);
    return linear;
}

function renderCanvas(parent, width, height) {
    var canvas = d3.select("#" + parent).append('svg')
        .attr('height', height)
        .attr('width', width);

    canvas.append('g').attr('transform', 'translate(0, 0)');
    return canvas;
}

function buildAxis(canvas, scale, xTranslate,yTranslate, className, orientation) {
    var axisGroup = canvas.append("g");
    axisGroup
        .attr("class", className)
        .attr("transform", "translate(" + xTranslate + " ," + yTranslate + ")");
    var axis = d3.svg.axis().scale(scale).orient(orientation);
    axisGroup.call(axis);
}

function renderXAxis(canvas, xScale, xTranslate, yTranslate) {

    buildAxis(canvas, xScale, xTranslate,yTranslate, 'x axis', 'bottom');
}

function renderYAxis(canvas, yScale, xTranslate, yTranslate) {
    buildAxis(canvas, yScale, xTranslate,yTranslate, 'y axis', 'left');
}


