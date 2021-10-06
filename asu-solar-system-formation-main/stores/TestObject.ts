import { action, computed, makeObservable, observable } from 'mobx';

import {
  ITestObject,
  ITestObjectSource,
  TestObjectId,
  IPositionToUpdate,
} from 'domainTypes';
import {
  condensationValues,
  DISTANCE_WHERE_EXISTS_ICE,
  IMG_BY_OBJECT_ID,
} from 'utils/objectsMap';
import { calculateTemperature } from 'utils/calculateTemperature';
import { imageCache } from 'utils/imageCache';

export class TestObject implements ITestObject {
  id: TestObjectId;
  shortLabel?: string;
  meta?: ITestObjectSource['meta'];

  isSelected: boolean = false;
  isVisibleInBank: boolean = true;

  isPlaced: boolean = false;
  distance: number = 0;
  distanceInPixels: number = 0;
  coordinates: {
    x: number;
    y: number;
  } = {
    x: 0,
    y: 0,
  };
  angle: number = 0;

  constructor(source: ITestObjectSource) {
    this.id = source.id;
    this.shortLabel = source.shortLabel;
    this.meta = source.meta;

    makeObservable(this, {
      isSelected: observable,
      isVisibleInBank: observable,
      isPlaced: observable,
      distance: observable,
      distanceInPixels: observable,
      coordinates: observable,
      angle: observable,
      temperature: computed,
      condensed: computed,
      solidMaterials: computed,
      isOnOwnOrbit: computed,
      updatePosition: action.bound,
      showInBank: action.bound,
      hideInBank: action.bound,
    });

    imageCache.addToCache(this.imgPath);
  }

  get imgPath(): string {
    return IMG_BY_OBJECT_ID[this.id];
  }

  get image(): HTMLImageElement {
    return imageCache.get(this.imgPath)!;
  }

  get temperature(): number {
    return this.distance ? Math.round(calculateTemperature(this.distance)) : 0;
  }

  get isProbe(): boolean {
    return this.id === 'probe';
  }

  get isStateOfAggregation(): boolean {
    return ['compound', 'gas', 'rock'].includes(this.id);
  }

  get isSolarSystemPlanet(): boolean {
    return [
      'mercury',
      'venus',
      'earth',
      'mars',
      'jupiter',
      'saturn',
      'uranus',
      'neptune',
    ].includes(this.id);
  }

  get isFrostLine(): boolean {
    return this.id === 'frost';
  }

  get isExoplanet(): boolean {
    return ['planet1', 'planet2', 'planet3'].includes(this.id);
  }

  get condensed(): boolean {
    const condensationValue = condensationValues[this.id];
    return condensationValue == null
      ? false
      : this.distance > condensationValue;
  }

  get solidMaterials(): 'rock' | 'rock-and-ice' {
    return this.distance > DISTANCE_WHERE_EXISTS_ICE ? 'rock-and-ice' : 'rock';
  }

  get isOnOwnOrbit(): boolean {
    return this.distance === this.meta?.distanceFromSun;
  }

  updatePosition(position: IPositionToUpdate): void {
    this.isPlaced = true;
    this.distance = Number(position.distance.toFixed(2));
    this.distanceInPixels = position.distanceInPixels;
    this.coordinates = position.coordinates;
    if (position.angle != null) {
      this.angle = position.angle;
    }
  }

  showInBank(): void {
    this.isVisibleInBank = true;
  }

  hideInBank(): void {
    this.isVisibleInBank = false;
  }

  static new(source: ITestObjectSource) {
    return new TestObject(source);
  }
}
