---
title: Water Bodies' Mapping - WBM Script
evalscripts: ["script.js"]
types: ["index"]
domains: ["water"]
data-sources: ["Sentinel-2"]
resolutions: ["10m", "20m"]
---

## General description of the script

The goal of the script is to identify water bodies. Script was designed on the basis of indices, which were development and are used by scientific community. Incorporated indices are based on bands, which are included in Sentinel L1C and Landsat 8 data sources. Therefore, script can be used on both. However, script was primarily developed on Sentinel-2 L1C.

Water body mapping can be a basis for any further research on remote sensing in relation to water resources: monitoring water bodies, satellite derived bathymetry, shoreline identification, sediment transport, water bodies' fluctuation with time (tide, river flow, lake, reservoirs, irrigation), classification mapping, water-related disease epidemiology, water quality assessment and monitoring, change in surface water resources, flood hazard/damage assessment and management [14].

Script is based on 6 bands (red, green, blue, NIR, SWIR1, SWIR2) and various indices used for water bodies' detection (NDVI, MNDWI, NDWI, AWEISH, AWEINSH). After water bodies are detected, bands and indices can be also used for additional optional filtering of false detection on urban areas and soil, and in areas with shadows and snow/ice.

As scenes can be different (illumination, cloud coverage, shadow areas, season, data source), basic thresholds for MNDWI and NDWI indices can be easily adjusted for better water bodies' detection. There is also an option to use the script in multi-temporal analysis. Nevertheless, script is most suited for single image analysis.

## Details of the script

**Applicability of the script**

Script is in general globally applicable inland and coastal zones. It is recommended to use scenes with higher illumination, low cloud coverage (<10%), no/low presence of shadow areas. Script works better in flat areas than in hilly and mountainous areas. Nevertheless, false detection of water bodies in mountainous areas can be usually filtered with the script or at least visually differentiated from true water bodies, as later have nucleated (lakes, reservoirs, etc.) or thin line shape (rivers).

**False detection problems and limitations**

Generally, false detection of water bodies in urban areas, bare soil, clouds, snow/ice and shadow areas can be mitigated with 2 filters in script. Nevertheless, it is impossible to correct all false detection on all scenes, especially shadows in low illumination in mountainous areas. Water bodies with low (high depth, black seaweed, dark bottom, shadow area) or high (high turbidity, shallow waters with bright bottom) reflectance might not be detected. In addition, water bodies are usually not detected on location of ships, their wake and white-water. Water bodies might not be detected on areas with high turbidity, low/high reflectance and shadow areas. Naturally, limitation of small water bodies is spatial resolution of data source.

Default values of MNDWI and NDWI thresholds might not be appropriate for all scenes and data sources. Therefore, calibration of thresholds might be needed. In addition, false detection filtering might not work as expected in some scenes.

As anticipated, scenes with high percentage cloud coverage are not appropriate for analysis with the script.

**How the script works**

1. In case of multi-temporal use, user has to set _from_ and _to_ timeline in which scenes should be analysed by:

            var fromD="2019-11-05T00:00:00Z";
            var toD="2019-12-05T00:00:00Z";

2. In case default values of MNDWI and NDWI thresholds do not work as expected (0.42 and 0.4), values should be adjusted (try -0.2, 0.1, 0.4, 0.42 or other for both indices).

            var MNDWI_threshold=0.42;
            var NDWI_threshold=0.4;

3. In case of needed filtering of false detections (urban areas, bare soil, shadows, snow/ice), user can try to turn on two filters:

- Urban areas and bare soil. It is recommended to turn on this filter.

            var filter_UABS=true;

- Shadows, snow/ice. Generally it is recommended to turn off this filter. Use it in low level illumination scenes: clouds, mountainous shadowy areas, winter season. Nevertheless, it is good to turn the filter on in multi-temporal analysis.

            var filter_SSI=false;

On the basis of the settings above, rest of the script gets executed. Firstly, values for setInputComponents is set on the basis of selected data source in EO Browser. As Band 12 does not exist for Landsat 8, script automatically knows which data source is it analysing (Sentinel-2 or Landsat 8). On this basis, appropriate bands for NIR, SWIR1 and SWIR2 are taken.

Then scene(s) are analysed for water body, if red, green and blue channel are not all 0 or 1. In some equations of water body id function, there could be a case of division with zero, which results in an error. Therefore, ìtryî function is implemented. For mentioned case, pixel is not identified as water body.

The most important part of the script is identification of water body, which is done on the basis of various indices and their thresholds.

            if (mndwi>MNDWI_threshold||ndwi>NDWI_threshold||aweinsh>0.1879||aweish>0.1112||ndvi<-0.2||ndwi_leaves>1) {ws=1;}

Thresholds for MNDWI and NDWI can be adjusted in the beginning of the script. Other thresholds are directly input. Values are based on existing research [1,2,3,4,5,6,7,8].

If filtering false detection is on and pixel was identified as water body, filter procedure is implied on the basis of multiple indices, band values and thresholds. Partially, thresholds are set on basis of existing research [9,10,11,12,13] and on the basis of testing the script. Usually, it should correct falsely identified water bodies (urban areas, bare soil, shadows, ice/snow).

To make the script applicable for multi-temporal analysis, average values on red, green, blue bands and water presence on a pixel are added. As expected, _for loop_ with extracting input components values for every scene is included. If there is just single image to analyse, average value is the still appropriate. Therefore, same script can be used for single image analysis.

Multi-temporal analysis outlines pixels as water surface, if they are identified as water body at least in 10% of the scenes in the selected timeline.

## Author of the script

Mohor Gartner

## Description of representative images

Note: all representative images could also be analysed on Landsat 8 data source with this script.

1. Northern Italy, Sentinel-2 & Landsat 8, 2018-08-17

Image is composed from Sentinel-2 (top) and Landsat 8(bottom) data source from 17.8.2018. Most obvious is the location of Adriatic Sea and Venetian Lagoon (east). As well other coastal water bodies are easy to identify: Marano Lagoon, Camale Nicesolo (north-east), Lagoon around Isola Albarella (south) and various river mouths. On the west there is Lago di Garda, partially with some cloud coverage which is correctly excluded from water bodies' detection. On south there is visible river Po. Inland various smaller lakes, ponds, reservoirs are visible. Smaller rivers are only partially visible as they are close or smaller than resolution of data resource (10 or 30 meters).

Generally, water bodies' identification is quite similar for Sentinel-2 and Landsat 8. As Landsat 8 has higher resolution limit, it does not detect smaller water bodies as well as Sentinel-2.

![The script example 1](fig/ex1_NorthItaly_2018-08-17_S2_L8.jpg)

2. Eastern Sri Lanka, Sentinel-2, multi-temporal analysis, 2018-01-01 to 2019-01-01, cloud coverage <5%

Image is composed from multi-temporal analysis (top) and topographic map of the area (bottom). Multi-temporal analysis is done on a basis of scenes from 2018-01-01 to 2019-01-01 with cloud coverage <5%. All bigger water bodies are correctly identified by the script (Indian Ocean on the east with lagoon, various lakes, reservoirs, ponds, etc.). In the coastal area, there are various smaller areas, which are probably result of temporal presence of water surface (tide, rainfall, irrigation). Rivers are mostly not identified. Reason for that are most probably vegetation and high turbidity. In the areas not identified as water bodies, RBG output shows land surface and partially clouds. Reason for later is that non water bodies' surfaces return average RGB value of multi-temporal analysis.

![The script example 2](fig/ex2_EastSrilanka_MT-2018-01-01_2019-01-01+5cloud.jpg)

3. Western Canada, Sentinel-2, 2019-11-12

Image is composed from script analysis (top) and topographic map of the area (bottom). Analysed area is western Canada around Whitehorse. Most of the bigger water bodies are (partially) detected (Lake Laberge, Ajshibik Lake, Sekulmun Lake and smaller lakes). Partially also parts of rivers were identified and can be seen as thin line shapes (south-east). Close-up of the image shows on various false detection of water bodies for individual pixels. Therefore for interpretation of water bodies` mapping in this scene, there is higher probability for water bodies' detected shape has thin line or nucleated shape. In addition, water bodies on the west are not detected as there is thin cloud or fog coverage. Therefore, Kluane Lake is not detected. Filtering false detection of snow/ice area in this scene works quite well, as false detection only happens in shadow areas.

![The script example 3](fig/ex3_Whitehorse_Canada_Sentinel-2_L1C_2019-11-21+map.jpg)

4. Southern Australia, Sentinel-2, 2019-10-24

Image shows south of Australia, part of Lake Alexandria on the coastline. Almost all water bodies are appropriately detected, from ocean and Lake Alexandria, to smaller ponds. Only smaller streams are falsely not detected as water bodies as they are close to the resolution limit and might have present vegetation, which makes detection impossible.

![The script example 3](fig/ex4_LakeAlexandria_SouthAustralia_Sentinel-2_L1C_2019-10-24.jpg)

5. South Democratic Republic of Congo, Sentinel-2, 2019-07-10

Image shows south of Democratic Republic of Congo. Biggest detected water body is Lac Kisale. In addition other water bodies are detected, from lakes, ponds, reservoirs, to rivers. Even though scene has low illumination, water bodies' detection works very well. Comparing with topographic map, there are more water bodies' detected with the script. Shapes of water bodies (nucleated, thin line) shows on right detection and not on false detection of the script.

![The script example 3](fig/ex5_LacKisale_SouthDemocraticRepublicCongo_Sentinel-2_L1C_2019-07-10.jpg)

## Credits

[1] Du, Y., Zhang Y., Ling, F., Wang, Q., Li, W., Li, X. 2016. [Water Bodiesí Mapping from Sentinel-2 Imagery with Modified Normalized Difference Water Index at 10-m Spatial Resolution Produced by Sharpening the SWIR Band.](https://bit.ly/2ZOjvA6)

[2] Feyisa, G.L., Fensholt R., Meilby, H., Proud S. 2014. [Automated Water Extraction Index: A New Technique for Surface Water Mapping Using Landsat Imagery.](https://bit.ly/2ZTvCft)

[3] Acharya, T.D., Subedi, A., Lee, D.H. 2018. [Evaluation of Water Indices for Surface Water Extraction in a Landsat 8 Scene of Nepal.](https://bit.ly/2STVu9p)

## References

[4] Sentinel Hub. [Normalized difference vegetation index.](https://custom-scripts.sentinel-hub.com/sentinel-2/ndvi/)

[5] Wikipedia. [Normalized difference vegetation index.](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index)

[6] Sentinel Hub. [Clouds classification script.](https://custom-scripts.sentinel-hub.com/sentinel-2/hollstein/)

[7] ESA. [Level-2A Algorithm Overview.](https://sentinels.copernicus.eu/web/sentinel/technical-guides/sentinel-2-msi/level-2a/algorithm-overview)

[8] Sentinel Hub. [NDWI Normalized Difference Water Index.](https://custom-scripts.sentinel-hub.com/sentinel-2/ndwi/)

[9] Sentinel Hub Forum. [How to have a NDVI anomaly image.](https://forum.sentinel-hub.com/t/how-to-have-a-ndvi-anomaly-image/671)

[10] Rasul, A., Baltzer, H., Faqe Ibrahim, G.R., Hameed, H.M., Wheeler, J., Adamu, B., Ibrahim, S., Najmaddin, P.M. 2018. [Applying Built-Up and Bare-Soil Indices from Landsat 8 to Cities in Dry Climates.](https://doi.org/10.3390/land7030081)

[11] Lefebvre, G., Davranche, A., Willm, L., Campagna, J., Redmond L., Merle, C., Guelmami, A., Poulin, B. 2019. [Introducing WIW for Detecting the Presence of Water in Wetlands with Landsat and Sentinel Satellites.](https://doi.org/10.3390/rs11192210)

[12] Wei, W., Li Q., Zhang, Y., Du, X., Wang, H. 2018. [Two-Step Urban Water Index (TSUWI): A New Technique for High-Resolution Mapping of Urban Surface Water.](https://doi.org/10.3390/rs10111704)

[13] Yanf, X., Qin, Q., Grussenmeyer, P., Koehl, M. 2018. [Urban surface water body detection with suppressed built-up noise based on water indices from Sentinel-2 MSI imagery.](https://doi.org/10.1016/j.rse.2018.09.016)

[14] Vaibhav, D. and Kumar, D. 2019. [Remote Sensing and GIS Approach for Spatiotemporal Mapping of Ramganga Reservoir.](https://doi.org/10.20546/ijcmas.2019.805.092)
