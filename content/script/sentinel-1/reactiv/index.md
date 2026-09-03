---
title: Reactiv Script
evalscripts: ["script.js"]
type: ["composite"]
resolution: ["10m"]
data-source: ["Sentinel-1"]
default: ["default"]
verification: ["cites literature"]
---

## General description of the script

### Script Introduction

This code was developed at Onera as part of the MEDUSA project. It is a visualization of a stack of SAR images highlighting change detection. Exploiting the HSV, it focuses on the temporal dimension for calculation and does not rely on any spatial computation. For this project, Sentinel-1 IW VV-VH images were used. The orbit was also fixed whether to ASCENDING or to DESCENDING when manipulating time-series. Its ultimate objective is to synthesize activity information embedded into a temporal data profile, all within a single colored image, emphasizing the presence or absence of significant change in bright colors.

### Intents & Motivations

Difficult to interpret because of their geometry and speckle noise, SAR images are however very useful and effective in change detection. Until the advent of Sentinel-1 data from the Copernicus program, access to temporal stacks of data was scarce, and most algorithms focused on the spatial component of images. The recent context of big data opens many possibilities for SAR image processing, and one of the most remarkable is the access and the analysis of time-series.
Exploiting the time dimension can be useful for filtering speckle noise. Indeed, in the absence of change, we have access, in a single pixel, to N realizations of a random signal.
In the algorithm proposed here, we wish not only to improve the signal-to-noise ratio, but also to detect all the pixels for which a change occurred between the first and the last observation date. These generic changes can be either short changes in time (e.g. boats) or longer/permanent changes (e.g. a construction site).
The REACTIV algorithm can display insights in different circumstances, such as monitoring of:

- port areas, for highlighting maritime shipping routes;
- urban areas, for the observation of city sprawl;
- environment, to quickly map changes in forest cover;
- agricultural practices, to monitor the occupation of cultivated plots and improve cultivation methods.

### Script Description

The HSV space consists of 3 components: the Hue, the Saturation and the Value. We detail below how these three components are used in the representation.

See also the [supplementary material](supplementary_material.pdf) for details.

#### The Hue component: the time dimension

The Hue component represents which color of the color wheel is used. The Hue component encodes the dating information of the event. We select the time index of maximum signal value for the pixel pij across all polarisation l. We then calculate a time difference between the maximal time index and this time index, that we then divide by the difference between the maximal and minimal time index. To simplify, we rescale the relative time measure of change event to be between 0 and 1.
Additionally, our Hue color range is defined as a number between 0 and 1. However, we noticed a huge resemblance between the extreme start and end color of the spectrum. For that matter, we decided to fix the maximum value of the interval to a, with a being here 0.9. We do so by multiplying the final Hue value by 0.9 to reduce the initial [0,1] range to a simpler [0, 0.9] range.

#### The Saturation component: change intensity

The Saturation component, responsible for how intense the color picked by the hue value will be, is bound to the change intensity: the bigger the change, the more saturated the color will appear. This means that white spots on the map represent places with low changes over time. The closer to 1, the more vivid the color; oppositely, the closer to 0, the duller the color. See the [supplementary material](supplementary_material.pdf) for details.

#### The Value component: usual radar intensity

Finally, to keep the usual SAR Image look, the value component ranging from dark to bright, represents the maximum value of the input signal over both polarization. We empirically found that this setting does not provide sufficient details for change to be localizable but also contextualized, i.e. for surroundings to be recognizable: hence, the intensity has been averaged with the mean max signal of the pixel at each timestep. See the [supplementary material](supplementary_material.pdf) for details.

## Details of the script

This script was developed using the Sentinel Hub EO Browser and explored the potential of time series analysis using the timespan option of the platform. The script has an adaptive linear change detection range that is expressed in relative values, i.e. between 0 and 1 (0 being closer to the start of the temporal stack and 1 being closer to the end). This enables our algorithm to perform over different periods, of different sizes and to have somewhat comparable results. Additionally, it does not suffer from resolution issues as no spatial computation is performed: it is a fully temporal analysis algorithm and hence is not subject to any problem that may happen when processing spatial SAR information. Furthermore, the PolSAR aspect of the algorithm is not crucial to its functioning: it has been tested on single polarisation data as well by isolating VH and VV data channels for Sentinel-1 imagery. Additionally, it is able to adapt to many different situations and geographical context, as proven with the following pictures. However, it may suffer from noisiness in highly changing regions.

## Authors of the script

Thomas Di Martino, Elise Colin-Koeniguer, Regis Guinvarc'h, Laetitia Thirion-Lefevre

## Description of representative images

1. Maritime Routes: Shanghai Port

In this Shanghai Port image, and thanks to the REACTIV method, maritime routes are very explicit. Additionally, the time dimension represented by the chosen color seems to indicate that the northern entry path to the port is only opened during certain parts of the year as only red and shaded blue boats appear to be there. This provides insights on the functioning of ports and possible maritime legislation.

![Maritime Routes: Shanghai Port](fig/shanghai_port.png)

2. Vegetation monitoring: Shanghai Wetlands

Situated close to the Chongming Dongtan birds national nature reserve in Shanghai, the Shanghai wetlands are a very distinct ecosystem that is usually flooded with water on seasonal occasions, inducing huge variability in its environment and in its dielectric properties, crucial for SAR imagery. This variability is expected to be found and to be localised. As we can see this picture, we do have change being detected cohesively across the different subsurfaces of wetland. This is manifested by regions portrayed as green for some and pink for others.
When checking the Hue range, we notice that green is located around the first third of the time interval, meaning around the end of 2018 while the pink values are located at the end of the interval, meaning the end of 2020. These similar yearly periods show how the REACTIV method successfully captured a seasonal and periodical event within the Shanghai wetlands.

![Vegetation monitoring: Shanghai Wetlands](fig/shanghai_wetland.png)

3. Urban sprawl: Wuhan City

Given recent events and the efforts deployed by the Chinese government to build emergency hospitals, the city of Wuhan displayed interesting results with regards to change detection tasks. Most recent buildings, plots with colors of the end of the Hue spectrum (i.e. shades of pink) are noticeable throughout this map. One particular example is the Huoshenshan Hospital located on the Zhiyinhu Boulevard. As displayed in the zoomed image, we notice violet (shaded dark-pink) which represents high activity spike in the last months of recording, which correlates with the cityís plans to build emergency hospitals. Other locations around the city have similar color spots that most probably also are constructions built in the context of COVID-19.

![Urban sprawl: Wuhan City](fig/wuhan.png)

![Urban sprawl: Wuhan City - Hospital zoom](fig/wuhan_hospital_zoom.png)

## Credits

The REACTIV method was developed and presented in [1]. Additionally, a french paper has also been redacted: [2] which received the first price of the french CFPT congress. Finally, existing code implementing this method can be found in the following link with Python and GEE implementations.

## References

[1] Elise Colin Koeniguer, Alexandre Boulch, Pauline Trouve-Peloux and Fabrice Janez. Colored visualization of multitemporal data for change detection: issues and methods. EUSAR, 2018.

[2] Elise Colin Koeniguer, Jean-Marie Nicolas, Beatrice Pinel-Puyssegur, J.-M. Lagrange and Fabrice Janez. Visualisation des changements sur s¥eries temporelles radar : m¥ethode REACTIV ¥evalu¥ee `a lí¥echelle mondiale sous Google Earth Engine. (French) RFPT, N. 217-218, 2018
