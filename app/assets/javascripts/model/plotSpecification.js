/**
 * Created by Cyrus on 11/7/14.
 */
function PlotSpecification(plotSpecId, xParameter, yParameter, xRange, yRange) {
    this.xParameter = xParameter;
    this.yParameter = yParameter;
    this.xRange = xRange;
    this.yRange = yRange;
    this.observers = [];
    function notifyObserversOfChange(observers) {

        if (observers.length > 0) {
            observers.forEach(function (observer) {
                observer.specificationChanged();
            });

        }
    }

    this.addObserver = function (observer) {
        this.observers.push(observer);
    }
    this.removeObserver = function(observer){
        var index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    this.getId = function () {
        return plotSpecId;
    }
    this.getXParameter = function () {
        return this.xParameter;
    }

    this.getYParameter = function () {
        return this.yParameter;
    }

    this.getXRange = function () {
        return this.xRange;
    }

    this.getYRange = function () {
        return this.yRange;
    }

    this.setXRange = function (xRange) {
        this.xRange = xRange;
        notifyObserversOfChange(this.observers);
    }
    this.setYRange = function (yRange) {
        this.yRange = yRange;
        notifyObserversOfChange(this.observers);
    }
    this.setXParameter = function (xParameter) {
        this.xParameter = xParameter;
        notifyObserversOfChange(this.observers);
    }

    this.setYParameter = function (yParameter) {
        this.yParameter = yParameter;
        notifyObserversOfChange(this.observers);
    }

}