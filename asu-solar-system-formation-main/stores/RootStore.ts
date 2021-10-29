import {
  ITestObject,
  MODES,
  OBJECT_PARAMETERS,
  IGraphItem,
  TestObjectId,
  ICapiModel,
  IPositionToUpdate,
} from 'domainTypes';
import { IReactionDisposer, reaction, runInAction, set } from 'mobx';

import isNumber from 'lodash/isNumber';

import { OBJECTS_BY_MODE } from 'utils/objectsMap';
import { getSunDiameter } from 'utils/canvas';

import { ISettingsStore, SettingsStore } from './SettingsStore';
import { ITestObjectsStore, TestObjectsStore } from './TestObjectsStore';
import { IGraphStore, GraphStore } from './GraphStore';
import { TestObject } from './TestObject';
import { capi } from './capi';
import {
  getCoordinatesForDistance,
  updatePositionForDistance,
} from 'utils/measureDistance';
import { MIN_OBJECT_RADIUS } from 'utils/consts';

export interface IRootStore {
  testObjectsStore: ITestObjectsStore;
  settingsStore: ISettingsStore;
  graphStore: IGraphStore;

  addSelectedToGraph(): void;
  godMode(): void;
}

export class RootStore implements IRootStore {
  testObjectsStore: ITestObjectsStore = new TestObjectsStore();
  settingsStore: ISettingsStore = new SettingsStore();
  graphStore: IGraphStore = new GraphStore();
  private isGodModeEnabled: boolean = false;

  constructor() {
    this.initReactions();
    this.initCAPIHandlers();
    this.initCAPISetters();
  }

  private initReactions(): void {
    let replacePointOnGraphDisposer: IReactionDisposer | null | undefined;
    let selectingObjectDisposer: IReactionDisposer | null | undefined;

    reaction(
      () => this.settingsStore.mode,
      (mode: MODES | null, prevMode: MODES | null) => {
        replacePointOnGraphDisposer?.();
        if (prevMode === MODES.SOLAR_SYSTEM && mode === MODES.FROST_LINE) {
          this.testObjectsStore.objects.forEach((object: ITestObject) =>
            object.isFrostLine ? object.showInBank() : object.hideInBank(),
          );
          if (
            this.testObjectsStore.objects.find(
              (object: ITestObject) => object.isFrostLine,
            ) == null
          ) {
            this.testObjectsStore.objects.push(
              TestObject.new(OBJECTS_BY_MODE[MODES.FROST_LINE][0]),
            );
          }
        } else if (
          prevMode === MODES.FROST_LINE &&
          mode === MODES.SOLAR_SYSTEM
        ) {
          this.testObjectsStore.objects.forEach((object: ITestObject) =>
            object.isFrostLine ? object.hideInBank() : object.showInBank(),
          );
        } else {
          this.testObjectsStore.setObjects(
            mode == null ? [] : OBJECTS_BY_MODE[mode].map(TestObject.new),
          );

          this.graphStore.reset();
        }

        if (mode === MODES.SOLAR_SYSTEM || mode === MODES.EXOPLANETS) {
          replacePointOnGraphDisposer = reaction(
            () => this.testObjectsStore.selectedObject?.coordinates,
            () => {
              const { selectedObject } = this.testObjectsStore;
              if (
                !selectedObject ||
                (selectedObject.coordinates.x === 0 &&
                  selectedObject.coordinates.y === 0)
              ) {
                return;
              }

              const point = convertObjectToGraphPoint(selectedObject);
              this.graphStore.replacePoint(point);
            },
          );
        } else {
          replacePointOnGraphDisposer = null;
        }

        // NOTE: Setting Parameters Displayed
        if (mode === MODES.STATE_OF_AGGREGATION) {
          this.settingsStore.setParametersDisplayed([
            OBJECT_PARAMETERS.DISTANCE_FROM_THE_SUN,
            OBJECT_PARAMETERS.TEMPERATURE,
            OBJECT_PARAMETERS.CONDENSED,
          ]);
        } else if (mode === MODES.SOLAR_SYSTEM || mode === MODES.EXOPLANETS) {
          this.settingsStore.setParametersDisplayed([
            OBJECT_PARAMETERS.DISTANCE_FROM_THE_SUN,
            OBJECT_PARAMETERS.TEMPERATURE,
            OBJECT_PARAMETERS.SOLID_MATERIALS,
          ]);
        } else {
          this.settingsStore.setParametersDisplayed([
            OBJECT_PARAMETERS.DISTANCE_FROM_THE_SUN,
            OBJECT_PARAMETERS.TEMPERATURE,
          ]);
        }

        // NOTE: Disabling test objects bank if object after selecting object
        if (mode === MODES.STATE_OF_AGGREGATION) {
          selectingObjectDisposer = reaction(
            () => this.testObjectsStore.selectedObject?.isPlaced,
            (isPlaced: boolean | undefined) => {
              if (isPlaced === true) {
                this.settingsStore.bankEnabled = false;
              }
            },
          );
        } else {
          selectingObjectDisposer?.();
          selectingObjectDisposer = null;
          this.settingsStore.bankEnabled = true;
        }
      },
      { fireImmediately: true },
    );

    const radiusEffect = (newRadius: number) => {
      if (this.testObjectsStore.placedObjects.length === 0) {
        return;
      }

      let prevObjectDistanceInPixels = 0;
      const sunRadius = getSunDiameter(newRadius) / 2;
      const quarterSunRadius = sunRadius / 4;

      this.testObjectsStore.placedObjects.forEach(
        (object: ITestObject, index: number) => {
          const position = updatePositionForDistance({
            distance: object.distance,
            angleInDegrees: object.angle,
            currentDistance: 0,
            currentDistanceInPixels: object.distanceInPixels,
            maxObjectRadius: this.settingsStore.maxRadius,
            minObjectRadius: MIN_OBJECT_RADIUS,
            maxObjectRadiusInPixels: this.settingsStore.maxRadiusInPixels,
            sunCoordinates: this.settingsStore.sunCoordinates,
          });

          if (
            sunRadius < position.distanceInPixels &&
            position.distanceInPixels > prevObjectDistanceInPixels * 1.2
          ) {
            return object.updatePosition(position);
          }

          const distanceRatio =
            (object.distance * (this.settingsStore.maxRadius / 3 / newRadius)) /
            this.settingsStore.maxRadius;
          const fixedDistanceInPixels =
            sunRadius +
            (quarterSunRadius * (index + 1)) / 2 +
            (sunRadius + quarterSunRadius * (index + 1)) * distanceRatio;

          const finallyDistanceInPixels =
            prevObjectDistanceInPixels * 1.2 > fixedDistanceInPixels
              ? fixedDistanceInPixels + fixedDistanceInPixels * distanceRatio
              : fixedDistanceInPixels;

          const newPosition: IPositionToUpdate =
            sunRadius > position.distanceInPixels ||
            position.distanceInPixels < prevObjectDistanceInPixels * 1.2
              ? {
                  ...position,
                  distanceInPixels: finallyDistanceInPixels,
                  coordinates: getCoordinatesForDistance(
                    finallyDistanceInPixels,
                    position.angle || object.angle,
                    this.settingsStore.sunCoordinates,
                  ),
                }
              : position;
          prevObjectDistanceInPixels = newPosition.distanceInPixels;

          object.updatePosition(newPosition);
        },
      );
    };

    reaction(() => this.settingsStore.radius, radiusEffect);

    reaction(
      () => this.settingsStore.solarSystemCanvasOptions.canvasBoundaries,
      () => {
        requestAnimationFrame(() => {
          radiusEffect(this.settingsStore.radius);
        });
      },
    );
  }

  private initCAPIHandlers(): void {
    const setSettings = setPropertyInStore(this.settingsStore);
    const setGraphProperties = setPropertyInStore(this.graphStore);

    capi.onChange('Sim.Bank.Objects', setSettings('mode'));
    capi.onChange('Sim.Bank.Visible', setSettings('bankVisible'));
    capi.onChange('Sim.Bank.Enabled', setSettings('bankEnabled'));
    capi.onChange(
      'Sim.Graph.Elements.Visible',
      setGraphProperties('graphElements'),
    );
    capi.onChange('Sim.Object.Selected.Value', (value: TestObjectId) => {
      const objectToSelect = this.testObjectsStore.objects.find(
        (object) => object.id === value,
      );
      if (objectToSelect) {
        this.testObjectsStore.selectObject(objectToSelect);
      }
    });
    capi.onChange('Sim.Object.Selected.Distance', (distance: number) => {
      const { selectedObject } = this.testObjectsStore;
      if (selectedObject) {
        if (distance) {
          const position = updatePositionForDistance({
            distance,
            angleInDegrees: selectedObject.angle,
            currentDistance: selectedObject.distance,
            currentDistanceInPixels: selectedObject.distanceInPixels,
            maxObjectRadius: this.settingsStore.maxRadius,
            minObjectRadius: MIN_OBJECT_RADIUS,
            maxObjectRadiusInPixels: this.settingsStore.maxRadiusInPixels,
            sunCoordinates: this.settingsStore.sunCoordinates,
          });
          return selectedObject.updatePosition(position);
        }

        runInAction(() => {
          selectedObject.isPlaced = false;
        });
      }
    });
    capi.onChange('Sim.Object.Selected.Angle', (angle: number) => {
      const { selectedObject } = this.testObjectsStore;
      if (
        selectedObject &&
        (angle || (selectedObject.isPlaced && angle === 0))
      ) {
        const position = updatePositionForDistance({
          distance: selectedObject.distance,
          angleInDegrees: angle,
          currentDistance: selectedObject.distance,
          currentDistanceInPixels: selectedObject.distanceInPixels,
          maxObjectRadius: this.settingsStore.maxRadius,
          minObjectRadius: MIN_OBJECT_RADIUS,
          maxObjectRadiusInPixels: this.settingsStore.maxRadiusInPixels,
          sunCoordinates: this.settingsStore.sunCoordinates,
        });
        selectedObject.updatePosition(position);
      }
    });
    capi.onChange(
      'Sim.SS.Radius.Value',
      setSettings('radius', (newRadius: number) => {
        const fixedRadius = Math.max(
          Math.min(newRadius, this.settingsStore.maxRadius),
          this.settingsStore.minRadius,
        );
        if (fixedRadius === this.settingsStore.radius) {
          capi.set('Sim.SS.Radius.Value', fixedRadius);
          return;
        }

        this.settingsStore.setRadius(fixedRadius);
      }),
    );
    capi.onChange('Sim.SS.Radius.Visible', setSettings('radiusVisible'));
    capi.onChange('Sim.SS.Radius.Enabled', setSettings('radiusEnabled'));
    capi.onChange(
      'Sim.Parameters.Displayed',
      setSettings('parametersDisplayed'),
    );
    capi.onChange('Sim.Parameters.Visible', setSettings('parametersVisible'));
    capi.onChange('Sim.Model.Elements.Visible', setSettings('modelElements'));
    capi.onChange('Sim.Graph.Visible', setSettings('graphVisible'));
    capi.onChange(
      'Sim.Graph.Button.Visible',
      setSettings('graphButtonVisible'),
    );
    capi.onChange(
      'Sim.Graph.Button.Enabled',
      setSettings('graphButtonEnabled'),
    );
    capi.onChange('Sim.Graph.Clear.Clear', (value: boolean) => {
      if (value) {
        this.graphStore.reset();
      }
    });
    capi.onChange(
      'Sim.Graph.Clear.Visible',
      setSettings('graphClearButtonVisible'),
    );
    capi.onChange(
      'Sim.Graph.Clear.Enabled',
      setSettings('graphClearButtonEnabled'),
    );
  }

  private initCAPISetters(): void {
    const capiSet =
      <K extends keyof ICapiModel>(
        variableName: K | (() => K),
        defaultValue?: ICapiModel[K],
      ) =>
      (newValue: ICapiModel[K] | undefined) =>
        capi.set(
          typeof variableName === 'function' ? variableName() : variableName,
          newValue == null ? defaultValue! : newValue,
        );

    reaction(() => this.settingsStore.mode, capiSet('Sim.Bank.Objects'));
    reaction(() => this.settingsStore.bankEnabled, capiSet('Sim.Bank.Enabled'));
    reaction(
      () => this.graphStore.graphElements,
      capiSet('Sim.Graph.Elements.Visible'),
    );
    reaction(
      () => this.testObjectsStore.selectedObject?.id,
      capiSet('Sim.Object.Selected.Value', '' as TestObjectId),
    );
    reaction(
      () => this.testObjectsStore.selectedObject?.distance,
      capiSet('Sim.Object.Selected.Distance', 0),
    );
    reaction(
      () =>
        this.testObjectsStore.selectedObject
          ? Math.round(this.testObjectsStore.selectedObject.angle)
          : 0,
      capiSet('Sim.Object.Selected.Angle', 0),
    );
    reaction(
      () =>
        this.settingsStore.pullingRadius ? false : this.settingsStore.radius,
      (newRadius: boolean | number) => {
        if (isNumber(newRadius)) {
          capi.set('Sim.SS.Radius.Value', newRadius || 32);
        }
      },
    );
    reaction(
      () => this.settingsStore.radiusVisible,
      capiSet('Sim.SS.Radius.Visible'),
    );
    reaction(
      () => this.settingsStore.radiusEnabled,
      capiSet('Sim.SS.Radius.Enabled'),
    );
    reaction(
      () => this.settingsStore.parametersDisplayed,
      capiSet('Sim.Parameters.Displayed'),
    );
    reaction(
      () => this.settingsStore.modelElements,
      capiSet('Sim.Model.Elements.Visible'),
    );
    reaction(
      () => this.settingsStore.graphVisible,
      capiSet('Sim.Graph.Visible'),
    );
    reaction(
      () => this.settingsStore.graphButtonVisible,
      capiSet('Sim.Graph.Button.Visible'),
    );
    reaction(
      () => this.settingsStore.graphButtonEnabled,
      capiSet('Sim.Graph.Button.Enabled'),
    );
    reaction(
      () => this.graphStore.plottedPoints === 0,
      capiSet('Sim.Graph.Clear.Clear'),
    );
    reaction(
      () => this.settingsStore.graphClearButtonVisible,
      capiSet('Sim.Graph.Clear.Visible'),
    );
    reaction(
      () => this.settingsStore.graphClearButtonEnabled,
      capiSet('Sim.Graph.Clear.Enabled'),
    );
    reaction(
      () => this.graphStore.plottedPoints,
      capiSet('Sim.Graph.Points.Plotted'),
    );
    reaction(
      () => this.graphStore.smallestPointDistance,
      capiSet('Sim.Graph.Points.Smallest'),
    );
    reaction(
      () => this.graphStore.largestPointDistance,
      capiSet('Sim.Graph.Points.Largest'),
    );
    reaction(
      () => this.testObjectsStore.areCorrectlyPlaced,
      capiSet(() =>
        this.settingsStore.mode === MODES.EXOPLANETS
          ? 'Sim.Object.Exoplanets.Correct'
          : 'Sim.Object.Planets.Correct',
      ),
    );
  }

  addSelectedToGraph = (): void => {
    if (this.testObjectsStore.selectedObject?.isPlaced) {
      const point = convertObjectToGraphPoint(
        this.testObjectsStore.selectedObject,
      );

      if (
        this.settingsStore.mode === MODES.SOLAR_SYSTEM ||
        this.settingsStore.mode === MODES.EXOPLANETS
      ) {
        this.graphStore.replaceOrAddPoint(point);
      } else {
        this.graphStore.addPoint(point);
      }
    }
  };

  godMode = async () => {
    if (this.isGodModeEnabled) {
      return;
    }

    this.isGodModeEnabled = true;
    this.settingsStore.setMode(MODES.SOLAR_SYSTEM);
    let currentIndex = 0;
    const disposer = reaction(
      () => this.testObjectsStore.selectedObject?.distance,
      (distance) => {
        if (distance == null || distance <= 0.2) {
          return;
        }
        setCorrectDistance(++currentIndex);

        if (currentIndex === this.testObjectsStore.objects.length - 1) {
          this.isGodModeEnabled = false;
          disposer();
        }
      },
    );

    const setCorrectDistance = (index: number) => {
      this.testObjectsStore.selectObject(this.testObjectsStore.objects[index]);
      requestAnimationFrame(() => {
        capi.set(
          'Sim.Object.Selected.Angle',
          this.testObjectsStore.selectedObject?.meta?.angle!,
        );
      });
      requestAnimationFrame(() => {
        capi.set(
          'Sim.Object.Selected.Distance',
          this.testObjectsStore.selectedObject?.meta?.distanceFromSun!,
        );
      });
    };

    setCorrectDistance(currentIndex);
  };
}

export const convertObjectToGraphPoint = (object: ITestObject): IGraphItem => {
  const id = `${object.id}_${object.distance}_${object.temperature}`;

  return {
    id,
    key: object.id,
    distance: object.distance,
    temperature: object.temperature,
    shortLabel: object.shortLabel,
  };
};

const setPropertyInStore =
  <S = any>(store: S) =>
  <T extends keyof S>(key: T, definedSetter?: (value: S[T]) => void) =>
  (value: S[T]) => {
    runInAction(() => {
      if (definedSetter) {
        return definedSetter(value);
      }

      set(store, key, value);
    });
  };
