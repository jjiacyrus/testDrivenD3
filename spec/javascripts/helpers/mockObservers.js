
function MockSpecificationObserver() {

    this.numberOfNotifications = 0;

    this.specificationChanged= function () {
        this.numberOfNotifications++;
        return this;
    }
    return this;
}


function MockExperimentObserver() {

    this.numberOfNotifications = 0;

    this.datasetChanged = function () {
        this.numberOfNotifications++;
        return this;
    }
    return this;
}

