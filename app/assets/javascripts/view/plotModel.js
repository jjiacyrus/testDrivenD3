function PlotModel(parentNode, plotId, width,height){
    this.getParentNode = function(){
        return parentNode;
    }
    this.getPlotId = function(){
        return plotId;
    }
    this.getWidth = function(){
        return width;
    }
    this.getHeight = function(){
        return height;
    }
}