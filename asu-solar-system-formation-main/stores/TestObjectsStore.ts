import {
  makeObservable,
  observable,
  action,
  computed,
  IObservableArray,
} from 'mobx';

import { ITestObject } from 'domainTypes';

export interface ITestObjectsStore {
  objects: ITestObject[];
  readonly selectedObject: ITestObject | null;
  readonly placedObjects: ITestObject[];
  readonly visibleInBankObjects: ITestObject[];
  /**
   * All objects are correctly placed in own orbits
   */
  readonly areCorrectlyPlaced: boolean;

  setObjects(objects: ITestObject[]): void;
  toggleSelection(selectedObject: ITestObject): void;
  selectObject(selectedObject: ITestObject): void;
  removePlacedObjects(): void;
}

export class TestObjectsStore implements ITestObjectsStore {
  objects: ITestObject[] = [];

  constructor() {
    makeObservable(this, {
      objects: observable,
      selectedObject: computed,
      visibleInBankObjects: computed,
      placedObjects: computed,
      setObjects: action.bound,
      toggleSelection: action.bound,
      selectObject: action.bound,
      removePlacedObjects: action.bound,
    });
  }

  get selectedObject(): ITestObject | null {
    return (
      this.objects.find((object: ITestObject) => object.isSelected) || null
    );
  }

  get placedObjects(): ITestObject[] {
    return this.objects
      .filter((object: ITestObject) => object.isPlaced)
      .sort(
        (objectA: ITestObject, objectB: ITestObject): number =>
          objectA.distance - objectB.distance,
      );
  }

  get visibleInBankObjects(): ITestObject[] {
    return this.objects.filter((object: ITestObject) => object.isVisibleInBank);
  }

  get areCorrectlyPlaced(): boolean {
    return this.objects.every((object: ITestObject) => object.isOnOwnOrbit);
  }

  setObjects(objects: ITestObject[]): void {
    (this.objects as IObservableArray).replace(objects);
  }

  toggleSelection(selectedObject: ITestObject): void {
    if (this.selectedObject) {
      if (this.selectedObject.id === selectedObject.id) {
        this.selectedObject.isSelected = !this.selectedObject.isSelected;
      } else {
        this.selectedObject.isSelected = false;
        selectedObject.isSelected = true;
      }
    } else {
      selectedObject.isSelected = true;
    }
  }

  selectObject(selectedObject: ITestObject): void {
    if (this.selectedObject && this.selectedObject.id !== selectedObject.id) {
      this.selectedObject.isSelected = false;
      selectedObject.isSelected = true;
    } else {
      selectedObject.isSelected = true;
    }
  }

  removePlacedObjects() {
    this.placedObjects.forEach(
      (object: ITestObject) => (object.isPlaced = false),
    );
  }
}
