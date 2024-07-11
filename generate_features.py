import os
import json
import math
from feature import FeatureCollection, Feature, Properties, Geometry

num_features = 90000
c = int(math.sqrt(num_features))
# left top latitude(y_min) and longitude(x_min)
x_min=105.
y_min=35
step=0.005
id=1

def get_feature(i, j):
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
    feature = Feature(Geometry(coords), Properties())
    return feature

def main():
    fc = FeatureCollection()

    fc.features= [get_feature(i, j) for i in range(c) for j in range(c)]


    os.makedirs("data", exist_ok=True)
    with open("data/features.json", 'w') as f:
        json.dump(fc.to_dict(), f, indent=4)

if __name__ =='__main__':
    main()