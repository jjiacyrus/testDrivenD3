
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

    it('should allow a user to change the ranges and parameters', function () {
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
        var newYRange = new Range(12, 623);
        plotSpec.setXRange(newXRange);
        plotSpec.setYRange(newYRange);

        expect(plotSpec.getXRange()).toEqual(newXRange);
        expect(plotSpec.getYRange()).toEqual(newYRange);
    });

    it('should notify all observers of specification changed when any of the parameters are set', function () {
        var expectedXRange = new Range(251, 1231);
        var expectedYRange = new Range(3523, 23555);
        var plotSpec = new PlotSpecification(CH1, CH3, expectedXRange, expectedYRange);

        var observer1 = new MockSpecificationObserver();
        var observer2 = new MockSpecificationObserver();
        plotSpec.addObserver(observer1);
        plotSpec.addObserver(observer2);

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(0);

        plotSpec.setXParameter(CH1);

        expect(observer1.numberOfNotifications).toEqual(1);
        expect(observer2.numberOfNotifications).toEqual(1);
        plotSpec.setYParameter(CH2);

        expect(observer1.numberOfNotifications).toEqual(2);
        expect(observer2.numberOfNotifications).toEqual(2);

        plotSpec.setXRange(new Range(5,200));

        expect(observer1.numberOfNotifications).toEqual(3);
        expect(observer2.numberOfNotifications).toEqual(3);

        plotSpec.setYRange(new Range(15,20));

        expect(observer1.numberOfNotifications).toEqual(4);
        expect(observer2.numberOfNotifications).toEqual(4);
    });


    it('should not notify any obsevers that have been removed', function () {
        var expectedXRange = new Range(251, 1231);
        var expectedYRange = new Range(3523, 23555);
        var plotSpec = new PlotSpecification(CH1, CH3, expectedXRange, expectedYRange);

        var observer1 = new MockSpecificationObserver();
        var observer2 = new MockSpecificationObserver();
        plotSpec.addObserver(observer1);
        plotSpec.addObserver(observer2);
        plotSpec.removeObserver(observer1);

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(0);

        plotSpec.setXParameter(CH1);

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(1);
        plotSpec.setYParameter(CH2);

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(2);

        plotSpec.setXRange(new Range(5,200));

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(3);

        plotSpec.setYRange(new Range(15,20));

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(4);
    });
});