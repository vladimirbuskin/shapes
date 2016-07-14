var {expect} = require('chai');
import Circle from './circle'

describe('point.test', function () {

  
  it('case1', function () {

    var point = new Circle({x:1, y:1});
    
    expect(typeof point.getEl()).to.equal('object');
  });

});