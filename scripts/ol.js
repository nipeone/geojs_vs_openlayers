
// var OLFeatures =  (new ol.format.GeoJSON()).readFeatures(features, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
import { renderer, geojson_path} from './common.js'
var styles = [
  new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: 'blue',
      width: 3
    }),
    fill: new ol.style.Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  })
];

var osmLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});
// var featureLayer = new ol.layer.VectorImage({
//   renderMode: 'image',
//   style: styles,
//   source: new ol.source.Vector({
//     features: OLFeatures
//   }),
// });

var featureLayer = new ol.layer.VectorImage({
  renderMode: 'image',
  style: styles,
  source: new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: geojson_path,
  }),
});

// Use the "webgl" renderer by default.
var map = new ol.Map({
  renderer: renderer,
  layers: [
    osmLayer, 
    featureLayer
  ],
  target: document.getElementById('map'),
  view: new ol.View({
    // center: ol.proj.transform([-88.30, 42.015], 'EPSG:4326', 'EPSG:3857'),
    center: ol.proj.transform([105.77, 35.84], 'EPSG:4326', 'EPSG:3857'),
    zoom: 9
  })
});


