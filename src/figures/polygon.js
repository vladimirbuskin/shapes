import Figure from './figure'
import Point from '../structs/point'
import { applyStyles } from './utils/styles'

export function pointsToPolygonStr(points) {
  return (points || []).map(p => p.x + "," + p.y).reduce((p,c)=>p+' '+c,'').trim();
}

export function pointsCalculateCenter(points) {
  // calculate position
  var p = points.reduce((p,c) => ({ x: p.x + c.x, y: p.y + c.y }),{x:0,y:0});
  // set position
  return new Point(Math.round(p.x/points.length), p.y/points.length);
}

export function pointsTransfer(points2, prev, curr) {
  // update points when drag triangle
  return points2.map(p => (
  {
    x: p.x + (curr.x - prev.x),
    y: p.y + (curr.y - prev.y)
  }))
}

export default class Polygon extends Figure {

  constructor(points, props) {
    // default props
    props = Object.assign({
      'stroke': '#3F51B5'
    }, props);
    super(null, props);

    this._el = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this._el.setAttribute('class','polygon');
    this.setPoints(points || []);

    this.onCreate();
  }

  getPoints() {
    return this.points;
  }

  setPoints(points) {
    this.points = points;
    // set position
    super.setPos(pointsCalculateCenter(points));
  }

  setPos(point) {
    // update points when drag
    this.setPoints(
      pointsTransfer(
        this.getPoints(), // points
        this.getPos(), // prev position
        point)); // new position
    
    // base call
    super.setPos(point);
  }
  
  onUpdate() {
    // apply common styles to primary object
    this.firstUpdate && applyStyles(this.getEl(), this.props);

    // points attribute
    this.getEl().setAttribute('points', pointsToPolygonStr(this.points));
  }

}