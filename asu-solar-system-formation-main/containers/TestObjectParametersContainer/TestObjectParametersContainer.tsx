import React from 'react';
import styled, { css } from 'styled-components';
import { observer } from 'mobx-react-lite';

import {
  LayoutTestObjectParameters,
  LayoutSectionTitle,
} from 'components/Layout/Layout';
import { RadiusSlider } from 'components/RadiusSlider/RadiusSlider';
import { SolarSystemVisualization } from 'components/SolarSystemVisualization/SolarSystemVisualization';
import { TestObjectParameters } from 'components/TestObjectParameters/TestObjectParameters';
import { PlotPointButtonContainer } from 'containers/GraphContainer/PlotPointButtonContainer';

import { useStores } from 'providers/StoreProvider/useStores';
import { BASE_PATH } from 'utils/consts';

export const TestObjectParametersContainer = observer(() => {
  const { settingsStore } = useStores();

  return (
    <LayoutTestObjectParameters>
      {settingsStore.parametersVisible ? (
        <LayoutSectionTitle>Test Object Parameters</LayoutSectionTitle>
      ) : null}
      <TestObjectParameters />
      <Content>
        <SolarSystemVisualization />
      </Content>
      {settingsStore.radiusVisible || settingsStore.graphButtonVisible ? (
        <Actions isVisibleRadiusSlider={settingsStore.radiusVisible}>
          <RadiusSlider />
          <PlotPointButtonContainer />
        </Actions>
      ) : null}
    </LayoutTestObjectParameters>
  );
});

const Content = styled.div`
  ${({ theme: { Colors } }) => css`
    flex-grow: 1;
    background-color: ${Colors.testObjectParametersBackgroundColor};
    background: url(${BASE_PATH}/assets/background-starfield.jpg);
  `}
`;

const Actions = styled.div<{ isVisibleRadiusSlider: boolean }>`
  ${({ isVisibleRadiusSlider, theme: { Colors } }) => css`
    display: flex;
    justify-content: ${isVisibleRadiusSlider ? 'space-between' : 'flex-end'};
    border-top: 1px solid ${Colors.defaultBorderColor};

    * + * {
      border-left: 1px solid ${Colors.defaultBorderColor};
    }
  `}
`;
