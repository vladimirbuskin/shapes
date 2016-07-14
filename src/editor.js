/*global document*/
import Figure from './figures/figure'
import EditorHandler from './handlers/editorHandler'
import Evented from './events/evented'
import LayerEvent from './events/figureEvent'


export default class Editor extends Evented {

  constructor(id) {
    super(id);
    this.layers = [];

    var cont = document.getElementById(id);
    var el = this._el = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    cont.appendChild(el);

    // draw handler
    this._editorHandler = new EditorHandler(this);
    this._editorHandler.enable();
  }

  onClick(ev) {
    this.fire('click', ev);
  }
  
  reset() {
    this.layers.forEach(this.removeLayer.bind(this));
    this.layers.length = 0; 
  }

  getEl() {
    return this._el;
  }

  addLayer(layer) {
    var found = this.layers.find(x => x == layer);
    if (found == null)
    {
      if (layer instanceof Figure)
      {
        this.layers.push(layer);
        layer.onAdd(this);
        this._el.appendChild(layer._el);
        this.fire('addlayer', new LayerEvent(layer));
      }
    }
    return this;
  }

  removeLayer(layer) {
    var found = this.layers.find(x => x == layer);
    if (found != null)
    {
      this.layers = this.layers.filter(x => x != layer);
      if (layer instanceof Figure)
      {
        layer.onRemove(this);
        this.fire('removelayer', new LayerEvent(found));
      }
    }
    return this;
  }
  
}