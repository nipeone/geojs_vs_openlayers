# Geo visualization library compares.

  Openlayers vs GeoJS vs Deck.gl ...

## Introduction

1. use vscode open this folder.

2. generate 90000 features, after exec following command, there will generate data file `data/features.json`.

    `# python ./generate_features.py`

3. install dependencies

    `# npm install`

4. start to run

    `# npm run start`

5. screenshots
![index.html](images/index.jpg)
openlayers
![htmls/ol.html](images/ol.gif)
geojs
![htmls/geojs.html](images/geojs.gif)
deck.gl
![htmls/deckgl.html](images/deckgl.gif)

## Conclusion

    When the number of features is 90k, there is not much difference between the fps of openlayers, geojs and deckgl, but the memory usage of openlayers is the biggest.
    
    when the number of features is 360k, openlayers cannot be displayed, and the fps and memory usage of geojs and deckgl are about the same, fps is around 25.

    When the number of features is 640k, the fps of geojs and deckgl drops to around 15.
