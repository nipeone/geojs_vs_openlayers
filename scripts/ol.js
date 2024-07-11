
import { Map, View } from 'ol/index.js';
import OSM from 'ol/source/OSM.js';
import VectorSource from 'ol/source/Vector.js';
import VectorImageLayer from 'ol/layer/VectorImage.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { transform, fromLonLat } from 'ol/proj.js'
import { Style, Stroke, Fill } from 'ol/style.js';
import Layer from 'ol/layer/Layer.js';
import TileLayer from 'ol/layer/WebGLTile.js';
import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer.js';

import { geojsonPath, getData } from './common.js'

// const style = new Style({
//     stroke: new Stroke({
//       color: 'blue',
//       width: 3
//     }),
//     fill: new Fill({
//       color: 'rgba(0, 0, 255, 0.1)'
//     })
// });

const style = {
  'stroke-color': 'blue',
  'stroke-width': 3,
  'fill-color': 'rgba(0, 0, 255, 0.1)',
}

class WebGLLayer extends Layer {
  createRenderer() {
    return new WebGLVectorLayerRenderer(this, {
      className: this.getClassName(),
      style: style,
    });
  }
}

var osmLayer = new TileLayer({
  source: new OSM()
});

// var featureLayer = new WebGLLayer({
//   source: new VectorSource({
//     features: (new GeoJSON()).readFeatures(await getData(), { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
//   }),
// });

var featureLayer = new WebGLLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: geojsonPath,
  }),
});

// Use the "webgl" renderer by default.
var map = new Map({
  layers: [
    osmLayer, 
    featureLayer
  ],
  target: document.getElementById('map'),
  view: new View({
    // center: transform([105.77, 35.84], 'EPSG:4326', 'EPSG:3857'),
    center: fromLonLat([105.77, 35.84]),
    zoom: 9
  })
});