export type ProbeId = 'probe';
export type StateOfAggregationId = 'gas' | 'compound' | 'rock';
export type SolarSystemId =
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune';
export type FrostLineId = 'frost';
export type ExoplanetId = 'planet1' | 'planet2' | 'planet3';

export type TestObjectId =
  | ProbeId
  | StateOfAggregationId
  | SolarSystemId
  | FrostLineId
  | ExoplanetId;

export interface ITestObjectSource {
  id: TestObjectId;
  shortLabel?: string;
  meta?: {
    /**
     * Distance from sun in AU
     */
    distanceFromSun?: number;
    /**
     * Angle from sun in orbit in Deg
     */
    angle?: number;
    /**
     * Placing another object in orbit removes others
     */
    isAloneOnOrbit?: boolean;
    /**
     * Image object is scalable to sun
     */
    isScalable?: boolean;
    /**
     * Should draw orbit for object
     */
    withOrbit?: boolean;
    /**
     * The distance where the planet becomes outer planet and should be scaled differently
     *
     * default: 4 AU
     */
    distanceOuterPlanets?: number;
    /**
     * default: 1.25
     */
    outerObjectScaleDivider?: number;
    /**
     * default: 3
     */
    innerObjectScaleDivider?: number;
  };
}

export interface IPositionToUpdate {
  distance: number;
  distanceInPixels: number;
  coordinates: {
    x: number;
    y: number;
  };
  angle?: number;
}

export interface ITestObject {
  id: TestObjectId;
  readonly imgPath: string;
  readonly image: HTMLImageElement;
  shortLabel?: string;
  meta?: ITestObjectSource['meta'];

  isSelected: boolean;
  isVisibleInBank: boolean;

  isPlaced: boolean;
  distance: number;
  distanceInPixels: number;
  readonly temperature: number;
  coordinates: {
    x: number;
    y: number;
  };
  readonly isOnOwnOrbit: boolean;
  angle: number;

  readonly isProbe: boolean;
  readonly isStateOfAggregation: boolean;
  readonly isSolarSystemPlanet: boolean;
  readonly isFrostLine: boolean;
  readonly isExoplanet: boolean;

  readonly condensed: boolean;
  readonly solidMaterials: 'rock' | 'rock-and-ice';

  updatePosition(position: IPositionToUpdate): void;
  showInBank(): void;
  hideInBank(): void;
}
