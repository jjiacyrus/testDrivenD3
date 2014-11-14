function Experiment(dataset){
    var currentDataset = dataset;
    var observers = [];
    this.getCurrentDataset =function(){
        return currentDataset;
    }
    this.setCurrentDataset = function(dataset){
        currentDataset = dataset;
        notifyObserversOfChange(observers);
    }

    this.addObserver = function(observer){
        observers.push(observer)
    }
    this.removeObserver = function(observer){
        var index = observers.indexOf(observer);
        if (index > -1) {
            observers.splice(index, 1);
        }
    }

    function notifyObserversOfChange(observers) {
        if (observers.length > 0) {
            observers.forEach(function (observer) {
                observer.datasetChanged();
            });
        }
    }

}