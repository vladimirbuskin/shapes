
import Point from '../structs/point';

export default class MouseEvent {

  constructor(event) {
    let touch = event;
    if (event.touches) {
      touch = event.touches[0];
    }
    this.point = new Point(touch.clientX, touch.clientY);
    this.originalEvent = event;
  }

}