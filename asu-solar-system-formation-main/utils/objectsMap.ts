import { ITestObjectSource, MODES, TestObjectId } from 'domainTypes';
import { BASE_PATH } from './consts';

export const OBJECTS_BY_MODE: Record<MODES, ITestObjectSource[]> = {
  [MODES.PROBE]: [
    {
      id: 'probe',
      meta: {
        isScalable: true,
        innerObjectScaleDivider: 1.4,
        outerObjectScaleDivider: 0.8,
      },
    },
  ],
  [MODES.STATE_OF_AGGREGATION]: [
    {
      id: 'gas',
      meta: {
        isAloneOnOrbit: true,
        isScalable: true,
        innerObjectScaleDivider: 1.4,
        outerObjectScaleDivider: 0.8,
      },
    },
    {
      id: 'compound',
      meta: {
        isAloneOnOrbit: true,
        isScalable: true,
        innerObjectScaleDivider: 1.4,
        outerObjectScaleDivider: 0.8,
      },
    },
    {
      id: 'rock',
      meta: {
        isAloneOnOrbit: true,
        isScalable: true,
        innerObjectScaleDivider: 1.4,
        outerObjectScaleDivider: 0.8,
      },
    },
  ],
  [MODES.SOLAR_SYSTEM]: [
    {
      id: 'mercury',
      shortLabel: 'Me',
      meta: {
        distanceFromSun: 0.39,
        angle: 0,
        isScalable: true,
        withOrbit: true,
      },
    },
    {
      id: 'venus',
      shortLabel: 'V',
      meta: {
        distanceFromSun: 0.72,
        angle: 90,
        isScalable: true,
        withOrbit: true,
      },
    },
    {
      id: 'earth',
      shortLabel: 'E',
      meta: {
        distanceFromSun: 1,
        angle: 180,
        isScalable: true,
        withOrbit: true,
      },
    },
    {
      id: 'mars',
      shortLabel: 'Ma',
      meta: {
        distanceFromSun: 1.52,
        angle: 270,
        isScalable: true,
        withOrbit: true,
      },
    },
    {
      id: 'jupiter',
      shortLabel: 'J',
      meta: {
        distanceFromSun: 5.2,
        angle: 45,
        isScalable: true,
        withOrbit: true,
      },
    },
    {
      id: 'saturn',
      shortLabel: 'S',
      meta: {
        distanceFromSun: 9.58,
        angle: 135,
        isScalable: true,
        withOrbit: true,
      },
    },
    {
      id: 'uranus',
      shortLabel: 'U',
      meta: {
        distanceFromSun: 19.2,
        angle: 225,
        isScalable: true,
        withOrbit: true,
      },
    },
    {
      id: 'neptune',
      shortLabel: 'N',
      meta: {
        distanceFromSun: 30.1,
        angle: 315,
        isScalable: true,
        withOrbit: true,
      },
    },
  ],
  [MODES.FROST_LINE]: [
    {
      id: 'frost',
    },
  ],
  [MODES.EXOPLANETS]: [
    {
      id: 'planet1',
      meta: {
        distanceFromSun: 0.22,
        isScalable: true,
        withOrbit: true,
        distanceOuterPlanets: 1,
        innerObjectScaleDivider: 2,
      },
    },
    {
      id: 'planet2',
      meta: {
        distanceFromSun: 0.32,
        isScalable: true,
        withOrbit: true,
        distanceOuterPlanets: 1,
        innerObjectScaleDivider: 2,
      },
    },
    {
      id: 'planet3',
      meta: {
        distanceFromSun: 0.76,
        isScalable: true,
        withOrbit: true,
        distanceOuterPlanets: 1,
        innerObjectScaleDivider: 2,
      },
    },
  ],
};

export const IMG_BY_OBJECT_ID: Record<
  TestObjectId | 'frost_line_pattern',
  string
> = {
  probe: `${BASE_PATH}/assets/test-objects/mode-1/satellite.svg`,
  gas: `${BASE_PATH}/assets/test-objects/mode-2/hydrogen-helium-gas.svg`,
  compound: `${BASE_PATH}/assets/test-objects/mode-2/hydrogen-compounds.svg`,
  rock: `${BASE_PATH}/assets/test-objects/mode-2/rocks-metals.svg`,
  mercury: `${BASE_PATH}/assets/test-objects/mode-3/test-object-mercury.png`,
  venus: `${BASE_PATH}/assets/test-objects/mode-3/test-object-venus.png`,
  earth: `${BASE_PATH}/assets/test-objects/mode-3/test-object-earth.png`,
  mars: `${BASE_PATH}/assets/test-objects/mode-3/test-object-mars.png`,
  jupiter: `${BASE_PATH}/assets/test-objects/mode-3/test-object-jupiter.png`,
  saturn: `${BASE_PATH}/assets/test-objects/mode-3/saturn2.png`,
  uranus: `${BASE_PATH}/assets/test-objects/mode-3/test-object-uranus.png`,
  neptune: `${BASE_PATH}/assets/test-objects/mode-3/test-object-neptune.png`,
  frost: `${BASE_PATH}/assets/test-objects/mode-3/frost-line.svg`,
  planet1: `${BASE_PATH}/assets/test-objects/mode-4/test-object-planet-1.png`,
  planet2: `${BASE_PATH}/assets/test-objects/mode-4/test-object-planet-2.png`,
  planet3: `${BASE_PATH}/assets/test-objects/mode-4/test-object-planet-3.png`,
  frost_line_pattern: `${BASE_PATH}/assets/frost-line-pattern.png`,
};

/**
 * Distance in AU from object is condensed
 */
export const condensationValues: Partial<Record<TestObjectId, number | null>> =
  {
    gas: null,
    rock: 0.26,
    compound: 4.9,
  };

export const DISTANCE_WHERE_EXISTS_ICE = 4.9;
