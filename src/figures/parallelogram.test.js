import {expect} from 'chai'
import Parallelogram from './parallelogram'
import EPoint from './epoint'
import Point from '../structs/point'
import LayerEvent from '../events/figureEvent'
import { getParallelogramArea } from './parallelogram'
import { pointsToPolygonStr } from './polygon'

describe('Parallelogram.test', function () {

  it('point move', function () {

    var pnt1 = new EPoint(new Point(10, 10));
    var pnt2 = new EPoint(new Point(20, 20));
    var pnt3 = new EPoint(new Point(10, 30));

    var tr = new Parallelogram([
      pnt1,
      pnt2,
      pnt3
    ]);
    var before = pointsToPolygonStr(tr.points);

    // epoint moved
    var pos = pnt1.getPos();
    pos.x = 20;
    var ev = new LayerEvent(pnt1);
    tr.onPointMove(ev);

    // points
    var after = pointsToPolygonStr(tr.points);

    expect(before).to.equal('10,10 20,20 10,30 0,20');
    expect(after).to.equal('20,10 20,20 10,30 10,20');
  });

  it('parallelogram area', function () {

    var points = [
      new Point(0, 0),
      new Point(1, 0),
      new Point(1, 1),
      new Point(0, 1)
    ];
    

    var S = getParallelogramArea(points);
    expect(S).to.equal(1);
  });

});