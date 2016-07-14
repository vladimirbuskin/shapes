
import Point from '../structs/point';

export default class MouseEvent {

  constructor(event) {
    this.point = new Point(event.clientX, event.clientY);
    this.originalEvent = event;
  }

}