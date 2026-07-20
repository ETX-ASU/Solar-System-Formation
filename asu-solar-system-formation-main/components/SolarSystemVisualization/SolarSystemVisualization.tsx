import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useResizeDetector } from 'react-resize-detector';
import { runInAction } from 'mobx';

import { useStores } from 'providers/StoreProvider/useStores';

import { SolarSystemEdgeCanvas } from './SolarSystemEdgeCanvas';
import { SolarSystemAreaCanvas } from './SolarSystemAreaCanvas';
import { OBJECT_NAMES } from 'utils/objectsMap';
import { observer } from 'mobx-react-lite';

export const SolarSystemVisualization = observer(() => {
  const { settingsStore, testObjectsStore } = useStores();
  const handleResize = useCallback(
    (width: number | undefined, height: number | undefined) => {
      if (!width || !height) {
        return;
      }

      requestAnimationFrame(() => {
        runInAction(() => {
          settingsStore.solarSystemCanvasOptions.canvasBoundaries = {
            width,
            height,
          };
        });
      });
    },
    [settingsStore],
  );

  const { ref } = useResizeDetector({
    onResize: handleResize,
  });

  return (
    <SolarSystemVisualizationWrapper ref={ref} aria-label="Interactive solar system">
      <SolarSystemEdgeCanvas />
      <SolarSystemAreaCanvas />
      <CanvasInstructions id="canvas-instructions">
        Select an object, then tap or click to place it. Keyboard: focus the
        space and press Enter or Space to place it. Use the arrow keys to move
        it; hold Shift for larger steps.
      </CanvasInstructions>
      <PlacedObjectsSummary className="sr-only" aria-labelledby="placed-title">
        <h3 id="placed-title">Objects currently placed</h3>
        {testObjectsStore.placedObjects.length > 0 ? (
          <ul>
            {testObjectsStore.placedObjects.map((object) => (
              <li key={object.id}>
                {OBJECT_NAMES[object.id]}: {object.distance.toFixed(2)}
                {' astronomical units from the Sun, '}
                {object.temperature} kelvin.
              </li>
            ))}
          </ul>
        ) : (
          <p>No objects have been placed.</p>
        )}
      </PlacedObjectsSummary>
    </SolarSystemVisualizationWrapper>
  );
});

const SolarSystemVisualizationWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const PlacedObjectsSummary = styled.section``;

const CanvasInstructions = styled.p`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  width: max-content;
  max-width: calc(100% - 24px);
  margin: 0;
  padding: 6px 10px;
  border-radius: 3px;
  color: #ffffff;
  background: rgba(9, 33, 51, 0.88);
  font-size: 12px;
  line-height: 1.4;
  text-align: center;
  pointer-events: none;
`;
