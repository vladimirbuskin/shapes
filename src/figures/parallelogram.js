import Polygon from './polygon'
import Point from '../structs/point'

function getPoints(epoints) {
  return (epoints || []).map(x => x.getPos==null ? x : x.getPos());
}

function getParallelogramPoints(points) {
  var [A,B,C] = points;

  // E - center of parallelogram
  var E = new Point();
  E.x = (A.x + C.x)/2;
  E.y = (A.y + C.y)/2;

  // (Bx + Dx) /  2 = Ex
  // (By + Dy) /  2 = Ey
  var D = new Point();
  D.x = 2*E.x - B.x;
  D.y = 2*E.y - B.y;

  return [A, B, C, D];
}

export function getParallelogramArea(points) {
  var [A, B, , D] = points;


  var a = A.subtract(B);
  var b = A.subtract(D);
  var aM = a.vectorLength(); // one side length
  var bM = b.vectorLength(); // second side length


  // http://ru.solverbook.com/my_images/pic65.png
  var alpha = a.angle(b); // PI/2 because we need smallest angle
  return aM * bM * Math.sin(alpha);
}

export default class Parallelogram extends Polygon {

  constructor(epoints, props) {
    super(getParallelogramPoints(getPoints(epoints)), props);
    this._el.setAttribute('class','parallelogram');

    this.onPointMove = this.onPointMove.bind(this);

    this.area = 0;
    this.epoints = epoints;
    this.epoints.forEach(x => x.on('move', this.onPointMove));
    
    this.onCreate();
  }

  onUpdate() {
    super.onUpdate();
    // calculate area.
    this.area = getParallelogramArea(this.getPoints());
  }

  onPointMove() {
    this.setPoints(getParallelogramPoints(getPoints(this.epoints)));
  }

}