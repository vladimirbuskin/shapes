import Figure from './figure'
import { applyStyles, translate } from './utils/styles'

export default class Circle extends Figure
{
  constructor(point, props) {
    // default props
    props = Object.assign({
      'draggable': false,
      'r': 5
    }, props);

    super(point, props);

    var t = this;
    // create element
    t._el = document.createElementNS("http://www.w3.org/2000/svg", "g");
    t._el.setAttribute('class','circle');

    // coordinates
    t._text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t._el.appendChild(this._text);

    // circle
    t._circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    t._el.appendChild(this._circle);

    // that will assign handlers and update first time
    this.onCreate();
  }

  onUpdate() {
    // translate
    translate(this._el, this.getPos());

    // apply common styles to primary object
    applyStyles(this._circle, this.props);

    // circle
    this._circle.setAttribute("r", this.props.r + "px");

    // text
    this.firstUpdate && this._text.setAttribute('text-anchor', "middle");
    this.firstUpdate && this._text.setAttribute('alignment-baseline', "middle");
    this._text.textContent = 'S=' + ((this.props.area + 0.5) | 0);
  }
}