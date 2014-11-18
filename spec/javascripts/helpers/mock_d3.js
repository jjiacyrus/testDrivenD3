function MockScale() {
    scale.dataToScaledData ={};
    scale.minRange = 0;
    scale.maxRange = 0;
    scale.minDomain = 0;
    scale.maxDomain = 0;
    scale.clampSet = false;
    scale.ticksToReturn = 0;
    scale.range = function (rangeArray) {
        scale.minRange = rangeArray[0];
        scale.maxRange = rangeArray[1];
        return scale;
    }
    scale.domain = function (domainArray) {
        scale.minDomain = domainArray[0];
        scale.maxDomain = domainArray[1];
        return scale;
    }
    scale.ticks = function(numberOfTicks){
        scale.numberOfTicksPassedIn = numberOfTicks;
        return scale.ticksToReturn;
    }
    scale.clamp = function(clamp){
        scale.clampSet = clamp;
        return scale;
    }

    function scale(x) {
        return scale.dataToScaledData[x];
    }
    return scale;
}

function MockHistogram(binnedData){
    function histogram(data){
        histogram.dataBinned = data;
        return binnedData;
    }
    histogram.bins = function(numberOfBins){
        histogram.numberOfBins = numberOfBins;
        return histogram;
    }
    return histogram;
}

function MockAxis (){
    this.scalePassedIn = undefined;
    this.orientation = "";
    this.tickValues = "";
    this.scale = function(scalePassedIn){
        this.scalePassedIn =  scalePassedIn;
        return this;
    }
    this.orient = function(orientation){
        this.orientation = orientation;
        return this;
    }
    this.tickValues =function(tickValues){
        this.tickValues = tickValues;
        return this;
    }

}


function buildD3SpyNode(parent, name) {
    if(parent && parent[name]) {
        return parent[name];
    }

    var spy = jasmine.createSpyObj(name, ['append', 'attr', 'call', 'datum', 'remove']);

    spy.attr.and.returnValue(spy);
    spy.call.and.returnValue(spy);
    spy.datum.and.returnValue(spy);

    spy.append.and.callFake(function(tag) {
        return buildD3SpyNode(this, tag);
    });

    if(parent) {
        parent[name] = spy;
    }

    return spy;
}




