describe('Dot Plot Helpers', function () {

    it('should be able to render data', function () {

        var canvas = d3.select('body').append('svg');
        data = [
            [51, 90],
            [52, 90],
            [53, 90],
            [20, 20]
        ];
        renderScatterPlotData(canvas, data, 25, 50);

        var dataGroup = canvas.select('g');
        expect(dataGroup.empty()).toBeFalsy();
        expect(dataGroup.attr('transform')).toBe("translate(25, 50)");

        var dots = dataGroup.selectAll('circle.dot');
        var allDots = dots[0];
        expect(allDots.length).toEqual(4);

        function checkDot(index, expectedX, expectedY) {

            expect(d3.select(allDots[index]).attr('r')).toEqual('2');
            expect(d3.select(allDots[index]).attr('cx')).toEqual(expectedX + '');
            expect(d3.select(allDots[index]).attr('cy')).toEqual(expectedY + '');
        }

        checkDot(0, 51, 90);
        checkDot(1, 52, 90);
        checkDot(2, 53, 90);
        checkDot(3, 20, 20);
    });

    it('should scale data and put it into the correct format', function () {
        xData = [352, 234, 22, 41];
        yData = [120, 154, 52, 49];
        scaledXData = {};
        scaledXData[352] = 35.2;
        scaledXData[234] = 23.4;
        scaledXData[22] = 2.2;
        scaledXData[41] = 4.1;


        var mockXScale = MockLinearScale();
        mockXScale.dataToScaledData = scaledXData;


        scaledYData = {};
        scaledYData[120] = 1200;
        scaledYData[154] = 1540;
        scaledYData[52] = 520;
        scaledYData[49] = 490;

        var mockYScale = MockLinearScale();
        mockYScale.dataToScaledData = scaledYData;
        var formattedData = formatData(xData, yData, mockXScale, mockYScale, new Range(0, 500), new Range(0,500));

        expect(formattedData).toEqual([
            [35.2, 1200],
            [23.4, 1540],
            [2.2, 520],
            [4.1, 490]
        ]);
    });

    it('should filter for data that is outside the domain and not scale it', function () {
        xData = [10, 20, 30, 50];
        yData = [60, 70, 100, 40];
        scaledXData = {};
        scaledXData[10] = 35.2;
        scaledXData[20] = 23.4;


        var mockXScale = MockLinearScale();
        mockXScale.dataToScaledData = scaledXData;


        scaledYData = {};
        scaledYData[60] = 1200;
        scaledYData[70] = 1540;

        var mockYScale = MockLinearScale();
        mockYScale.dataToScaledData = scaledYData;
        var xRange = new Range(10, 40);
        var yRange = new Range(50, 90);
        var formattedData = formatData(xData, yData, mockXScale, mockYScale, xRange, yRange);

        expect(formattedData).toEqual([
            [35.2, 1200],
            [23.4, 1540],
        ]);
    });
});