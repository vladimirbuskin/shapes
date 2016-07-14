var { expect } = require('chai');
import Editor from './editor'
import EPoint from './figures/epoint'
import MouseEvent from './events/mouseEvent'

describe('Editor', function() {

  var ed = null;

  beforeEach(function() {
    ed = new Editor('contId');
  });

  it('init', function() {
    expect(ed.layers.length).to.equal(0);
  });

  it('click', function(done) {

    var ev = new MouseEvent({});

    ed.on('click', function (e) {
      expect(e).to.equals(e);
      done();
    });

    ed.fire('click', ev);

  });

  it('addLayerEvent', function(done) {

    var layer = new EPoint(1,1);
    ed.on('addlayer', function (ev) {
      done();
      expect(ev.figure).to.equal(layer);
    });
    ed.addLayer(layer);
  });

  it('removeLayerEvent', function(done) {

    var layer = new EPoint(1,1);
    ed.addLayer(layer);
    ed.on('removelayer', function (ev) {
      done();
      expect(ev.figure).to.equal(layer);
    });
    ed.removeLayer(layer);
  });

  it('reset', function() {

    ed.addLayer(new EPoint(1, 1));
    expect(ed.layers.length).to.equal(1);
    ed.reset();
    expect(ed.layers.length).to.equal(0);
  });

  it('add/remove Layer', function() {

    var pnt = new EPoint(1,1);
    var pnt2 = new EPoint(2,2);

    ed.addLayer(pnt);
    ed.addLayer(pnt);
    expect(ed.layers.length).to.equals(1);

    ed.addLayer(pnt2);
    ed.addLayer({}); // should not be added
    expect(ed.layers.length).to.equals(2);

    ed.removeLayer(new EPoint(2,2)); // not exists
    expect(ed.layers.length).to.equals(2);

    // add one element
    ed.removeLayer(pnt); // not exists
    ed.removeLayer(pnt); // not exists
    expect(ed.layers.length).to.equals(1);

    ed.removeLayer(pnt2); // not exists
    expect(ed.layers.length).to.equals(0);

  });

  it('reset', function() {

    expect(typeof(ed.getEl())).to.equal('object');
  });

});