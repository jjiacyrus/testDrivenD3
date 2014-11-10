/**
 * Created by Cyrus on 11/7/14.
 */
function PlotSpecification(xParameter, yParameter, xRange, yRange) {
    this.xParameter = xParameter;
    this.yParameter = yParameter;
    this.xRange = xRange;
    this.yRange = yRange;

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
    }
    this.setYRange = function (yRange) {
        this.yRange = yRange;
    }
    this.setXParameter =function(xParameter){
        this.xParameter = xParameter;
    }

    this.setYParameter = function(yParameter){
        this.yParameter = yParameter;
    }

}