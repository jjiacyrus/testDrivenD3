describe('Histogram specification', function () {

    it('should give you properties from its constructor', function () {
        var expectedXRange = new Range(251, 1231);
        var numberOfBins = 235;
        var histogramSpec = new HistogramSpecification(CH4, expectedXRange, numberOfBins);

        expect(histogramSpec.getXParameter()).toEqual(CH4);
        expect(histogramSpec.getXRange()).toEqual(expectedXRange);
        expect(histogramSpec.getNumberOfBins()).toEqual(numberOfBins);
    });

    it('should allow a user to change the ranges and parameters', function () {
        var expectedXRange = new Range(251, 1231);
        var numberOfBins = 523;
        var histogramSpec = new HistogramSpecification(CH1, expectedXRange, numberOfBins);

        expect(histogramSpec.getXParameter()).toEqual(CH1);
        expect(histogramSpec.getXRange()).toEqual(expectedXRange);
        expect(histogramSpec.getNumberOfBins()).toEqual(numberOfBins);

        histogramSpec.setXParameter(CH4);

        expect(histogramSpec.getXParameter()).toEqual(CH4);

        var newXRange = new Range(2512, 523523);
        histogramSpec.setXRange(newXRange);

        expect(histogramSpec.getXRange()).toEqual(newXRange);

        var newNumberOfBins = 463;
        histogramSpec.setNumberOfBins(newNumberOfBins);

        expect(histogramSpec.getNumberOfBins()).toEqual(newNumberOfBins);

    });

    it('should start with x scales in linear', function () {
        var expectedXRange = new Range(251, 1231);
        var plotSpec = new HistogramSpecification(CH1, expectedXRange);

        expect(plotSpec.getXScale()).toEqual(LIN);

    });

    it('should be able to set x scale', function () {
        var expectedXRange = new Range(251, 1231);
        var plotSpec = new HistogramSpecification(CH1, expectedXRange);

        expect(plotSpec.getXScale()).toEqual(LIN);

        plotSpec.setXScale(LOG);

        expect(plotSpec.getXScale()).toEqual(LOG);
    });


    it('should will set min range to 1 if you set the scale to log and the current min is 0', function () {
        var plotSpec = new HistogramSpecification(CH1, new Range(0, 1231));

        plotSpec.setXScale(LOG);

        expect(plotSpec.getXScale()).toEqual(LOG);
        expect(plotSpec.getXRange()).toEqual(new Range(1, 1231));
    });


    it('should notify all observers of specification changed when any of the parameters are set', function () {
        var expectedXRange = new Range(251, 1231);

        var histogramSpec = new HistogramSpecification(CH1, expectedXRange);
        var observer1 = new MockSpecificationObserver();
        var observer2 = new MockSpecificationObserver();
        histogramSpec.addObserver(observer1);
        histogramSpec.addObserver(observer2);

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(0);

        histogramSpec.setXParameter(CH1);

        expect(observer1.numberOfNotifications).toEqual(1);
        expect(observer2.numberOfNotifications).toEqual(1);

        histogramSpec.setXRange(new Range(5, 200));

        expect(observer1.numberOfNotifications).toEqual(2);
        expect(observer2.numberOfNotifications).toEqual(2);

        histogramSpec.setNumberOfBins(234);
        expect(observer1.numberOfNotifications).toEqual(3);
        expect(observer2.numberOfNotifications).toEqual(3);

        histogramSpec.setXScale(LOG);
        expect(observer1.numberOfNotifications).toEqual(4);
        expect(observer2.numberOfNotifications).toEqual(4);

    });


    it('should not notify any obsevers that have been removed', function () {
        var expectedXRange = new Range(251, 1231);
        var histogramSpec = new HistogramSpecification(CH1, expectedXRange);

        var observer1 = new MockSpecificationObserver();
        var observer2 = new MockSpecificationObserver();
        histogramSpec.addObserver(observer1);
        histogramSpec.addObserver(observer2);
        histogramSpec.removeObserver(observer1);

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(0);

        histogramSpec.setXParameter(CH1);

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(1);

        histogramSpec.setXRange(new Range(5, 200));

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(2);

        histogramSpec.setNumberOfBins(234);
        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(3);

    });
});