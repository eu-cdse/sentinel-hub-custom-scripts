# Magic Eyes

[Copernicus Browser link]()

## Scripts

| Script                                      | Short description    |
| ------------------------------------------- | -------------------- |
| [Visualisation script](./scripts/script.js) | Visualisation script |

## General description of the script

This script is based on a band combination that is regularly used for visual interpretation of satellite imagery: NIR, SWIR and Red assigned to Red, Green and Blue respectively. The aim is to make areas that are different in reality also look different on the visualization, but not to create a scene that is close to true color. This is achieved by using three bands from rather different parts of the optical spectrum (NIR, SWIR and VIS), providing independent measurements of the spectral characteristics of each pixel. However, since Band 11 has a reduced resolution compared to Band 4 and Band 8, we have added a simple pansharpening effect.
This was created by simulating a "panchromatic band", calculating the mean of Bands 2, 3, 4, and 8, and adding those values to Band 11. The intensity of this pansharpening can be modified using a simple weighting factor.
Additionally, the brightness of the image can be adjusted with a simple gain factor.

## Description of representative images

This image shows the Polish-German-Czech triple border on 8 March 2025. Vegetation is bright red to orange and yellow depending on its greenness, deep red areas are coniferous forests. Snow is pink and ice is purple. Open water areas and fresh lava surfaces are black. Urban areas and roads are shown in various shades of grey. Active fires and other hot areas are bright neon green.

!['Sentinel-2 Magic Eye custom script image from 8 March 2025'](./figs/liberec.jpg)

## Author of the script

By András Zlinszky, Sinergise - with help from GitHub Copilot, based on code by Ottó Petrik from Lechner Institute, Hungary.
