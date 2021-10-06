import React from 'react';

import { LayoutGraph, LayoutSectionTitle } from 'components/Layout/Layout';
import { ClearGraphButton } from 'components/Buttons/ClearGraphButton';

import { Graph } from './Graph';
import { observer } from 'mobx-react-lite';
import { useStores } from 'providers/StoreProvider/useStores';

export const GraphContainer = observer(() => {
  const { settingsStore } = useStores();

  return settingsStore.graphVisible ? (
    <LayoutGraph>
      <LayoutSectionTitle>Temperature vs. Distance</LayoutSectionTitle>
      <Graph />
      <ClearGraphButton />
    </LayoutGraph>
  ) : null;
});
