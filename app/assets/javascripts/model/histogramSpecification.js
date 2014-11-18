function HistogramSpecification(xParameter, xRange, numberOfBins) {
    var xParameter = xParameter;
    var xRange = xRange;
    var xScale = LIN;
    var numberOfBins = numberOfBins;
    var observers = [];


    this.addObserver = function (observer) {
        observers.push(observer);
    }
    this.removeObserver = function (observer) {
        var index = observers.indexOf(observer);
        if (index > -1) {
            observers.splice(index, 1);
        }
    }

    this.getXParameter = function () {
        return xParameter;
    }


    this.getXRange = function () {
        return xRange;
    }

    this.setXRange = function (range) {
        xRange = range;
        notifyObserversOfChange(observers);
    }

    this.setXParameter = function (parameter) {
        xParameter = parameter;
        notifyObserversOfChange(observers);
    }
    this.setXScale = function(scale){
        xScale = scale;
        if (scale == LOG) {
            if (xRange && xRange.min == 0) {
                xRange = new Range(1, xRange.max);
            }
        }
        notifyObserversOfChange(observers);
    }
    this.getXScale = function(){
        return xScale;
    }
    this.getNumberOfBins = function () {
        return numberOfBins;
    }

    this.setNumberOfBins = function (bins) {
        numberOfBins = bins;
        notifyObserversOfChange(observers);
    }

    function notifyObserversOfChange(observers) {

        if (observers.length > 0) {
            observers.forEach(function (observer) {
                observer.specificationChanged();
            });

        }
    }


}