import {
  makeObservable,
  observable,
  IObservableArray,
  action,
  computed,
} from 'mobx';

import { IGraphItem, GRAPH_ELEMENTS } from 'domainTypes/GraphModel';
import { capiSchema } from 'utils/capiSchema';

export interface IGraphStore {
  data: IGraphItem[];
  readonly trendLineVisible: boolean;
  readonly temperatureAreaVisible: boolean;
  readonly frostLineAreaVisible: boolean;
  readonly solarSystemIconsVisible: boolean;
  readonly exoplanetIconsVisible: boolean;
  graphElements: GRAPH_ELEMENTS[];
  readonly plottedPoints: number;
  readonly smallestPointDistance: number;
  readonly largestPointDistance: number;

  reset(): void;
  addPoint(item: IGraphItem): void;
  replacePoint(item: IGraphItem): boolean;
  replaceOrAddPoint(item: IGraphItem): void;
}

export class GraphStore implements IGraphStore {
  data: IGraphItem[] = [];
  graphElements: GRAPH_ELEMENTS[] =
    capiSchema['Sim.Graph.Elements.Visible'].initialValue;

  constructor() {
    makeObservable(this, {
      data: observable,
      graphElements: observable,
      trendLineVisible: computed,
      temperatureAreaVisible: computed,
      frostLineAreaVisible: computed,
      solarSystemIconsVisible: computed,
      exoplanetIconsVisible: computed,
      plottedPoints: computed,
      smallestPointDistance: computed,
      largestPointDistance: computed,
      reset: action.bound,
      addPoint: action.bound,
      replacePoint: action.bound,
      replaceOrAddPoint: action.bound,
    });
  }

  get trendLineVisible(): boolean {
    return this.graphElements.includes(GRAPH_ELEMENTS.TREND_LINE);
  }

  get temperatureAreaVisible(): boolean {
    return this.graphElements.includes(
      GRAPH_ELEMENTS.ROCKS_AND_METALS_CONDENSE,
    );
  }

  get frostLineAreaVisible(): boolean {
    return this.graphElements.includes(
      GRAPH_ELEMENTS.HYDROGEN_COMPOUNDS_CONDENSE,
    );
  }

  get solarSystemIconsVisible(): boolean {
    return this.graphElements.includes(
      GRAPH_ELEMENTS.SOLAR_SYSTEM_PLANET_ICONS,
    );
  }

  get exoplanetIconsVisible(): boolean {
    return this.graphElements.includes(GRAPH_ELEMENTS.EXO_SYSTEM_PLANET_ICONS);
  }

  get plottedPoints(): number {
    return this.data.length;
  }

  get smallestPointDistance(): number {
    return this.plottedPoints > 0
      ? Math.min(...this.data.map((item) => item.distance))
      : 0;
  }

  get largestPointDistance(): number {
    return this.plottedPoints > 0
      ? Math.max(...this.data.map((item) => item.distance))
      : 0;
  }

  reset(): void {
    (this.data as IObservableArray).clear();
  }

  addPoint(newItem: IGraphItem): void {
    if (
      !this.data.find((item: IGraphItem): boolean => item.id === newItem.id)
    ) {
      this.data.push(newItem);
    }
  }

  replacePoint(newItem: IGraphItem): boolean {
    const plottedItem = this.data.find(
      (item: IGraphItem): boolean => item.key === newItem.key,
    );
    if (plottedItem) {
      (this.data as IObservableArray).replace(
        this.data.map((item: IGraphItem) =>
          item.key === newItem.key ? newItem : item,
        ),
      );

      return true;
    }

    return false;
  }

  replaceOrAddPoint(newItem: IGraphItem): void {
    const replaced = this.replacePoint(newItem);
    if (!replaced) {
      this.addPoint(newItem);
    }
  }
}
