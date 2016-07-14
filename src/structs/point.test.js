import {expect} from 'chai'
import Point from './point'

describe('point.test', function () {

  it('create', function () {
    var vector = new Point(4,3);
    expect(vector.x).to.equal(4);
    expect(vector.y).to.equal(3);
  });

  it('vector length', function () {
    var vector = new Point(4,3);
    expect(vector.vectorLength()).to.equal(5);
    vector = new Point(0,0);
    expect(vector.vectorLength()).to.equal(0);
  });

  it('normalize vector', function () {
    var vector = new Point(4,3);
    vector.normalize();
    expect(vector.x).to.equal(4/5);
    expect(vector.y).to.equal(3/5);

    vector = new Point(0,0);
    vector.normalize();
    expect(vector.x).to.equal(0);
    expect(vector.y).to.equal(0);
  });

  it('scalar', function () {
    var v1 = new Point(2,2);
    var v2 = new Point(4,1);

    var sc = v1.scalar(v2);
    expect(sc).to.equal(10);
  });

  it('angle', function () {
    var v1 = new Point(1,1).normalize();
    var v2 = new Point(1,-1).normalize();
    var v3 = new Point(1,0).normalize();

    expect(v1.angleDeg(v2)).to.equal(90);
    expect(Math.round(v1.angleDeg(v3))).to.equal(45);
  });

  it('subtract', function () {
    var v1 = new Point(1,1);
    var v2 = new Point(3,2);

    var v3 = v2.subtract(v1);
    expect(v3.x).to.equal(2);
    expect(v3.y).to.equal(1);
  });
});