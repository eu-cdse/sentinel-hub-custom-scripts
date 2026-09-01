---
title: Normalized difference vegetation index
evalscripts: ["script.js","raw.js"]
types: ["index"]
verifications: ["cites literature"]
domains: ["vegetation","agriculture"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
---
## General description

The well known and widely used NDVI is a simple, but effective index for quantifying green vegetation. It normalizes green leaf scattering in Near Infra-red wavelengths with chlorophyll absorption in red wavelengths.

The value range of the NDVI is -1 to 1. Negative values of NDVI (values approaching -1) correspond to water. Values close to zero (-0.1 to 0.1) generally correspond to barren areas of rock, sand, or snow. Low, positive values represent shrub and grassland (approximately 0.2 to 0.4), while high values indicate temperate and tropical rainforests (values approaching 1). It is a good proxy for live green vegetation; see [^1] for details.

The normalized difference vegetation index, abbreviated NDVI, is defined as   

$$NDVI := \mathtt{Index}(NIR,RED) = \frac{NIR-RED}{NIR+RED}.$$  

For Sentinel-2, the index looks like this:

$$NDVI := \mathtt{Index}(B8,B4) = \frac{B8-B4}{B8+B4}.$$   

## NDVI for other datasets: 

[Landsat 8 NDVI](https://custom-scripts.sentinel-hub.com/landsat-8/ndvi/) = **(B05 - B04) / (B05 + B04)**

Landsat 5 and 7 NDVI = **(B04 - B03) / (B04 + B03)**

ENVISAT MERIS NDVI = **(B13 - B07) / (B13 + B07)**

[Landsat 1-5 MSS NDVI](https://custom-scripts.sentinel-hub.com/landsat-1-5-mss/ndvi/) = **(B04 - B02) / (B04 + B02)**

[Landsat 4-5 TM](https://custom-scripts.sentinel-hub.com/landsat-4-5-tm/ndvi/) = **(B04 - B03) / (B04 + B03)**

[Landsat 7 ETM+ NDVI](https://custom-scripts.sentinel-hub.com/landsat-7-etm/ndvi/) = **(B04 - B03) / (B04 + B03)**

## Description of representative images

NDVI of Rome. Acquired on 8.10.2017.

![NDVI of Rome](fig/fig1.png)

## Color legend
| NDVI range | HTLM color code | Color | 
|------------|-----------------|-------|
| NDVI &lt; -0.5 | #0c0c0c | !#0c0c0c |
| -0.5 &lt; NDVI &leq; 0 | #eaeaea | !#eaeaea |
| 0 &lt; NDVI &leq; .1 | #ccc682 | !#ccc682 |
| .1 &lt; NDVI &leq; .2 | #91bf51 | !#91bf51 |
| .2 &lt; NDVI &leq; .3 | #70a33f | !#70a33f |
| .3 &lt; NDVI &leq; .4 | #4f892d | !#4f892d |
| .4 &lt; NDVI &leq; .5 | #306d1c | !#306d1c |
| .5 &lt; NDVI &leq; .6 | #0f540a | !#0f540a |
| .6 &lt; NDVI &leq; 1.0 | #004400 | !#004400 |

## References
[^1]: Wikipedia, [Normalized Difference Vegetation Index](https://en.wikipedia.org/wiki/Normalized_Difference_Vegetation_Index). Accessed on October 4th 2017.
