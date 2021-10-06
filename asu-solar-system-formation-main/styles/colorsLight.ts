import { alpha } from '@material-ui/core';

import { ColorDefs } from './colorDefs';

export const ColorsLight = {
  appBackgroundColor: ColorDefs['unnamed-color-2D3A4C'],

  // defaults
  defaultBorderColor: ColorDefs['unnamed-color-344857'],

  sectionTitleTextColor: ColorDefs['unnamed-color-EBEBEB'],
  sectionTitleBackgroundColor: ColorDefs['unnamed-color-092133'],

  // Test object
  testObjectBackgroundColor: ColorDefs['unnamed-color-242E3D'],
  testObjectSelectedBackgroundColor: ColorDefs['unnamed-color-12171E'],
  testObjectSelectedDisabledBackgroundColor: ColorDefs['unnamed-color-242E3D'],
  testObjectBorderColor: ColorDefs['unnamed-color-242E3D'],
  testObjectSelectedBorderColor: ColorDefs['unnamed-color-FFC844'],
  testObjectSelectedDisabledBorderColor: ColorDefs['unnamed-color-858585'],
  testObjectShortLabelTextColor: ColorDefs['unnamed-color-333333'],
  testObjectShortLabelBackgroundColor: ColorDefs.neutralWhite,

  // RadiusSlider
  radiusSliderBackgroundColor: ColorDefs['unnamed-color-344857'],
  radiusSliderRailColor: ColorDefs.neutralBlack,
  radiusSliderThumbColor: ColorDefs['unnamed-color-FFC844'],
  radiusSliderThumbDisabledColor: ColorDefs['unnamed-color-858585'],
  radiusSliderLabelColor: ColorDefs['unnamed-color-EBEBEB'],
  radiusSliderLabelDisabledColor: ColorDefs['unnamed-color-858585'],
  radiusSliderValueLabelColor: ColorDefs.neutralBlack,
  radiusSliderValueLabelBackgroundColor: ColorDefs.neutralWhite,
  radiusSliderValueLabelDisabledBackgroundColor:
    ColorDefs['unnamed-color-858585'],

  // Test Object Parameters
  testObjectParametersTextColor: ColorDefs['unnamed-color-EBEBEB'],
  testObjectParametersBackgroundColor: ColorDefs.neutralBlack,

  // Solar System
  solarSystemEdge: ColorDefs['unnamed-color-FFC844'],
  frostLineColor: ColorDefs['unnamed-color-0DA2D9'],
  objectOrbitColor: ColorDefs['unnamed-color-707070'],
  solarSystemRockCondenseAreaColor: alpha(
    ColorDefs['unnamed-color-FFC844'],
    0.45,
  ),

  // Buttons
  primaryButtonTextColor: ColorDefs.neutralBlack,
  primaryButtonBackgroundColor: ColorDefs['unnamed-color-FFC844'],
  primaryButtonActiveBackgroundColor: alpha(
    ColorDefs['unnamed-color-FFC844'],
    0.8,
  ),
  primaryButtonDisabledBackgroundColor: ColorDefs['unnamed-color-858585'],
  secondaryButtonTextColor: ColorDefs['unnamed-color-EBEBEB'],

  // Graph
  clearGraphButtonWrapperBackgroundColor: ColorDefs['unnamed-color-344857'],
  clearGraphButtonTextColor: ColorDefs['unnamed-color-EBEBEB'],
  clearGraphButtonIconColor: ColorDefs['unnamed-color-FFC844'],
  clearGraphDisabledButtonTextColor: ColorDefs['unnamed-color-858585'],
  clearGraphDisabledButtonIconColor: ColorDefs['unnamed-color-858585'],
  graphTextColor: ColorDefs['unnamed-color-EBEBEB'],
  graphGridLineColor: ColorDefs['unnamed-color-516A7D'],
  graphTrendLineColor: ColorDefs['unnamed-color-FFC844'],
  graphTemperatureAreaColor: alpha(ColorDefs['unnamed-color-FFC844'], 0.4),
  graphFrostLineAreaColor: ColorDefs['unnamed-color-0DA2D9'],

  // Modal
  modalBackgroundColor: ColorDefs['unnamed-color-2D3A4C'],
  modalTextColor: ColorDefs['unnamed-color-EBEBEB'],
  modalActionsBackgroundColor: ColorDefs['unnamed-color-344857'],
  modalTitleBackgroundColor: ColorDefs['unnamed-color-092133'],
};
