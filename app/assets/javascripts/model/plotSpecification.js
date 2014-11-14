/**
 * Created by Cyrus on 11/7/14.
 */
function PlotSpecification(xParameter, yParameter, xRange, yRange) {
    var xParameter = xParameter;
    var yParameter = yParameter;
    var xRange = xRange;
    var yRange = yRange;
    var observers = [];
    function notifyObserversOfChange(observers) {

        if (observers.length > 0) {
            observers.forEach(function (observer) {
                observer.specificationChanged();
            });

        }
    }

    this.addObserver = function (observer) {
        observers.push(observer);
    }
    this.removeObserver = function(observer){
        var index = observers.indexOf(observer);
        if (index > -1) {
            observers.splice(index, 1);
        }
    }


    this.getXParameter = function () {
        return xParameter;
    }

    this.getYParameter = function () {
        return yParameter;
    }

    this.getXRange = function () {
        return xRange;
    }

    this.getYRange = function () {
        return yRange;
    }

    this.setXRange = function (range) {
        xRange = range;
        notifyObserversOfChange(observers);
    }
    this.setYRange = function (range) {
        yRange = range;
        notifyObserversOfChange(observers);
    }
    this.setXParameter = function (parameter) {
        xParameter = parameter;
        notifyObserversOfChange(observers);
    }

    this.setYParameter = function (parameter) {
        yParameter = parameter;
        notifyObserversOfChange(observers);
    }

}