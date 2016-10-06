describe('get spec', function () {
    it('should test when 0,0', function () {
        var pt = new Point(0, 0);
        var retVal = board.getGraphXY(pt);
        expect(retVal.x).toEqual(250);
        expect(retVal.y).toEqual(250);
    });

    it('should test when 5, 5', function () {
        var pt = new Point(5, 5);
        var retVal = board.getGraphXY(pt);
        expect(retVal.x).toEqual(375);
        expect(retVal.y).toEqual(125);
    });

    it('should test when -5, -5', function () {
        var pt = new Point(-5, -5);
        var retVal = board.getGraphXY(pt);
        expect(retVal.x).toEqual(125);
        expect(retVal.y).toEqual(375);
    });

    it('should test when 5, -5', function () {
        var pt = new Point(5, -5);
        var retVal = board.getGraphXY(pt);
        expect(retVal.x).toEqual(375);
        expect(retVal.y).toEqual(375);
    });
    it('should test when -5, 5', function () {
        var pt = new Point(-5, 5);
        var retVal = board.getGraphXY(pt);
        expect(retVal.x).toEqual(125);
        expect(retVal.y).toEqual(125);
    });
});
