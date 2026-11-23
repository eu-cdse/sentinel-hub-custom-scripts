---
title: "GIFAPAR Color Visualization"
evalscripts: ["script.js"]
types: ["index"]
domains: ["vegetation"]
data-sources: ["Sentinel-3"]
resolutions: ["300m"]
default: ["default"]
---

## General description of the script

GIFAPAR is the Green Instantaneous Fraction of Absorbed Photosynthetically Available Radiation, part of the Sentinel-3 OLCI Level 2 Land product. It gives the share of photosynthetically available radiation that green vegetation absorbs, so higher values mean denser or more actively growing vegetation. The band is unitless and its values run from zero to one.

This script visualises it with a green palette: pale tones for sparse or inactive vegetation, deepening to dark green as values approach one.
