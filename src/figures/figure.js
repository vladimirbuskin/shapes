import Evented from '../events/evented'
import Point from '../structs/point'
import DragHandler from '../handlers/dragHandler'
import LayerEvent from '../events/figureEvent'


export default class Figure extends Evented {

  constructor(point, props) {
    // default props
    props = Object.assign(
      {
        "fill": 'transparent',
        "stroke": 'red',
        "stroke-width": '1px',
        "draggable": false
      },
      props
    );

    // point
    point = Object.assign(
      {
        x: 0,
        y: 0
      },
      point
    );

    super(props);

    this._control = null;
    this.props = props;

    // set pos
    this.pos = new Point(point.x || 0, point.y || 0);
  }

  // assign handlers and update first time
  onCreate() {
    // possibility to override handlers
    this.onHandlers();

    // update styles
    this.firstUpdate = true;
    this.update();
  }

  // we do as separate, to be able to override and chagne default behaviour
  onHandlers() {
    // draggable
    if (this.props["draggable"]) {
      this._dragHandler = new DragHandler(this);
      this._dragHandler.enable();
    }
  }

  getEl() {
    return this._el;
  }

  onAdd(editor) {
    this._control = editor;
    this._control.getEl().appendChild(this.getEl());
  }

  onRemove() {
    this._control.getEl().removeChild(this.getEl());
    this._control = null;
  }

  getPos() {
    return this.pos;
  }

  // drag handler
  setPos(point) {
    this.pos = point || this.pos;

    // snap to grid
    //this.pos.grid(10);

    // validate max values
    this.pos.validateLimits(0,0, document.documentElement.clientWidth, document.documentElement.clientHeight);
    
    this.update();
    this.fire('move', new LayerEvent(this));
  }

  update() {
    var t = this;
    function _update() {
      t.fire('update');
      t.onUpdate();
      t.onUpdateComplete();
      t.fire('updateComplete');
      t._renderTimer = null;
      t.firstUpdate = false;
    }

    _update();

    // // skip prev update
    // if (this._renderTimer) clearTimeout(this._renderTimer);
    //
    // // schedule new update
    // this._renderTimer = setTimeout(_render, 0);
  }

  onUpdate() {

  }

  onUpdateComplete() {

  }

}