import Handler from './handler'
import MouseEvent from '../events/mouseEvent'
import { stopPropagation } from '../utils/domEvents'

export default class DragHandler extends Handler {

  constructor(control) {
    super(control);
    this._onDown = this._onDown.bind(this);
    this._onMove = this._onMove.bind(this);
    this._onUp = this._onUp.bind(this);
  }

  addHooks() {
    this.getControl().getEl().addEventListener('click', stopPropagation);
    this.getControl().getEl().addEventListener('mousedown', this._onDown);
    this.getControl().getEl().addEventListener('touchstart', this._onDown);
  }

  removeHooks() {
    this.getControl().getEl().removeEventListener('click', stopPropagation);
    this.getControl().getEl().removeEventListener('mousedown', this._onDown);
    this.getControl().getEl().removeEventListener('touchstart', this._onDown);
  }

  _onDown(e) {
    e.preventDefault();
    e.stopPropagation();

    // calculate offset
    var initPos = this.getControl().getPos();
    this.offset = (new MouseEvent(e)).point.subtract(initPos);
    
    // move, up handlers
    document.addEventListener('mousemove', this._onMove);
    document.addEventListener('mouseup', this._onUp);

    // have to be passive because we do touch events
    document.addEventListener('touchmove', this._onMove, { passive: false });
    document.addEventListener('touchend', this._onUp, { passive: false });
  }

  _onMove(e) {
    e.preventDefault();
    e.stopPropagation(e);

    var ev = new MouseEvent(e);
    this.getControl().setPos(ev.point.subtract(this.offset));
  }

  _onUp(e) {
    e.stopPropagation();
    // move, up handlers
    document.removeEventListener('mousemove', this._onMove);
    document.removeEventListener('mouseup', this._onUp);

    document.removeEventListener('touchmove', this._onMove);
    document.removeEventListener('touchend', this._onUp);
  }
}



