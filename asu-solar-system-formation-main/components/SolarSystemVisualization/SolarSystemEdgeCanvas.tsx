import React, { useCallback, useEffect } from 'react';
import { useTheme } from 'styled-components';
import { observer } from 'mobx-react-lite';

import { useStores } from 'providers/StoreProvider/useStores';
import { useCanvas } from 'hooks/useCanvas';

import { StyledCanvas } from './elements';
import { ITestObjectSource, MODES } from 'domainTypes';
import { BASE_PATH } from 'utils/consts';
import { drawSun, drawOutlineCircle } from 'utils/canvas';
import { OBJECTS_BY_MODE } from 'utils/objectsMap';

const IMAGES_CACHE = new Map<string, HTMLImageElement>();

export const SolarSystemEdgeCanvas = observer(() => {
  const { Colors } = useTheme();
  const { settingsStore } = useStores();

  const drawSolarSystemEdge = useCallback(
    (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
      drawOutlineCircle({
        canvas,
        ctx,
        distanceInPixels: settingsStore.maxRadiusInPixels,
        line: {
          color: Colors.solarSystemEdge,
          width: 1,
          segments: [10, 6],
        },
      });

      if (settingsStore.drawHelpersOrbits) {
        const colors = [
          '#f94144',
          '#f3722c',
          '#f8961e',
          '#f9844a',
          '#f9c74f',
          '#90be6d',
          '#43aa8b',
          '#4d908e',
          '#577590',
          '#277da1',
        ];
        const orbits = OBJECTS_BY_MODE[MODES.SOLAR_SYSTEM].map(
          (object: ITestObjectSource) => object.meta?.distanceFromSun,
        ) as number[];
        orbits.forEach((distanceInAU, index) => {
          drawOutlineCircle({
            canvas,
            ctx,
            distanceInPixels:
              (distanceInAU * settingsStore.maxRadiusInPixels) /
              settingsStore.maxRadius,
            line: {
              color: colors[index],
              width: 1,
              segments: [],
            },
          });
        });
      }
    },
    [
      Colors,
      settingsStore.maxRadiusInPixels,
      settingsStore.drawHelpersOrbits,
      settingsStore.maxRadius,
    ],
  );

  const edgeCanvasRef = useCanvas(([canvas, ctx]) => {
    drawSolarSystemEdge(canvas, ctx);
  });

  useEffect(() => {
    const sunName = settingsStore.mode === MODES.EXOPLANETS ? 'exo-sun' : 'sun';
    const { width, height } =
      settingsStore.solarSystemCanvasOptions.sunBoundaries;
    const key = `${sunName}_${width}x${height}`;
    if (IMAGES_CACHE.has(key)) {
      const sunImage = IMAGES_CACHE.get(key)!;
      if (edgeCanvasRef.current) {
        const ctx = edgeCanvasRef.current.getContext('2d');
        drawSun(
          settingsStore.sunCoordinates,
          ctx!,
          sunImage,
          settingsStore.radius,
        );
      }

      return;
    }

    const image = new Image(
      settingsStore.solarSystemCanvasOptions.sunBoundaries.width,
      settingsStore.solarSystemCanvasOptions.sunBoundaries.height,
    );
    image.onload = () => {
      if (edgeCanvasRef && edgeCanvasRef.current) {
        const ctx = edgeCanvasRef.current.getContext('2d');
        drawSun(
          settingsStore.sunCoordinates,
          ctx!,
          image,
          settingsStore.radius,
        );
      }
    };
    image.src = `${BASE_PATH}/assets/${sunName}.png`;
    IMAGES_CACHE.set(key, image);
  }, [
    settingsStore.mode,
    settingsStore.sunCoordinates,
    settingsStore.solarSystemCanvasOptions.sunBoundaries,
    settingsStore.maxRadiusInPixels,
    settingsStore.radius,
    settingsStore.drawHelpersOrbits,
    edgeCanvasRef,
  ]);

  return (
    <StyledCanvas
      ref={edgeCanvasRef}
      width={settingsStore.solarSystemCanvasOptions.canvasBoundaries.width}
      height={settingsStore.solarSystemCanvasOptions.canvasBoundaries.height}
    />
  );
});
