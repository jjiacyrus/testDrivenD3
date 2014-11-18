
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

    it('should start with x and y scales in linear', function(){
        var expectedXRange = new Range(251, 1231);
        var expectedYRange = new Range(3523, 23555);
        var plotSpec = new PlotSpecification(CH1, CH3, expectedXRange, expectedYRange);

        expect(plotSpec.getXScale()).toEqual(LIN);
        expect(plotSpec.getYScale()).toEqual(LIN);

    });
    it('should be able to set x and y scales', function(){
        var expectedXRange = new Range(251, 1231);
        var expectedYRange = new Range(3523, 23555);
        var plotSpec = new PlotSpecification(CH1, CH3, expectedXRange, expectedYRange);

        expect(plotSpec.getXScale()).toEqual(LIN);
        expect(plotSpec.getYScale()).toEqual(LIN);

        plotSpec.setXScale(LOG);
        plotSpec.setYScale(LOG);

        expect(plotSpec.getXScale()).toEqual(LOG);
        expect(plotSpec.getYScale()).toEqual(LOG);
    });


    it('should will set min range to 1 if you set the scale to log and the current min is 0', function(){
        var plotSpec = new PlotSpecification(CH1, CH3, new Range(0, 1231), new Range(0, 23555));

        plotSpec.setXScale(LOG);
        plotSpec.setYScale(LOG);

        expect(plotSpec.getXScale()).toEqual(LOG);
        expect(plotSpec.getXRange()).toEqual(new Range(1, 1231));

        expect(plotSpec.getYScale()).toEqual(LOG);
        expect(plotSpec.getYRange()).toEqual(new Range(1, 23555));
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

        plotSpec.setXScale(LOG);

        expect(observer1.numberOfNotifications).toEqual(5);
        expect(observer2.numberOfNotifications).toEqual(5);

        plotSpec.setYScale(LOG);

        expect(observer1.numberOfNotifications).toEqual(6);
        expect(observer2.numberOfNotifications).toEqual(6);
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