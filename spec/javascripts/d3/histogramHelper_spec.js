describe("Histogram Helper", function () {
    it('should bin  data using the d3 histogram', function () {
        var data = [34, 23523, 5, 235, 23, 235, 2352];
        var xScale = new MockScale();
        var scaledTicks = 523;
        xScale.ticksToReturn = scaledTicks;

        var numberOfBins = 35;
        var binnedData = [
            {x: 24, y: 32, dx: 35},
            {x: 12, y: 21, dx: 25}
        ];
        var histogram = MockHistogram(binnedData);

        d3.layout.histogram = function () {
            return  histogram;
        }

        var binnedData = HistogramHelper.binData(data, xScale, numberOfBins);
        expect(binnedData).toEqual(binnedData);
        expect(data).toEqual(histogram.dataBinned);
        expect(scaledTicks).toEqual(histogram.numberOfBins);
        expect(numberOfBins).toEqual(xScale.numberOfTicksPassedIn);
    });

    it('should get data in domain', function () {
        var data = [5,50,55,80,45,30];

        var dataInRange = HistogramHelper.getDataInDomain(data, new Range(40,60));
        expect(dataInRange).toEqual([50,55,45]);

    });


    it('should scale the binned data', function(){
        var binnedData = [
            {x: 24, y: 32, dx: 35},
            {x: 12, y: 21, dx: 25}
        ];
        var xScale = new MockScale();

        var yScale = new MockScale();

        var xScaledData = {};
        xScaledData[24] = 240;
        xScaledData[12] = 120;
        xScaledData[35] = 350;
        xScaledData[25] = 250;
        xScale.dataToScaledData = xScaledData;

        var yScaledData = {};
        yScaledData[32] = 23;
        yScaledData[21] = 12;
        yScale.dataToScaledData = yScaledData;

        var expectedData = [
            {x: 240, y: 23, width: 350},
            {x: 120, y: 12, width: 250}
        ];

        var scaledData = HistogramHelper.scaleBinnedData(binnedData, xScale, yScale);
        expect(scaledData).toEqual(expectedData);

    });


    it('should be able to render data', function () {

        var canvas = d3.select('body').append('svg');
        data = [
            {x: 23, y: 241, width: 25},
            {x: 2, y: 53, width: 15},
            {x: 634, y: 53, width: 35},
            {x: 6, y: 42, width: 42}
        ];
        var graphingAreaHeight = 500;
        HistogramHelper.renderHistogramData(canvas, data, 25, 50, graphingAreaHeight);

        var dataGroup = canvas.select('g.dataGroup');
        expect(dataGroup.empty()).toBeFalsy();
        expect(dataGroup.attr('transform')).toBe("translate(25, 50)");

        var allBars = dataGroup.selectAll('g.bar')[0];
        expect(allBars.length).toEqual(4);

        function checkBar(index, expectedX, expectedY, expectedWidth) {

            var bar = d3.select(allBars[index]);
            expect(bar.attr('transform')).toEqual('translate(' + expectedX + ", " + expectedY + ")");

            var rectangle = bar.select('rect');
            expect(rectangle.attr('x')).toEqual('1');
            expect(rectangle.attr('width')).toEqual(expectedWidth  -1 + '');
            expect(rectangle.attr('height')).toEqual(graphingAreaHeight -expectedY + '');

        }

        checkBar(0, 23, 241, 25);
        checkBar(1, 2, 53, 15);
        checkBar(2, 634, 53, 35);
        checkBar(3, 6, 42, 42);
    });

});
