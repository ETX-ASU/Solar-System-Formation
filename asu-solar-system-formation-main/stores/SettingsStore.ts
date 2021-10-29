import { makeObservable, observable, action, computed } from 'mobx';

import {
  MODES,
  OBJECT_PARAMETERS,
  ISolarSystemCanvasOptions,
  MODEL_ELEMENTS_VISIBLE,
} from 'domainTypes';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAX_RADIUS_IN_PIXELS_REFERENCE,
  SUN_HEIGHT,
  SUN_WIDTH,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from 'utils/consts';
import { calcRadiusRatio } from 'utils/canvas';
import { capiSchema } from 'utils/capiSchema';

export interface ISettingsStore {
  mode: MODES;
  bankVisible: boolean;
  bankEnabled: boolean;

  radius: number;
  readonly minRadius: number;
  readonly maxRadius: number;
  readonly maxRadiusInPixels: number;
  readonly sunCoordinates: {
    x: number;
    y: number;
  };
  radiusVisible: boolean;
  radiusEnabled: boolean;
  pullingRadius: boolean;

  parametersVisible: boolean;
  parametersDisplayed: OBJECT_PARAMETERS[];

  graphVisible: boolean;
  graphButtonVisible: boolean;
  graphButtonEnabled: boolean;
  graphClearButtonVisible: boolean;
  graphClearButtonEnabled: boolean;

  modelElements: MODEL_ELEMENTS_VISIBLE[];

  solarSystemCanvasOptions: ISolarSystemCanvasOptions;

  drawHelpersOrbits: boolean;
  drawObjectLabels: boolean;

  setMode(mode: MODES): void;
  setRadius(radius: number): void;
  isVisibleParameter(parameter: OBJECT_PARAMETERS): boolean;
  setParametersDisplayed(parametersDisplayed: OBJECT_PARAMETERS[]): void;
  isVisibleModelElements(element: MODEL_ELEMENTS_VISIBLE): boolean;
  setModelElements(modelElements: MODEL_ELEMENTS_VISIBLE[]): void;
}

export class SettingsStore implements ISettingsStore {
  mode: MODES = capiSchema['Sim.Bank.Objects'].initialValue;
  bankVisible: boolean = capiSchema['Sim.Bank.Visible'].initialValue;
  bankEnabled: boolean = capiSchema['Sim.Bank.Enabled'].initialValue;

  radius: number = capiSchema['Sim.SS.Radius.Value'].initialValue;
  readonly minRadius: number = 1;
  readonly maxRadius: number = 32;
  radiusVisible: boolean = capiSchema['Sim.SS.Radius.Visible'].initialValue;
  radiusEnabled: boolean = capiSchema['Sim.SS.Radius.Enabled'].initialValue;
  pullingRadius: boolean = false;

  parametersVisible: boolean = true;
  parametersDisplayed: OBJECT_PARAMETERS[] =
    capiSchema['Sim.Parameters.Displayed'].initialValue;

  graphVisible: boolean = capiSchema['Sim.Graph.Visible'].initialValue;
  graphButtonVisible: boolean =
    capiSchema['Sim.Graph.Button.Visible'].initialValue;
  graphButtonEnabled: boolean =
    capiSchema['Sim.Graph.Button.Enabled'].initialValue;
  graphClearButtonVisible: boolean =
    capiSchema['Sim.Graph.Clear.Visible'].initialValue;
  graphClearButtonEnabled: boolean =
    capiSchema['Sim.Graph.Clear.Enabled'].initialValue;

  modelElements: MODEL_ELEMENTS_VISIBLE[] =
    capiSchema['Sim.Model.Elements.Visible'].initialValue;

  solarSystemCanvasOptions: ISolarSystemCanvasOptions = {
    canvasBoundaries: {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    },
    imageBoundaries: {
      width: IMAGE_WIDTH,
      height: IMAGE_HEIGHT,
    },
    sunBoundaries: {
      width: SUN_WIDTH,
      height: SUN_HEIGHT,
    },
  };

  drawHelpersOrbits: boolean = false;
  drawObjectLabels: boolean = true;

  constructor() {
    makeObservable(this, {
      mode: observable,
      radius: observable,
      solarSystemCanvasOptions: observable,
      bankVisible: observable,
      bankEnabled: observable,
      radiusVisible: observable,
      radiusEnabled: observable,
      pullingRadius: observable,
      parametersVisible: observable,
      parametersDisplayed: observable,
      modelElements: observable,
      graphVisible: observable,
      graphButtonVisible: observable,
      graphButtonEnabled: observable,
      graphClearButtonVisible: observable,
      graphClearButtonEnabled: observable,
      drawHelpersOrbits: observable,
      drawObjectLabels: observable,
      maxRadiusInPixels: computed,
      sunCoordinates: computed,
      setMode: action.bound,
      setRadius: action.bound,
      setParametersDisplayed: action.bound,
      setModelElements: action.bound,
    });
  }

  get maxRadiusInPixels(): number {
    return calcRadiusRatio(this.radius) * MAX_RADIUS_IN_PIXELS_REFERENCE;
  }

  get sunCoordinates(): {
    x: number;
    y: number;
  } {
    return {
      x: this.solarSystemCanvasOptions.canvasBoundaries.width / 2,
      y: this.solarSystemCanvasOptions.canvasBoundaries.height / 2,
    };
  }

  setMode(mode: MODES): void {
    this.mode = mode;
  }

  setRadius(radius: number): void {
    this.radius = Math.max(Math.min(radius, this.maxRadius), this.minRadius);
  }

  isVisibleParameter(parameter: OBJECT_PARAMETERS): boolean {
    return this.parametersDisplayed.includes(parameter);
  }

  setParametersDisplayed(parametersDisplayed: OBJECT_PARAMETERS[]): void {
    this.parametersDisplayed = parametersDisplayed;
  }

  isVisibleModelElements(element: MODEL_ELEMENTS_VISIBLE): boolean {
    return this.modelElements.includes(element);
  }

  setModelElements(modelElements: MODEL_ELEMENTS_VISIBLE[]): void {
    this.modelElements = modelElements;
  }
}
