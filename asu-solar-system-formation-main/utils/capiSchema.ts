import {
  TCapiSchema,
  ICapiModel,
  MODES,
  GRAPH_ELEMENTS,
  CAPI_TYPES,
  TestObjectId,
  OBJECT_PARAMETERS,
  MODEL_ELEMENTS_VISIBLE,
} from 'domainTypes';

export const capiSchema: TCapiSchema<ICapiModel> = {
  'Sim.Bank.Objects': {
    initialValue: MODES.PROBE,
    options: {
      allowedValues: [
        MODES.PROBE,
        MODES.STATE_OF_AGGREGATION,
        MODES.SOLAR_SYSTEM,
        MODES.FROST_LINE,
        MODES.EXOPLANETS,
      ],
    },
  },
  'Sim.Bank.Visible': {
    initialValue: true,
  },
  'Sim.Bank.Enabled': {
    initialValue: true,
  },
  'Sim.Object.Selected.Value': {
    initialValue: '',
    options: {
      allowedValues: [
        'probe',
        'gas',
        'compound',
        'rock',
        'mercury',
        'venus',
        'earth',
        'mars',
        'jupiter',
        'saturn',
        'uranus',
        'neptune',
        'frost',
        'planet1',
        'planet2',
        'planet3',
      ] as TestObjectId[],
    },
  },
  'Sim.Object.Selected.Distance': {
    initialValue: 0,
  },
  'Sim.Object.Selected.Angle': {
    initialValue: 0,
  },
  'Sim.SS.Radius.Value': {
    initialValue: 32,
  },
  'Sim.SS.Radius.Visible': {
    initialValue: true,
  },
  'Sim.SS.Radius.Enabled': {
    initialValue: true,
  },
  'Sim.Parameters.Displayed': {
    initialValue: [
      OBJECT_PARAMETERS.DISTANCE_FROM_THE_SUN,
      OBJECT_PARAMETERS.TEMPERATURE,
    ],
    options: {
      type: CAPI_TYPES.ARRAY,
      allowedValues: [
        OBJECT_PARAMETERS.DISTANCE_FROM_THE_SUN,
        OBJECT_PARAMETERS.TEMPERATURE,
        OBJECT_PARAMETERS.CONDENSED,
        OBJECT_PARAMETERS.SOLID_MATERIALS,
      ],
    },
  },
  'Sim.Parameters.Visible': {
    initialValue: true,
  },
  'Sim.Model.Elements.Visible': {
    initialValue: [
      MODEL_ELEMENTS_VISIBLE.FROST_LINE,
      MODEL_ELEMENTS_VISIBLE.SOLAR_SYSTEM_PLANET_ICONS_AND_ORBITS,
      MODEL_ELEMENTS_VISIBLE.EXO_SYSTEM_PLANET_ICONS_AND_ORBITS,
    ],
    options: {
      type: CAPI_TYPES.ARRAY,
      allowedValues: [
        MODEL_ELEMENTS_VISIBLE.ROCKS_AND_METALS_CONDENSE,
        MODEL_ELEMENTS_VISIBLE.SOLAR_SYSTEM_PLANET_ICONS_AND_ORBITS,
        MODEL_ELEMENTS_VISIBLE.FROST_LINE,
        MODEL_ELEMENTS_VISIBLE.SOLAR_SYSTEM_PLANET_ICONS_AND_ORBITS,
        MODEL_ELEMENTS_VISIBLE.HYDROGEN_COMPOUNDS_CONDENSE,
      ],
    },
  },
  'Sim.Graph.Visible': {
    initialValue: true,
  },
  'Sim.Graph.Button.Visible': {
    initialValue: true,
  },
  'Sim.Graph.Button.Enabled': {
    initialValue: true,
  },
  'Sim.Graph.Elements.Visible': {
    initialValue: [
      GRAPH_ELEMENTS.SOLAR_SYSTEM_PLANET_ICONS,
      GRAPH_ELEMENTS.EXO_SYSTEM_PLANET_ICONS,
    ],
    options: {
      type: CAPI_TYPES.ARRAY,
      allowedValues: [
        GRAPH_ELEMENTS.TREND_LINE,
        GRAPH_ELEMENTS.ROCKS_AND_METALS_CONDENSE,
        GRAPH_ELEMENTS.HYDROGEN_COMPOUNDS_CONDENSE,
        GRAPH_ELEMENTS.SOLAR_SYSTEM_PLANET_ICONS,
        GRAPH_ELEMENTS.EXO_SYSTEM_PLANET_ICONS,
      ],
    },
  },
  'Sim.Graph.Clear.Clear': {
    initialValue: true,
  },
  'Sim.Graph.Clear.Visible': {
    initialValue: true,
  },
  'Sim.Graph.Clear.Enabled': {
    initialValue: true,
  },
  'Sim.Graph.Points.Plotted': {
    initialValue: 0,
    options: {
      readonly: true,
    },
  },
  'Sim.Graph.Points.Smallest': {
    initialValue: 0,
    options: {
      readonly: true,
    },
  },
  'Sim.Graph.Points.Largest': {
    initialValue: 0,
    options: {
      readonly: true,
    },
  },
  'Sim.Object.Planets.Correct': {
    initialValue: false,
    options: {
      readonly: true,
    },
  },
  'Sim.Object.Exoplanets.Correct': {
    initialValue: false,
    options: {
      readonly: true,
    },
  },
};

export const capiOptionsHandled: Partial<Record<keyof ICapiModel, boolean>> = {
  'Sim.Bank.Objects': true,
  'Sim.Bank.Visible': true,
  'Sim.Bank.Enabled': true,
};
