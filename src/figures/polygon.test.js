import {expect} from 'chai'
import Polygon from './polygon'
import { pointsToPolygonStr } from './polygon'
import Point from '../structs/point'

describe('polygon.test', function () {

  it('create', function () {
    var tr = new Polygon([
      new Point(10,10),
      new Point(20,20)
    ]);

    var points = tr.getPoints();
    expect(points.length).to.equal(2);
    expect(points[1].x).to.equal(20);

    tr.setPoints([{x:1, y:3}]);
    points = tr.getPoints();
    expect(points.length).to.equal(1);
    expect(points[0].y).to.equal(3);
  });
  
  it('points str', function () {

    var str = pointsToPolygonStr([
      new Point(10,10),
      new Point(20,20),
      new Point(30,30)
    ]);

    expect(str).to.equal('10,10 20,20 30,30');
  });

  it('move', function () {

    var tr = new Polygon([
      new Point(10,10),
      new Point(20,20),
      new Point(10,30)
    ]);

    var pos = tr.getPos();
    expect(pos.x).to.equal(13);
    expect(pos.y).to.equal(20); 

    tr.setPos(new Point(30,30));
    expect(tr.points[0].x).to.equal(27);
    expect(tr.points[0].y).to.equal(20);
  });
});