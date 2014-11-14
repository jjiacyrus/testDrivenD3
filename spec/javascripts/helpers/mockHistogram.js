function MockHistogramPlot(){
    this.renderCalled = false;
    this.renderPlot = function () {
        this.renderCalled = true;
    }

    this.specificationChanged = function () {
    }

    this.datasetChanged = function () {
    }

    this.destroy = function(){

    }
}