describe('Data set', function () {

    it('should store various arrays of data in channels', function () {
        var fl1 = [1, 2, 3, 4, 5];
        var fl2 = [5, 6, 7, 8, 9];
        var fl3 = [10, 11, 12, 13, 14, 15];
        var fl4 = [16, 17, 18, 19, 20];
        var datasetName = 'chundle';
        data = new Dataset(datasetName,fl1, fl2, fl3, fl4);
        expect(data.getName()).toEqual(datasetName);
        expect(data.getChannel1()).toEqual(fl1);
        expect(data.getChannel2()).toEqual(fl2);
        expect(data.getChannel3()).toEqual(fl3);
        expect(data.getChannel4()).toEqual(fl4);

    });
});