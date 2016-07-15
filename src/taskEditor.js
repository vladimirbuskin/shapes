import Editor from './editor'
import EPoint from './figures/epoint'
import Circle from './figures/circle'
import Point from './structs/point'
import Parallelogram from './figures/parallelogram'

export default class TaskEditor extends Editor
{
  constructor(id) {
    super(id);
    this.tmpPoints = [];

    // reset button
    this.resetButton = document.getElementById('resetBtn');
    this.resetButton.addEventListener('click',this.onResetClick.bind(this));

    // about button
    this.aboutButton = document.getElementById('aboutBtn');
    this.aboutButton.addEventListener('click',this.onAboutClick.bind(this));

    // ok button
    this.okButton = document.getElementById('okBtn');
    this.okButton.addEventListener('click',this.onOkClick.bind(this));
  }

  onClick(ev) {
    super.onClick(ev);

    var point = new EPoint(ev.point);
    this.tmpPoints.push(point);

    // add right away
    if (this.tmpPoints.length <= 3) this.addLayer(point);

    // when 3 drawn draw other figures
    if (this.tmpPoints.length == 3)
    {
      // parallelogram
      var parallelogram = new Parallelogram(this.tmpPoints);

      // circle
      var circle = new Circle(new Point(10,10), {r:10,'stroke':'#FFEA00'});
      parallelogram.on('updateComplete', function() {
        var pos = this.getPos(); // center point
        var area = this.area; // center point

        // S = Math.PI*r^2 => r = sqrt ( PI  )
        circle.props.r = Math.sqrt(area / Math.PI);
        circle.props.area = area;

        // set center and radius
        circle.setPos(pos);
      });
      parallelogram.update();

      // add layers
      this.addLayer(circle);
      this.addLayer(parallelogram);

      // remove and add again to move them to the top
      this.tmpPoints.forEach(super.removeLayer.bind(this));
      this.tmpPoints.forEach(super.addLayer.bind(this));
      
      this.fire('drawn');
    }

  }

  onResetClick() {
    this.reset();
  }

  reset() {
    super.reset();
    this.tmpPoints.length = 0;
  }

  onAboutClick() {
    document.getElementById('aboutPopup').className = 'popup show';
  }

  onOkClick() {
    document.getElementById('aboutPopup').className = 'popup hide';
  }
}

