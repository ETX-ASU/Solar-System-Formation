import React from 'react';
import { Layout } from 'components/Layout/Layout';
import { TestObjectsContainer } from 'containers/TestObjectsContainer/TestObjectsContainer';
import { TestObjectParametersContainer } from 'containers/TestObjectParametersContainer/TestObjectParametersContainer';
import { GraphContainer } from 'containers/GraphContainer/GraphContainer';
import { observer } from 'mobx-react-lite';
import { useStores } from 'providers/StoreProvider/useStores';

export const SolarSystemFormation = observer(() => {
  const { settingsStore } = useStores();

  return (
    <>
      <a className="skip-link" href="#simulation-area">
        Skip to simulation
      </a>
      <h1 className="sr-only">Solar System Formation simulation</h1>
      <Layout
        aria-label="Solar System Formation simulation"
        $hasObjectBank={settingsStore.bankVisible}
        $hasGraph={settingsStore.graphVisible}
      >
        <TestObjectsContainer />
        <TestObjectParametersContainer />
        <GraphContainer />
      </Layout>
    </>
  );
});
