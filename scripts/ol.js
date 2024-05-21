
import { Map, View } from 'ol/index.js';
import OSM from 'ol/source/OSM.js';
import VectorSource from 'ol/source/Vector.js';
import VectorImageLayer from 'ol/layer/VectorImage.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { transform } from 'ol/proj.js'
import { Style, Stroke, Fill } from 'ol/style.js';
import Layer from 'ol/layer/Layer.js'
import TileLayer from 'ol/layer/Tile.js'
import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer.js';

import { renderer, geojsonPath, getData } from './common.js'

var styles = [
  new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  })
];

class WebGLLayer extends Layer {
  createRenderer() {
    return new WebGLVectorLayerRenderer(this, {
      style: styles,
    });
  }
}

var osmLayer = new TileLayer({
  source: new OSM()
});
var featureLayer = new VectorImageLayer({
  style: styles,
  renderBuffer: 90000,
  source: new VectorSource({
    features: (new GeoJSON()).readFeatures(await getData(), { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' })
  }),
});

// var featureLayer = new VectorImageLayer({
//   renderMode: 'image',
//   style: styles,
//   source: new VectorSource({
//     format: new GeoJSON(),
//     url: geojsonPath,
//   }),
// });

// Use the "webgl" renderer by default.
var map = new Map({
  renderer: renderer,
  layers: [
    osmLayer, 
    featureLayer
  ],
  target: document.getElementById('map'),
  view: new View({
    // center: transform([-88.30, 42.015], 'EPSG:4326', 'EPSG:3857'),
    center: transform([105.77, 35.84], 'EPSG:4326', 'EPSG:3857'),
    zoom: 9
  })
});


