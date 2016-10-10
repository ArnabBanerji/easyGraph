var getCircle = function (point) {
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
    this.goodCounts = 0;
    this.missCounts = 0;
    var ranges = this.ranges,
        i,
        point,
        points = [],
        path = [];

    for (i = ranges.x.min; i <= ranges.x.max; i += 0.01) {
        point = this.getGraphXY(new Point(i, fnY(i)));

        //Ignore points unnecessary
        if (point.x > 0 && point.x < this.boardSpecs.width && point.y > 0 && point.y < this.boardSpecs.height) {
            this.goodCounts++;
            points.push(point);
        } else {
            this.missCounts++;
        }
    }

    console.log('missCounts = ' + this.missCounts);
    console.log('goodCounts = ' + this.goodCounts);
    return points;
};


Board.prototype.getCircles = function (points) {
    var i,
        circles = [],
        point;

    for (i = 0; i < points.length; i++) {
        point = points[i];
        circles.push(getCircle(point))
    }

    return circles;
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
    var eqVal = eval(document.getElementById('equation').value);

    return (x + 2) * (x + 1) * x * (x - 1) * (x - 2);
};

var board = new Board(boardSize, range);

var pts = board.getCircles(board.getPoints(yFn));

var el = document.getElementById('graph');
el.innerHTML = pts;
