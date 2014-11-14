function Dataset(name, ch1, ch2, ch3, ch4) {
    var data = {CH1: ch1, CH2: ch2, CH3: ch3, CH4: ch4};
    this.getName = function(){
        return name;
    }
    this.getChannel1 = function() {
        return data[CH1];
    }
    this.getChannel2 = function(){
        return data[CH2];
    }
    this.getChannel3 = function(){
        return data[CH3];
    }
    this.getChannel4 = function(){
        return data[CH4];
    }
}