---
title: Pseudo Forest Canopy Density (Pseudo-FCD)
evalscripts: ["script.js"]
types: ["classification"]
verification: ["cites literature"]
domains: ["agriculture", "forest", "urban"]
data-sources: ["Sentinel-2"]
resolutions: ["10m"]
---

## General description of the script

Pseudo Forest Canopy Density classifies each pixel into one of the following categories:

- High Forest
- Low Forest
- Grassland
- Bare land
- Water
- Unknown

This allows the user to explore forest zones to fight deforestation, for agricultural purposes and even for city planning.

According to the reference, the Forest Canopy Density (FCD) is calculated using four different indices:

- Advanced vegetation index (AVI)
- Bare soil index (BI)
- Canopy shadow index (SI)
- Thermal index (not used in my script)

The pseudo-FCD script (and hence the name) implements a custom version of the AVI, BI and SI indices and uses Table 3 shown in the reference along with experimental thresholds to make the classification. It can be used with Sentinel-2 L1C and L2A.

As the main drawback, the script has problems with some water bodies.

Although the default thresholds for each category work quite good for most of the situations (and locations), they can be tweaked depending on the location to fine tune the results. The script can also be configured to avoid detecting water bodies.

## Author of the script

Antonio Carlon Paredes

## Description of representative images

Image 1 shows a pine forest near Valladolid, Spain. It is a forest well known to the author and he have used it as a bechmark for his script.
![Pseudo-FCD script example 1](fig/pseudo-fcd_image1.png)

Image 2 shows Ribadesella, Asturias (Spain), a zone with dense forests by the sea.
![Pseudo-FCD script example 2](fig/pseudo-fcd_image2.png)

Image 3 shows a beautiful zone in New York.
![Pseudo-FCD script example 2](fig/pseudo-fcd_image3.png)

Image 4 shows a forest zone near a lake in Japan.
![Pseudo-FCD script example 2](fig/pseudo-fcd_image4.png)

All of the images show the result of the script using the default parameters.

## Credits

Azadeh ABDOLLAHNEJAD*, Dimitrios PANAGIOTIDIS, Peter SUROV›. "Forest canopy density assessment using different approaches ñ Review". [Journal of Forest Science, 63, 2017 (3): 106ñ115.](https://doi.org/10.17221/110/2016-JFS)
