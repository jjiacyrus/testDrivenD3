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

    it('should be able to determine if a value is contained', function(){
        var range = new Range(10, 50);
        expect(range.contains(20)).toBe(true);
        expect(range.contains(200)).toBe(false);
        expect(range.contains(9)).toBe(false);
        expect(range.contains(51)).toBe(false);
        expect(range.contains(10)).toBe(true);
        expect(range.contains(50)).toBe(true);
    });
});