var {expect} = require('chai');
import FigureEvent from './figureEvent'

describe('figureEvent.test', function () {

  it('case1', function () {

    var lr = {};
    var le = new FigureEvent(lr);
    
    expect(le.figure).to.equal(lr);
  });

});