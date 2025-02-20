import os
import json
import math
from feature import FeatureCollection, Feature, Properties, Geometry

num_features = 90000
n = int(math.sqrt(num_features))
lt_x=105. #lt longitude
lt_y=35. #lt latitude
step=0.005
id=1

def get_feature(c, r):
    x_step, y_step = c*step, r*step
    coords = [
            [
                [lt_x+x_step, lt_y+y_step],
                [lt_x+x_step, lt_y+y_step+step],
                [lt_x+x_step+step, lt_y+y_step+step],
                [lt_x+x_step+step, lt_y+y_step],
                [lt_x+x_step, lt_y+y_step],
            ]
        ]
    feature = Feature(Geometry(coords), Properties())
    return feature

def main():
    try:
        fc = FeatureCollection()
        fc.features= [get_feature(c, r) for r in range(n) for c in range(n)]

        os.makedirs("data", exist_ok=True)
        with open("data/features.json", 'w') as f:
            json.dump(fc.to_dict(), f)
    except Exception as e:
        print(e)

if __name__ =='__main__':
    main()