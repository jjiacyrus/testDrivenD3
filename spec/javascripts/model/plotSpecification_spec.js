/**
 * Created by Cyrus on 11/7/14.
 */
describe('Plot specification', function () {

    it('should give you properties from its constructor', function () {
        var expectedXRange = new Range(251, 1231);
        var expectedYRange = new Range(3523, 23555);
        var plotSpec = new PlotSpecification(CH1, CH3, expectedXRange, expectedYRange);

        expect(plotSpec.getXParameter()).toEqual(CH1);
        expect(plotSpec.getYParameter()).toEqual(CH3);
        expect(plotSpec.getXRange()).toEqual(expectedXRange);
        expect(plotSpec.getYRange()).toEqual(expectedYRange);
    });

    it('should allow a user to change the ranges and parameters', function(){
        var expectedXRange = new Range(251, 1231);
        var expectedYRange = new Range(3523, 23555);
        var plotSpec = new PlotSpecification(CH1, CH3, expectedXRange, expectedYRange);

        expect(plotSpec.getXParameter()).toEqual(CH1);
        expect(plotSpec.getYParameter()).toEqual(CH3);
        expect(plotSpec.getXRange()).toEqual(expectedXRange);
        expect(plotSpec.getYRange()).toEqual(expectedYRange);

        plotSpec.setXParameter(CH4);
        plotSpec.setYParameter(CH2);

        expect(plotSpec.getXParameter()).toEqual(CH4);
        expect(plotSpec.getYParameter()).toEqual(CH2);

        var newXRange = new Range(2512, 523523);
        var newYRange = new Range(12,623);
        plotSpec.setXRange(newXRange);
        plotSpec.setYRange(newYRange);

        expect(plotSpec.getXRange()).toEqual(newXRange);
        expect(plotSpec.getYRange()).toEqual(newYRange);
    })
});