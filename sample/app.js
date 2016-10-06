var getPointCircle = function (point) {
    var vX = point.x;
    var vY = point.y;
    var orX = point.original.x;
    var orY = point.original.y;
    return '<circle cx="' + vX + '" cy="' + vY + '" r="2" stroke="red" ' + 'data-values="x=' + orX + ',y=' + orY + '"' + ' stroke-width="3" fill="red"/>';
};

function Point(x, y, pt) {
    this.x = x;
    this.y = y;
    this.original = pt;
    return this;
}

function Board(boardSpecs, ranges) {
    this.boardSpecs = boardSpecs;
    this.ranges = ranges;
    return this;
}

Board.prototype.getGraphXY = function (point) {
    var vX = point.x,
        vY = point.y,
        minX = this.ranges.x.min,
        maxX = this.ranges.x.max,
        minY = this.ranges.y.min,
        maxY = this.ranges.y.max,
        dX = vX - minX,
        dY = maxY - vY,
        boardRangeX = this.boardSpecs.width,
        boardRangeY = this.boardSpecs.height,
        rangeX = (maxX - minX),
        rangeY = (maxY - minY),
        pDx = boardRangeX / rangeX,
        pDy = boardRangeY / rangeY,
        oX = dX * pDx,
        oY = dY * pDy;

    return new Point(oX, oY, point);
};

Board.prototype.getPoints = function (fnY) {
    var ranges = this.ranges,
        points = [];

    for (var i = ranges.x.min; i <= ranges.x.max; i += 0.05) {
        points.push(getPointCircle(this.getGraphXY(new Point(i, fnY(i)))));
    }
    return points;
};

var boardSize =
{
    'width': 500,
    'height': 500
};

var range =
{
    x: {
        min: -10,
        max: 10
    },
    y: {
        min: -10,
        max: 10
    }
};


var yFn = function (x) {
    return (x + 2) * (x + 1) * x * (x - 1) * (x - 2);
};

var board = new Board(boardSize, range);

var pts = board.getPoints(yFn);

var el = document.getElementById('graph');
el.innerHTML = pts;
