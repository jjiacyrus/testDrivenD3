///**
// * Created by Cyrus on 11/6/14.
// */
function makeBarGraph(parent) {
    var canvas = {};


    canvas.render = function (width, height) {
        canvas = renderCanvas(parent, height, width);
        addAxis(canvas);
    };

    function addAxis(canvas) {

        x = buildScale(new Range(0, 490), new Range(0, 100));
        renderXAxis(canvas, x, 50, 470);


        y = buildScale(new Range(10, 470), new Range(0, 100));
        renderYAxis(canvas,y, 50, 0)
    };

    return canvas;
}

//function barChart() {
//    var that = {};
//    var data = null;
//    var h = 500 - 80, w = 500, svg, x, y;
//
//    // setter, getter etc.
//
//
//
//    that.render = function () {
//
//        svg = d3.select('#canvas_boss').append('svg')
//            .attr('height', '500')
//            .attr('width', '500')
//            .append('g')
//            .attr("transform", "translate(0, 0)");
//
//        x = d3.scale.ordinal().rangeRoundBands([0, w], .05);
//        x.domain(data.map(function (d) {
//            return d.date;
//        }));
//
//        y = d3.scale.linear().range([h, 0]);
//        y.domain([0, d3.max(data, function (d) {
//            return d.value;
//        })]);
//
//        // add bars
//
//        var bars = svg.selectAll('.bar').data(this.getData());
//        bars
//            .enter().append('rect')
//            .attr('class', 'bar')
//            .attr("x", function (d) {
//                return x(d.date);
//            })
//            .attr("width", x.rangeBand())
//            .attr("y", function (d) {
//                return y(d.value);
//            })
//            .attr("height", function (d) {
//                return h - y(d.value);
//            });
//    };
//    that.addAxis = function() {
//        // add axis
//        svg.append("g")
//            .attr("class", "x axis")
//            .attr("transform", "translate(0," + h + ")");
//
//        svg.append("g")
//            .attr("class", "y axis");
//
//        var xAxis = d3.svg.axis()
//            .scale(x)
//            .orient("bottom");
//
//        var yAxis = d3.svg.axis()
//            .scale(y)
//            .orient("left");
//
//        svg.selectAll("g.x.axis")
//            .call(xAxis);
//
//        svg.selectAll("g.y.axis")
//            .call(yAxis);
//    };
//
//    that.setData = function(d) {
//        data = d;
//    };
//
//    that.getData = function() {
//        return data;
//    }
//
//
//    return that;
//};