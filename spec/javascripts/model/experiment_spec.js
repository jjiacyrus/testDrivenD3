describe('Experiment', function () {

    it('should be able to provide current dataset (which starts as dataset 1)', function () {
        var set1 = new Dataset('set1');

        var experiment = new Experiment(set1);
        expect(experiment.getCurrentDataset()).toEqual(set1);
    });
    it('should be able to change the current dataset', function () {
        var set1 = new Dataset('set1');
        var set2 = new Dataset('set2');

        var experiment = new Experiment(set1);

        expect(experiment.getCurrentDataset()).toEqual(set1);

        experiment.setCurrentDataset(set2);
        expect(experiment.getCurrentDataset()).toEqual(set2);

    });

    it('should notify all observers of specification changed when the current dataset changes', function () {
        var set1 = new Dataset('set1');
        var set2 = new Dataset('set2');

        var experiment = new Experiment(set1);

        var observer1 = new MockExperimentObserver();
        var observer2 = new MockExperimentObserver();
        experiment.addObserver(observer1);
        experiment.addObserver(observer2);

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(0);

        experiment.setCurrentDataset(new Dataset());

        expect(observer1.numberOfNotifications).toEqual(1);
        expect(observer2.numberOfNotifications).toEqual(1);
    });


    it('should notify all observers of specification change if it has not been removed', function () {
        var set1 = new Dataset('set1');
        var set2 = new Dataset('set2');

        var experiment = new Experiment(set1);

        var observer1 = new MockExperimentObserver();
        var observer2 = new MockExperimentObserver();
        experiment.addObserver(observer1);
        experiment.addObserver(observer2);
        experiment.removeObserver(observer1);

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(0);

        experiment.setCurrentDataset(new Dataset());

        expect(observer1.numberOfNotifications).toEqual(0);
        expect(observer2.numberOfNotifications).toEqual(1);
    });

});