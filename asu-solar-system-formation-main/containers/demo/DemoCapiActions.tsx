import React from 'react';
import { observer } from 'mobx-react-lite';
import { runInAction } from 'mobx';

import { useStores } from 'providers/StoreProvider/useStores';

import { CapiModeSelector } from './CapiModeSelector';
import { ParameterSelector } from './ParameterSelector';
import { capi } from 'stores/capi';
import { GRAPH_ELEMENTS, ICapiModel } from 'domainTypes';
import { toJS } from 'mobx';
import { DemoActions, IGroup } from './DemoActions';
import { CapiObjectSelector } from './CapiObjectSelector';
import { ModelElementsSelector } from './ModelElementsSelector';

export const DemoCapiActions = observer(() => {
  const { graphStore, settingsStore } = useStores();

  const groups: IGroup[] = [
    {
      label: 'Bank objects',
      controls: [
        {
          checked: settingsStore.bankVisible,
          label: 'Bank Visible',
          toggle: () =>
            capi.sendToApi('Sim.Bank.Visible', !settingsStore.bankVisible),
        },
        {
          checked: settingsStore.bankEnabled,
          label: 'Bank Enabled',
          toggle: () =>
            capi.sendToApi('Sim.Bank.Enabled', !settingsStore.bankEnabled),
        },
      ],
    },
    {
      label: 'Radius',
      controls: [
        {
          checked: settingsStore.radiusVisible,
          label: 'Radius Visible',
          toggle: () =>
            capi.sendToApi(
              'Sim.SS.Radius.Visible',
              !settingsStore.radiusVisible,
            ),
        },
        {
          checked: settingsStore.radiusEnabled,
          label: 'Radius Enabled',
          toggle: () =>
            capi.sendToApi(
              'Sim.SS.Radius.Enabled',
              !settingsStore.radiusEnabled,
            ),
        },
      ],
    },
    {
      label: 'Object Parameters',
      controls: [
        {
          checked: settingsStore.parametersVisible,
          label: 'Parameters Visible',
          toggle: () =>
            capi.sendToApi(
              'Sim.Parameters.Visible',
              !settingsStore.parametersVisible,
            ),
        },
      ],
      othersComponent: (
        <ParameterSelector
          onChange={(value) =>
            capi.sendToApi('Sim.Parameters.Displayed', value)
          }
        />
      ),
    },
    {
      label: 'Solar system model elements',
      controls: [],
      othersComponent: (
        <ModelElementsSelector
          onChange={(value) =>
            capi.sendToApi('Sim.Model.Elements.Visible', value)
          }
        />
      ),
    },
    {
      label: 'Graph',
      controls: [
        {
          checked: graphStore.trendLineVisible,
          label: 'Trend Line',
          toggle: toggleCapiArray(
            'Sim.Graph.Elements.Visible',
            graphStore.graphElements,
            GRAPH_ELEMENTS.TREND_LINE,
          ),
        },
        {
          checked: graphStore.temperatureAreaVisible,
          label: 'Rock&Metal Condense',
          toggle: toggleCapiArray(
            'Sim.Graph.Elements.Visible',
            graphStore.graphElements,
            GRAPH_ELEMENTS.ROCKS_AND_METALS_CONDENSE,
          ),
        },
        {
          checked: graphStore.frostLineAreaVisible,
          label: 'Hydrogen Compounds Condense',
          toggle: toggleCapiArray(
            'Sim.Graph.Elements.Visible',
            graphStore.graphElements,
            GRAPH_ELEMENTS.HYDROGEN_COMPOUNDS_CONDENSE,
          ),
        },
        {
          checked: graphStore.solarSystemIconsVisible,
          label: 'Solar System Icons Visible',
          toggle: toggleCapiArray(
            'Sim.Graph.Elements.Visible',
            graphStore.graphElements,
            GRAPH_ELEMENTS.SOLAR_SYSTEM_PLANET_ICONS,
          ),
        },
        {
          checked: graphStore.exoplanetIconsVisible,
          label: 'Exoplanets Icons Visible',
          toggle: toggleCapiArray(
            'Sim.Graph.Elements.Visible',
            graphStore.graphElements,
            GRAPH_ELEMENTS.EXO_SYSTEM_PLANET_ICONS,
          ),
        },
        {
          checked: settingsStore.graphVisible,
          label: 'Graph Visible',
          toggle: () =>
            capi.sendToApi('Sim.Graph.Visible', !settingsStore.graphVisible),
        },
        {
          checked: settingsStore.graphButtonVisible,
          label: 'Graph Button Visible',
          toggle: () =>
            capi.sendToApi(
              'Sim.Graph.Button.Visible',
              !settingsStore.graphButtonVisible,
            ),
        },
        {
          checked: settingsStore.graphButtonEnabled,
          label: 'Graph Button Enabled',
          toggle: () =>
            capi.sendToApi(
              'Sim.Graph.Button.Enabled',
              !settingsStore.graphButtonEnabled,
            ),
        },
        {
          checked: settingsStore.graphClearButtonVisible,
          label: 'Graph Clear Button Visible',
          toggle: () =>
            capi.sendToApi(
              'Sim.Graph.Clear.Visible',
              !settingsStore.graphClearButtonVisible,
            ),
        },
        {
          checked: settingsStore.graphClearButtonEnabled,
          label: 'Graph Clear Button Enabled',
          toggle: () =>
            capi.sendToApi(
              'Sim.Graph.Clear.Enabled',
              !settingsStore.graphClearButtonEnabled,
            ),
        },
      ],
    },
    {
      label: 'Helpers outside CAPI',
      controls: [
        {
          checked: settingsStore.drawHelpersOrbits,
          label: 'Draw Helpers Orbits',
          toggle: () =>
            runInAction(
              () =>
                (settingsStore.drawHelpersOrbits =
                  !settingsStore.drawHelpersOrbits),
            ),
        },
        {
          checked: settingsStore.drawObjectLabels,
          label: 'Draw Object Labels',
          toggle: () =>
            runInAction(
              () =>
                (settingsStore.drawObjectLabels =
                  !settingsStore.drawObjectLabels),
            ),
        },
      ],
    },
  ];

  return (
    <DemoActions
      groups={groups}
      Selectors={() => (
        <>
          <CapiModeSelector />
          <CapiObjectSelector />
        </>
      )}
    />
  );
});

function toggleCapiArray<T>(
  variableName: keyof ICapiModel,
  array: T[],
  element: T,
) {
  return () => {
    const clonedElements = toJS(array);
    if (clonedElements.includes(element)) {
      capi.sendToApi(
        variableName,
        clonedElements.filter((el: T) => el !== element),
      );
    } else {
      capi.sendToApi(variableName, clonedElements.concat(element));
    }
  };
}
