
import Map from 'ol/Map';
import {OSM} from 'ol/source';
import {Layer, Tile as TileLayer} from 'ol/layer';
import View from 'ol/View';
import {fromLonLat, toLonLat} from 'ol/proj';
import {defaults as defaultControls} from 'ol/control.js';

import { geojsonPath, getData } from './common.js'

// DECK
import {Deck} from '@deck.gl/core';
import {GeoJsonLayer} from '@deck.gl/layers';

// const style = new Style({
//     stroke: new Stroke({
//       color: 'blue',
//       width: 3
//     }),
//     fill: new Fill({
//       color: 'rgba(0, 0, 255, 0.1)'
//     })
// });


const featureLayerGL = new GeoJsonLayer({
    id: 'GeoJsonLayer',
    data: geojsonPath,
  
    stroked: true,
    filled: true,
    lineWidthMinPixels: 2,
    // pointType: 'circle',
    // pickable: true,
    // autoHighlight: true,
  
    getFillColor: [0, 255, 0, 100],
    getLineColor: [65, 255, 21],
    getLineWidth: 3,
    // getPointRadius: 4,
    // getText: f => f.properties.name,
    // getTextSize: 12
});

const deck = new Deck({
  initialViewState: {
    latitude: 35.84,
    longitude: 105.77,
    zoom: 8,
    bearing: 0,
  },
  parent: document.getElementById('map'),
  // canvas: "map",
  // style: {pointerEvents: 'none', 'z-index': 1},
  controller: {scrollZoom: {speed: 0.1, smooth: true}},
  layers: [
    featureLayerGL
  ]
});

// Sync deck view with OL view
const deckLayer = new Layer({
    render({size, viewState}) {
      const [width, height] = size;
      const [longitude, latitude] = toLonLat(viewState.center);
      const zoom = viewState.zoom - 1;
      const bearing = (-viewState.rotation * 180) / Math.PI;
      const deckViewState = {bearing, longitude, latitude, zoom};
      deck.setProps({width, height, viewState: deckViewState});
      deck.redraw();
    }
  });

var osmLayer = new TileLayer({
  source: new OSM()
});


// Use the "webgl" renderer by default.
var map = new Map({
  layers: [
    // osmLayer, 
    deckLayer
  ],
  target: document.getElementById('map'),
  controls: defaultControls({attribution: false, zoom: false, rotate: false}),
  view: new View({
    // center: transform([105.77, 35.84], 'EPSG:4326', 'EPSG:3857'),
    center: fromLonLat([105.77, 35.84]),
    zoom: 9
  })
});