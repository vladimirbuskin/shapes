
export default class Point {
  
  constructor(x,y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  isValid() {
    return this.x!=null && this.y!=null;
  }

  vectorLength()
  {
    return Math.sqrt(this.x*this.x + this.y*this.y);
  }

  normalize() {
    var length = this.vectorLength();
    if (length > 0) {
      this.x = this.x / length;
      this.y = this.y / length;
    }
    return this;
  }

  scalar(p) {
    return this.x * p.x + this.y * p.y;
  }

  angle(v) {
    return Math.acos(this.normalize().scalar(v.normalize()))
  }

  angleDeg(v) {
    return this.angle(v) * (180 / Math.PI);
  }

  inverse() {
    return new Point(-this.x, -this.y);
  }

  add(v) {
    return new Point(this.x + v.x, this.y + v.y);
  }
  
  subtract(v) {
    return new Point(this.x - v.x, this.y - v.y);
  }

  validateLimits(minX,minY,maxX,maxY) {
    if (this.x < minX) this.x = minX;
    if (this.y < minY) this.y = minY;
    if (this.x > maxX) this.x = maxX;
    if (this.y > maxY) this.y = maxY;
  }

  toString() {
    return 'x' + this.x + " y" + this.y;
  }
}