import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useResizeDetector } from 'react-resize-detector';
import { runInAction } from 'mobx';

import { useStores } from 'providers/StoreProvider/useStores';

import { SolarSystemEdgeCanvas } from './SolarSystemEdgeCanvas';
import { SolarSystemAreaCanvas } from './SolarSystemAreaCanvas';

export const SolarSystemVisualization = () => {
  const { settingsStore } = useStores();
  const handleResize = useCallback(
    (width: number | undefined, height: number | undefined) => {
      if (!width || !height) {
        return;
      }

      runInAction(() => {
        settingsStore.solarSystemCanvasOptions.canvasBoundaries = {
          width,
          height,
        };
      });
    },
    [settingsStore],
  );

  const { ref } = useResizeDetector({
    onResize: handleResize,
  });

  return (
    <SolarSystemVisualizationWrapper ref={ref}>
      <SolarSystemEdgeCanvas />
      <SolarSystemAreaCanvas />
    </SolarSystemVisualizationWrapper>
  );
};

const SolarSystemVisualizationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
