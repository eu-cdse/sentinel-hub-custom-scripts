---
title: Ship detection with Sentinel-1 and Sentinel-2
evalscripts: ["script.js"]
domain: ["water"]
data-source: ["Data fusion", "Sentinel-1", "Sentinel-2"]
type: ["classification"]
default: ["custom"]
---
  
## General description of the script  
  
This script masks water areas using Sentinel-2 NDWI, and returns the high NDWI pixels, which also highly reflect VV and VH polarizations, in white, displaying ships. The script tends to overestimate in narrow water corridors, over bridges, and it has cross-like artefacts where pixels are extremely reflective. It often underestimates ships of red color. It can be useful to generally estimate ship traffic density.

## Author of the script: 
Monja B. Šebela

## Description of representative images  
  
**Ship traffic of Yangtze river, at Zhenjiang and Yangzhong, China**
![ships](fig/fig1.jpg) 
