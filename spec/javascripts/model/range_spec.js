/**
 * Created by Cyrus on 11/7/14.
 */
describe('Range', function () {

    it('stores a min and a max for the range', function () {
        var range = new Range(123, 5662);
        expect(range.min).toEqual(123);
        expect(range.max).toEqual(5662);
    });

    it('is smart enough to figure out min and max if they are given in an incorrect order', function () {
        var range = new Range(123000, 5662);
        expect(range.min).toEqual(5662);
        expect(range.max).toEqual(123000);
    });

    it('should be able to provide the span of the range', function(){
        var range = new Range(100,400);
        expect(range.span).toEqual(300);
    });
});