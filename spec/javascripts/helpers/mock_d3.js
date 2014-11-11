function MockLinearScale() {
    this.minRange = 0;
    this.maxRange = 0;
    this.minDomain = 0;
    this.maxDomain = 0;
    this.range = function (rangeArray) {
        this.minRange = rangeArray[0];
        this.maxRange = rangeArray[1];
        return this;
    }
    this.domain = function (domainArray) {
        this.minDomain = domainArray[0];
        this.maxDomain = domainArray[1];
        return this;
    }

}
function MockScale(dataToScaledData){

    function scale(x) {
        return dataToScaledData[x];
    }
    return scale;
}

function MockAxis (){
    this.scalePassedIn = undefined;
    this.orientation = "";
    this.scale = function(scalePassedIn){
        this.scalePassedIn =  scalePassedIn;
        return this;
    }
    this.orient = function(orientation){
        this.orientation = orientation;
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




