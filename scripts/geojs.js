import geo from "geojs"

import { renderer, getData } from './common.js'

var map = geo.map({
    'node': '#map',
    center: {x: 105.77, y: 35.84},
    zoom: 9
});

var osmLayer = map.createLayer('osm');
// only support webgl, if use canvas display nothing.
var featureLayer = map.createLayer('feature', { renderer: renderer });
var reader = geo.createFileReader('geojsonReader', { layer: featureLayer });

var features = await getData();
if (reader.canRead(features)){
  reader.read(features, (_features) => {
    // features[0].draw();
    // Or we can draw the whole map
    map.draw();
  });
}
// fetch(geojson_path).then(async res => {
//   if (res.ok) {
//     var features = await res.json();
//     if (reader.canRead(features)){
//       reader.read(features, (_features) => {
//         // features[0].draw();
//         // Or we can draw the whole map
//         map.draw();
//       });
//     }
//   }
// }).catch(err => {
//   console.error(err);
// });

// map.geoOn(geo.event.mousemove, function (evt) {
//     $('#info').text('x: ' + evt.geo.x.toFixed(6) + ', y: ' + evt.geo.y.toFixed(6));
//   });