export interface IGraphItem {
  id: string;
  key: string;
  distance: number;
  temperature: number;
  shortLabel?: string;
}

export enum GRAPH_ELEMENTS {
  TREND_LINE = 1,
  ROCKS_AND_METALS_CONDENSE = 2,
  HYDROGEN_COMPOUNDS_CONDENSE = 3,
  SOLAR_SYSTEM_PLANET_ICONS = 4,
  EXO_SYSTEM_PLANET_ICONS = 5,
}
