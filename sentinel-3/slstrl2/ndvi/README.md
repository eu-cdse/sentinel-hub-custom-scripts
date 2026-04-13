# Example product

<!-- Example Copernicus Browser link. Replace the URL inside the parentheses with the actual link when available. -->

[Copernicus Browser link](https://link.dataspace.copernicus.eu/uncz)

## Scripts

| Script                                | Short description                            |
| ------------------------------------- | -------------------------------------------- |
| [Visualised](./scripts/visualised.js) | RGB visualisation of NDVI in shades of green |

## General description of the script

The well known and widely used NDVI is a simple, but effective index for quantifying green vegetation. It normalizes green leaf scattering in Near Infra-red wavelengths with chlorophyll absorption in red wavelengths.

The value range of the NDVI is -1 to 1. Negative values of NDVI (values approaching -1) correspond to water. Values close to zero (-0.1 to 0.1) generally correspond to barren areas of rock, sand, or snow. Low, positive values represent shrub and grassland (approximately 0.2 to 0.4), while high values indicate temperate and tropical rainforests (values approaching 1). It is a good proxy for live green vegetation.

The normalized difference vegetation index, abbreviated NDVI, is calculated using near infrared and red wavelengths.

NDVI = (NIR - RED) / (NIR + RED)

For Sentinel-3 SLSTR L2, the NDVI is provided as a pre-computed product band, derived from the red channel S2 (0.659 μm) and the near-infrared channel S3 (0.865 μm):

NDVI = (S3 - S2) / (S3 + S2)

## Description of representative images

![NDVI of Madagascar, acquired on 30 April 2024.](figs/2024-04-30-00_00_2024-04-30_23_59_Sentinel-3-SLSTRL2-NDVI.png)

## References

- Wikipedia, Normalized Difference Vegetation Index. Accessed on October 4th 2017.
- ESA, Sentinel-3 SLSTR Level-2 Products. Available at: https://sentiwiki.copernicus.eu/web/s3-slstr-l2-lst-product
