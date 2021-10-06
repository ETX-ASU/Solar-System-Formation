import React from 'react';
import { observer } from 'mobx-react-lite';
import { runInAction, toJS } from 'mobx';

import { useStores } from 'providers/StoreProvider/useStores';

import { ModeSelector } from './ModeSelector';
import { ParameterSelector } from './ParameterSelector';
import { DemoActions, IGroup } from './DemoActions';
import { GRAPH_ELEMENTS } from 'domainTypes';
import { ObjectSelector } from './ObjectSelector';
import { ModelElementsSelector } from './ModelElementsSelector';

export const DemoStoreActions = observer(() => {
  const { graphStore, settingsStore } = useStores();

  const toggleGraphElements = (element: GRAPH_ELEMENTS) => () => {
    runInAction(() => {
      const clonedElements = toJS(graphStore.graphElements);
      if (clonedElements.includes(element)) {
        graphStore.graphElements = clonedElements.filter(
          (el: GRAPH_ELEMENTS) => el !== element,
        );
      } else {
        graphStore.graphElements = clonedElements.concat(element);
      }
    });
  };

  const groups: IGroup[] = [
    {
      label: 'Bank objects',
      controls: [
        {
          checked: settingsStore.bankVisible,
          label: 'Bank Visible',
          toggle: () =>
            runInAction(
              () => (settingsStore.bankVisible = !settingsStore.bankVisible),
            ),
        },
        {
          checked: settingsStore.bankEnabled,
          label: 'Bank Enabled',
          toggle: () =>
            runInAction(
              () => (settingsStore.bankEnabled = !settingsStore.bankEnabled),
            ),
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
            runInAction(
              () =>
                (settingsStore.radiusVisible = !settingsStore.radiusVisible),
            ),
        },
        {
          checked: settingsStore.radiusEnabled,
          label: 'Radius Enabled',
          toggle: () =>
            runInAction(
              () =>
                (settingsStore.radiusEnabled = !settingsStore.radiusEnabled),
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
            runInAction(
              () =>
                (settingsStore.parametersVisible =
                  !settingsStore.parametersVisible),
            ),
        },
      ],
      othersComponent: (
        <ParameterSelector onChange={settingsStore.setParametersDisplayed} />
      ),
    },
    {
      label: 'Solar system model elements',
      controls: [],
      othersComponent: (
        <ModelElementsSelector onChange={settingsStore.setModelElements} />
      ),
    },
    {
      label: 'Graph',
      controls: [
        {
          checked: graphStore.trendLineVisible,
          label: 'Trend Line',
          toggle: toggleGraphElements(GRAPH_ELEMENTS.TREND_LINE),
        },
        {
          checked: graphStore.temperatureAreaVisible,
          label: 'Rock&Metal Condense',
          toggle: toggleGraphElements(GRAPH_ELEMENTS.ROCKS_AND_METALS_CONDENSE),
        },
        {
          checked: graphStore.frostLineAreaVisible,
          label: 'Hydrogen Compounds Condense',
          toggle: toggleGraphElements(
            GRAPH_ELEMENTS.HYDROGEN_COMPOUNDS_CONDENSE,
          ),
        },
        {
          checked: graphStore.solarSystemIconsVisible,
          label: 'Solar System Icons Visible',
          toggle: toggleGraphElements(GRAPH_ELEMENTS.SOLAR_SYSTEM_PLANET_ICONS),
        },
        {
          checked: graphStore.exoplanetIconsVisible,
          label: 'Exoplanets Icons Visible',
          toggle: toggleGraphElements(GRAPH_ELEMENTS.EXO_SYSTEM_PLANET_ICONS),
        },
        {
          checked: settingsStore.graphVisible,
          label: 'Graph Visible',
          toggle: () =>
            runInAction(
              () => (settingsStore.graphVisible = !settingsStore.graphVisible),
            ),
        },
        {
          checked: settingsStore.graphButtonVisible,
          label: 'Graph Button Visible',
          toggle: () =>
            runInAction(
              () =>
                (settingsStore.graphButtonVisible =
                  !settingsStore.graphButtonVisible),
            ),
        },
        {
          checked: settingsStore.graphButtonEnabled,
          label: 'Graph Button Enabled',
          toggle: () =>
            runInAction(
              () =>
                (settingsStore.graphButtonEnabled =
                  !settingsStore.graphButtonEnabled),
            ),
        },
        {
          checked: settingsStore.graphClearButtonVisible,
          label: 'Graph Clear Button Visible',
          toggle: () =>
            runInAction(
              () =>
                (settingsStore.graphClearButtonVisible =
                  !settingsStore.graphClearButtonVisible),
            ),
        },
        {
          checked: settingsStore.graphClearButtonEnabled,
          label: 'Graph Clear Button Enabled',
          toggle: () =>
            runInAction(
              () =>
                (settingsStore.graphClearButtonEnabled =
                  !settingsStore.graphClearButtonEnabled),
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
          <ModeSelector />
          <ObjectSelector />
        </>
      )}
    />
  );
});
