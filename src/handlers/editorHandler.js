import Handler from './handler'
import MouseEvent from '../events/mouseEvent'


export default class EditorHandler extends Handler {

  constructor(control) {
    super(control);
    this._click = this._click.bind(this);
  }

  addHooks() {
    this.getControl().getEl().addEventListener('click', this._click);
  }

  removeHooks() {
    this.getControl().getEl().removeEventListener('click', this._click);
  }

  _click(ev) {
    this.getControl().onClick(new MouseEvent(ev));
  }
}
