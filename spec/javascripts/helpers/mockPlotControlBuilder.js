function MockPlotControlBuilder() {
    var spy = jasmine.createSpyObj(name, ['addCreateButtons', 'addDestroyButton', 'addDotPlotControls', 'addHistogramControls']);
    return spy;

}
