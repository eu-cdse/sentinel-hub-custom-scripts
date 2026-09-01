---
title: "Vegetation and Land Monitoring with Cloud Mask"
evalscripts: ["script.js"]
type: ["index"]
domain: ["vegetation"]
data-source: ["Sentinel-3"]
resolution: ["300m"]
default: ["default"]
---

## Author of the script

By TIZNEGAR Startup Co,
[www.tiznegar.com](https://www.tiznegar.com/)

## General description

Vegetation monitoring index for Sentinel 3 OLCI (VMI3) uses NDVI, a normalized difference index of NIR* and RED wavelengths. The script displays the vegetation index with a continuous colour scale and uses cloud mask to display clouds and snow in white. It also provides a preprepared conditional statement for land classification, by only changing the visualized range.

The index is calculated as:

**VMI3 = (B17 - B08) / (B17 + B08)**

The range of the index is between -1 and 1:

**-1 ≤ VMI3 ≤ 1**

The index shows a very good separation of vegetation, that can be used to monitor changes in periodic studies. Dense, high growing or good quality vegetation is displayed in bold green colors, while thin, low growing or low quality vegetation is displayed in pale green colors. Gray areas indicate high salinity or a desert, white areas are usually clouds or snow, and blue areas indicate water.

*_As the Sentinel-2 NIR equivalent with a central wavelength 832.8 nm is not available for Senitnel-3 OLCI, band 17, with a central wavelength of 865 nm, was used for the NIR part of the equation. Band 17 belongs into narrow near infrared range, similar to B8A in Sentinel-2._

## Description of representative images

![A1](fig/fig1.jpg)
VMI3 index of Iran and Gilan province and Urmia lake

**The range of VMI3 index display can be changed by the user. For example:**

- `if (VMI3 > [ 0.4 ] && VMI3< [ 1 ])`

![A2](fig/fig2.jpg)
In this case, only the areas with the VMI3 index in range of 0.4 to 1 are visualized in a continuous color scale, highlighting Hyrcanian forests in Gilan and agricultural areas around Lake Urmia with green colors. Other areas are returned in true color, with cloud mask in white.

- `if (VMI3 > [ -1 ] && VMI3< [ 0 ])`

![A3](fig/fig3.jpg)
In this image, only areas with the VMI3 index range of -1 to 0 are visualized in a continuous color scale, displaying water areas in blue colors. The water levels of Lake Urmia and Sefidrud Dam in Gilan province are well visible. Other areas are returned in true color, with cloud mask in white.
