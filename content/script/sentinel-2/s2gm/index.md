---
title: Sentinel-2 Global Mosaic best pixel selection script
evalscripts: ["script.js"]
types: ["index"]
domains: ["preprocessing"]
data-sources: ["Sentinel-2"]
resolutions: ["10m","20m","60m"]
---


## General description

Sentinel-2 Global Mosaic script is used within [S2GM project](https://s2gm.land.copernicus.eu/) to select best pixel within the chosen temporal period (10-daily, monthly, quarterly, annual).

Script requires Sentinel Hub API v.2 to run as a whole due to multi-part result. Parts of it can however be used at this point already.
