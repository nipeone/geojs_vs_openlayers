#coding=utf-8
from typing import List
import json
import os
from shapely.geometry import Polygon


class CustomJsonDecoder(json.JSONDecoder):
    # def __init__(self):
    #     json.JSONDecoder.__init__(self, object_hook=self.dict_object_hook)

    # def dict_object_hook(self, d):
    #     args = {key: value for key, value in d.items()}
    #     return self(**args)

    def default(self, o):
        return o.__dict__

class Geometry:
    def __init__(self, coordinates:List[List[float]]=None, type:str="Polygon"):
        self.type = type
        self.coordinates = coordinates
        self._polygon = Polygon(*coordinates)

    def to_dict(self):
        d = {}
        if self.type:
            d.update({"type":self.type})
        if self.coordinates:
            d.update({"coordinates":self.coordinates})

        return d

    def bounds(self, layout="xywh"):
        '''polygon bounds'''
        min_x, min_y, max_x, max_y = [int(item) for item in self._polygon.bounds]
        if layout == "xywh":
            return min_x, min_y, max_x - min_x, max_y - min_y
        else:
            return min_x, min_y, max_x, max_y
    

class Classification:
    def __init__(self, name=None, color:list=None):
        self.name = name
        self.color = color

    def to_dict(self):
        d = {}
        if self.name:
            d.update({"name":self.name})
        if self.color:
            d.update({"color":self.color})
        return d
    
    

class Properties:
    def __init__(self, classification:Classification=None, isLocked:bool=None, object_type:str=None, id:int=None):
        self.object_type = object_type
        if isinstance(classification, dict):
            if "colorRGB" in classification:
                rgb = classification.pop("colorRGB")
                rgb = ~rgb if rgb<0 else rgb
                classification["color"] = [(rgb>>16)&255, (rgb>>8)&255, rgb&255]
            self.classification = Classification(**classification)
        else:
            self.classification = classification
        self.isLocked = isLocked
        self.id = id

    def to_dict(self):
        d = {}
        if self.object_type:
            d.update({"object_type":self.object_type})
        if self.classification:
            d.update({"classification":self.classification.to_dict()})
        if self.isLocked:
            d.update({"isLocked":self.isLocked})
        if self.id:
            d.update({"id": self.id})
        return d

class Feature:
    def __init__(self, geometry, properties, type:str="Feature", id=None):
        self.id = id
        self.type = type
        self.geometry = Geometry(**geometry) \
                            if isinstance(geometry, dict) else geometry
        if isinstance(properties, dict):
            # 兼容qupath4.x和3.x输出的geojson
            if "objectType" in properties:
                properties["object_type"] = properties.pop("objectType")
            if "isLocked" not in properties:
                properties["isLocked"]= False
            self.properties = Properties(**properties)
        else:
            self.properties = properties
        
    def to_dict(self):
        d = {}
        if self.type:
            d.update({"type":self.type})
        if self.geometry:
            d.update({"geometry":self.geometry.to_dict()})
        if self.properties:
            d.update({"properties":self.properties.to_dict()})
        if self.id:
            d.update({"id": self.id})
        return d
    
class FeatureCollection:
    def __init__(self, features:List[Feature]=[], type:str='FeatureCollection'):
        self.type = type
        self.features = [Feature(**feature) if isinstance(feature,dict) else feature for feature in features]
        self._index = 0

    def to_dict(self):
        return {"type":self.type, "features":[_.to_dict() for _ in self.features]}
    
    @classmethod
    def from_dict(cls, d):
        return cls(features=d["features"], type=d["type"])
    
    def __len__(self):
        return len(self.features)
    
    def __getitem__(self, idx:int)->Feature:
        if idx >= len(self.features):
            raise IndexError("features index out of range")
        return self.features[idx]
    
    def __iter__(self):
        return self

    def __next__(self)->Feature:
        if self._index >= len(self.features):
            self._index = 0
            raise StopIteration
        item = self.features[self._index]
        self._index += 1
        return item
            

    @classmethod
    def load(cls, anno_path:str):
        if os.path.exists(anno_path):
            with open(anno_path, 'r', encoding='utf-8') as f:
                anno_dict =  json.load(f)
                return cls(**anno_dict)
        else:
            return None
    
    def save(self, anno_path:str):
        with open(anno_path, 'w', encoding='utf-8') as f:
            anno_dict = self.to_dict()
            json.dump(anno_dict, f, indent=4, ensure_ascii=False)

