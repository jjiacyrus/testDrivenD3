function MockDotPlot() {
    this.renderCalled = false;
    this.renderPlot = function () {
        this.renderCalled = true;
    }
    this.destroy = function(){

    }
}