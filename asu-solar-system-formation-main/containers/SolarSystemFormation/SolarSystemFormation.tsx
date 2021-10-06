import React from 'react';
import { Layout } from 'components/Layout/Layout';
import { TestObjectsContainer } from 'containers/TestObjectsContainer/TestObjectsContainer';
import { TestObjectParametersContainer } from 'containers/TestObjectParametersContainer/TestObjectParametersContainer';
import { GraphContainer } from 'containers/GraphContainer/GraphContainer';

export const SolarSystemFormation = () => {
  return (
    <Layout>
      <TestObjectsContainer />
      <TestObjectParametersContainer />
      <GraphContainer />
    </Layout>
  );
};
