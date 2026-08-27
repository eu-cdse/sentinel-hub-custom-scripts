---
title: ARI - Anthocyanin Reflectance Index
evalscripts: ["script.js"]
types: ["index"]
verifications: ["cites literature"]
domains: ["forest","agriculture"]
data-sources: ["Sentinel-2"]
resolutions: ["10m","20m"]
---

## General description of the script

Anthocyanins are pigments common in higher plants, causing their red, blue and purple coloration. They provide valuable information about the physiological status of plants, as they are considered indicators of various types of plant stresses.

The reflectance of anthocyanin is highest around 550nm. However, the same wavelengths are reflected by chlorophyll as well. To isolate the anthocyanins, the 700nm spectral band, that reflects only chlorophyll and not anthocyanins, is subtracted. 

ARI looks like this:

**ARI1 = (1 / 550nm) - (1 / 700nm)** 

For Sentinel-2, the index would be calculated using the green spectral band (B03) and a red edge spectral band (B05) as follows: 

**ARI1 = (1 / B03) - (1 / B05)**

ARI values for the examined trees in this original article ranged in values from 0 to 0.2. 

## Description of representative images

ARI applied to Rome. Acquired on 10.12.2019, processed by Sentinel Hub. 

![ARI, Rome](fig/fig1.jpg)

## References
- [Non-Destructive Estimation of Anthocyanins and Chlorophylls in Anthocyanic Leaves (Gitelson, Chivkunova, Merzlyak)](https://digitalcommons.unl.edu/cgi/viewcontent.cgi?article=1227&context=natrespapers)
- [Vegetation Analysis: Using Vegetation Indices in ENVI](https://www.harrisgeospatial.com/Support/Self-Help-Tools/Help-Articles/Help-Articles-Detail/ArtMID/10220/ArticleID/16162/Vegetation-Analysis-Using-Vegetation-Indices-in-ENVI)
