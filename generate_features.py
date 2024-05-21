import os
import json
import numpy as np
from feature import FeatureCollection, Feature, Properties, Geometry

x_min=105.
y_min=35
step=0.005
id=1

fc = FeatureCollection()
for i in range(300):
    for j in range(300):
        x_step, y_step =i*step, j*step
        coords = [
                [
                    [x_min+x_step, y_min+y_step],
                    [x_min+x_step, y_min+y_step+step],
                    [x_min+x_step+step, y_min+y_step+step],
                    [x_min+x_step+step, y_min+y_step],
                    [x_min+x_step, y_min+y_step],
                ]
            ]
        properties = Properties(id=id)
        geomory = Geometry(np.around(coords, decimals=3).tolist())
        feature = Feature(geomory, properties)
        fc.features.append(feature)
        id+=1

if not os.path.exists("data"):
    os.makedirs("data")
with open("data/features.json", 'w') as f:
    json.dump(fc.to_dict(), f, indent=4)
