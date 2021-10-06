export enum MODES {
  PROBE = '1',
  STATE_OF_AGGREGATION = '2',
  SOLAR_SYSTEM = '3',
  FROST_LINE = '4',
  EXOPLANETS = '5',
}

export interface ISolarSystemCanvasOptions {
  canvasBoundaries: {
    width: number;
    height: number;
  };
  imageBoundaries: {
    width: number;
    height: number;
  };
  sunBoundaries: {
    width: number;
    height: number;
  };
}

export enum OBJECT_PARAMETERS {
  DISTANCE_FROM_THE_SUN = 1,
  TEMPERATURE = 2,
  CONDENSED = 3,
  SOLID_MATERIALS = 4,
}

export enum MODEL_ELEMENTS_VISIBLE {
  ROCKS_AND_METALS_CONDENSE = 1,
  HYDROGEN_COMPOUNDS_CONDENSE = 2,
  FROST_LINE = 3,
  SOLAR_SYSTEM_PLANET_ICONS_AND_ORBITS = 4,
  EXO_SYSTEM_PLANET_ICONS_AND_ORBITS = 5,
}
