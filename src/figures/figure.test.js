import {expect} from 'chai'
import Figure from './figure'
import EPoint from './epoint'
import Polygon from './polygon'
import Editor from '../editor'
import Point from '../structs/point'

describe('figure.test', function () {

  var editor;

  beforeEach(function () {

    editor = new Editor('');

  });

  it('add/remove Layer', function () {

    var fg = new Figure();
    expect(fg._control).to.equal(null);
    editor.addLayer(fg);
    expect(fg._control).to.equal(editor);
    editor.removeLayer(fg);
    expect(fg._control).to.equal(null);

  });

  it('has getEl', function () {
    var fg = new Figure();
    expect(fg.getEl!=null).to.equal(true);
  });

  it('update', function (done) {
    var fg = new Figure();
    fg.update();
    var fg2 = new EPoint({x:1,y:2});
    fg2.getEl().setAttribute = function(name, value) {
      if (name=='cx')
        expect(value).to.equal('1px');
      if (name=='cy')
        expect(value).to.equal('2px');
      done();
    };
    fg2.update();
  });

  it('setPos', function () {
    var pnt = new EPoint();
    expect(pnt.getPos().x).to.equal(0);
    expect(pnt.getPos().y).to.equal(0);
    pnt.setPos(new Point(1,1));
    expect(pnt.getPos().x).to.equal(1);
    expect(pnt.getPos().y).to.equal(1);
  });


  it('setPos2', function () {
    var pnt = new Polygon([{x:1,y:2}]);
    expect(pnt.getPos().x).to.equal(1);
    expect(pnt.getPos().y).to.equal(2);
  });

  it('onUpdate event', function (done) {
    var f1 = new Figure();
    var f2 = new EPoint();
    var f3 = new Polygon();

    var cnt = 0;
    var count = () => {cnt++; if (cnt>=2) done(); }

    f1.on('update', function() {
    });
    f2.on('update', function() {
      count();
    });
    f3.on('update', function() {
      count();
    });
    f1.update();
    f2.update();
    f3.update();
  });
});