import { Deck} from '@deck.gl/core';
import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';

import { geojsonPath } from './common.js'

const tileLayer = new TileLayer({
    'id': 'BitmapLayer',
    data: 'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    renderSubLayers: (props) => {
        const { bbox: { west, south, east, north } } = props.tile;

        return new BitmapLayer(props, {
            data: null,
            image: props.data,
            bounds: [west, south, east, north]
        });
    }
});

const featureLayer = new GeoJsonLayer({
    id: 'GeoJsonLayer',
    data: geojsonPath,
  
    stroked: true,
    filled: true,
    lineWidthMinPixels: 2,
    // pointType: 'circle',
    // pickable: true,
    // autoHighlight: true,
  
    getFillColor: [0, 255, 0, 100],
    getLineColor: [5, 10, 40],
    getLineWidth: 3,
    // getPointRadius: 4,
    // getText: f => f.properties.name,
    // getTextSize: 12
});

const deck = new Deck({
  canvas: 'map',
  initialViewState: {
    latitude: 35.84,
    longitude: 105.77,
    zoom: 8,
    bearing: 0,
  },
  controller: {scrollZoom: {speed: 0.1, smooth: true}},
  layers: [
    tileLayer,
    featureLayer
  ]
});