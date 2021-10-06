import React, { useEffect, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { useTheme } from 'styled-components';
import { reaction } from 'mobx';

import inRange from 'lodash/inRange';

import { useStores } from 'providers/StoreProvider/useStores';
import { useCanvas } from 'hooks/useCanvas';
import { ITestObject, MODEL_ELEMENTS_VISIBLE } from 'domainTypes';
import {
  measureAstronomicalDistance,
  measureDistance,
  radiansToDegreesInCircle,
} from 'utils/measureDistance';
import { MIN_OBJECT_RADIUS } from 'utils/consts';
import { canvasObjectTools, drawDonut, getSunDiameter } from 'utils/canvas';

import { StyledCanvas } from './elements';
import { alpha } from '@material-ui/system';
import { condensationValues, IMG_BY_OBJECT_ID } from 'utils/objectsMap';
import { imageCache } from 'utils/imageCache';

export const SolarSystemAreaCanvas = observer(() => {
  const { testObjectsStore, settingsStore } = useStores();
  const { Colors } = useTheme();

  const clickableCanvasRef = useCanvas();

  useEffect(() => {
    imageCache.addToCache(IMG_BY_OBJECT_ID.frost_line_pattern, {
      width: 120,
      height: 120,
    });
  }, []);

  const updateObjectPosition = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = clickableCanvasRef.current!;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const point = {
        x,
        y,
      };
      const sunCoordinates = {
        x: canvas.width / 2,
        y: canvas.height / 2,
      };
      const distance = measureAstronomicalDistance({
        point,
        edgeInPixels: settingsStore.maxRadiusInPixels,
        maxRadiusInAU: settingsStore.maxRadius,
        sunCoordinates,
      });

      const distanceInPixels = measureDistance(point, sunCoordinates);

      if (
        distance > settingsStore.maxRadius + 0.05 ||
        distance < MIN_OBJECT_RADIUS
      ) {
        return;
      }

      const angleRad = Math.atan2(
        sunCoordinates.y - point.y,
        sunCoordinates.x - point.x,
      );
      const angleDegrees = radiansToDegreesInCircle(angleRad);

      if (testObjectsStore.selectedObject?.meta?.distanceFromSun != null) {
        const THRESHOLD = 0.2;
        const halfDistance =
          testObjectsStore.selectedObject.meta.distanceFromSun * THRESHOLD;
        const threshold = halfDistance > THRESHOLD ? THRESHOLD : halfDistance;
        const helpToPlaceInOrbit = inRange(
          distance,
          testObjectsStore.selectedObject.meta.distanceFromSun - threshold,
          testObjectsStore.selectedObject.meta.distanceFromSun + threshold,
        );
        if (helpToPlaceInOrbit) {
          const fixedDistance =
            testObjectsStore.selectedObject.meta.distanceFromSun;
          const fixedDistanceInPixels =
            (fixedDistance * settingsStore.maxRadiusInPixels) /
            settingsStore.maxRadius;

          const newX =
            sunCoordinates.x - fixedDistanceInPixels * Math.cos(angleRad);
          const newY =
            sunCoordinates.y - fixedDistanceInPixels * Math.sin(angleRad);

          const newPoint = {
            x: newX,
            y: newY,
          };

          return testObjectsStore.selectedObject?.updatePosition({
            distance: fixedDistance,
            distanceInPixels: fixedDistanceInPixels,
            coordinates: newPoint,
            angle: angleDegrees,
          });
        }
      }

      testObjectsStore.selectedObject?.updatePosition({
        distance,
        distanceInPixels,
        coordinates: point,
        angle: angleDegrees,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [testObjectsStore, settingsStore, clickableCanvasRef],
  );

  const { drawObject, drawObjectLabel, drawObjectOrbit } = useMemo(
    () =>
      canvasObjectTools({
        canvas: clickableCanvasRef.current,
        currentRadius: settingsStore.radius,
        maxRadius: settingsStore.maxRadius,
        frostLineColor: Colors.frostLineColor,
        objectOrbitColor: Colors.objectOrbitColor,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      clickableCanvasRef.current,
      settingsStore.radius,
      settingsStore.maxRadius,
      Colors,
    ],
  );

  useEffect(() => {
    const resetCanvas = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(
        0,
        0,
        settingsStore.solarSystemCanvasOptions.canvasBoundaries.width,
        settingsStore.solarSystemCanvasOptions.canvasBoundaries.height,
      );
    };

    const drawRockCondenseArea = (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
    ) => {
      if (
        settingsStore.isVisibleModelElements(
          MODEL_ELEMENTS_VISIBLE.ROCKS_AND_METALS_CONDENSE,
        )
      ) {
        const currentSunRadius =
          getSunDiameter(settingsStore.radius, settingsStore.maxRadius) / 2;
        const calculatedDistanceInPixels =
          (settingsStore.maxRadiusInPixels / settingsStore.maxRadius) *
          condensationValues.rock!;
        const startDistanceInPixels =
          calculatedDistanceInPixels < currentSunRadius
            ? currentSunRadius
            : calculatedDistanceInPixels;

        drawDonut({
          canvas,
          ctx,
          color: Colors.solarSystemRockCondenseAreaColor,
          startDistanceInPixels,
          endDistanceInPixels: settingsStore.maxRadiusInPixels,
        });
      }
    };

    const drawHydrogenCondenseArea = (
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
    ) => {
      if (
        settingsStore.isVisibleModelElements(
          MODEL_ELEMENTS_VISIBLE.HYDROGEN_COMPOUNDS_CONDENSE,
        )
      ) {
        const pattern = ctx.createPattern(
          imageCache.get(IMG_BY_OBJECT_ID.frost_line_pattern)!,
          'repeat',
        );
        const startDistanceInPixels =
          (settingsStore.maxRadiusInPixels / settingsStore.maxRadius) *
          condensationValues.compound!;
        drawDonut({
          canvas,
          ctx,
          color: pattern || alpha(Colors.graphFrostLineAreaColor, 0.2),
          startDistanceInPixels,
          endDistanceInPixels: settingsStore.maxRadiusInPixels,
        });
      }
    };

    const draw = (position: { x: number; y: number } | undefined) => {
      if (!position) {
        return;
      }

      const canvas = clickableCanvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      resetCanvas(ctx);

      drawRockCondenseArea(canvas, ctx);
      drawHydrogenCondenseArea(canvas, ctx);

      const shouldDrawingObject = (object: ITestObject): boolean => {
        if (
          object.isSolarSystemPlanet &&
          !settingsStore.isVisibleModelElements(
            MODEL_ELEMENTS_VISIBLE.SOLAR_SYSTEM_PLANET_ICONS_AND_ORBITS,
          )
        ) {
          return false;
        }

        if (
          object.isFrostLine &&
          !settingsStore.isVisibleModelElements(
            MODEL_ELEMENTS_VISIBLE.FROST_LINE,
          )
        ) {
          return false;
        }

        if (
          object.isExoplanet &&
          !settingsStore.isVisibleModelElements(
            MODEL_ELEMENTS_VISIBLE.EXO_SYSTEM_PLANET_ICONS_AND_ORBITS,
          )
        ) {
          return false;
        }

        return true;
      };

      const filteredObjects =
        testObjectsStore.placedObjects.filter(shouldDrawingObject);

      filteredObjects.forEach((object: ITestObject) => {
        drawObjectOrbit(object);
      });
      filteredObjects.forEach((object: ITestObject) => {
        drawObject(object);
      });
      if (settingsStore.drawObjectLabels) {
        filteredObjects.forEach((object: ITestObject) => {
          drawObjectLabel(object);
        });
      }
    };

    const coordinatesDisposer = reaction(
      () => testObjectsStore.selectedObject?.coordinates,
      draw,
    );

    const placedDisposer = reaction(
      () => testObjectsStore.selectedObject?.isPlaced,
      () => draw({ x: 0, y: 0 }),
    );

    const drawObjectLabelsDisposer = reaction(
      () => settingsStore.drawObjectLabels,
      () => draw({ x: 0, y: 0 }),
    );

    const modeDisposer = reaction(
      () => settingsStore.mode,
      () => draw({ x: 0, y: 0 }),
    );

    const modelElementsDisposer = reaction(
      () => settingsStore.modelElements,
      () => draw({ x: 0, y: 0 }),
    );

    const shouldIgnoreAdditionalDrawing = (): boolean =>
      testObjectsStore.placedObjects.length > 0 ||
      (testObjectsStore.placedObjects.length === 0 &&
        !(
          settingsStore.isVisibleModelElements(
            MODEL_ELEMENTS_VISIBLE.HYDROGEN_COMPOUNDS_CONDENSE,
          ) ||
          settingsStore.isVisibleModelElements(
            MODEL_ELEMENTS_VISIBLE.ROCKS_AND_METALS_CONDENSE,
          )
        ));

    const handleDrawWithoutObjects = () => {
      if (shouldIgnoreAdditionalDrawing()) {
        return;
      }

      requestAnimationFrame(() => {
        draw({ x: 0, y: 0 });
      });
    };

    const radiusDisposer = reaction(
      () => settingsStore.radius,
      handleDrawWithoutObjects,
    );

    const canvasBoundariesDisposer = reaction(
      () => settingsStore.solarSystemCanvasOptions.canvasBoundaries,
      handleDrawWithoutObjects,
    );

    return () => {
      coordinatesDisposer();
      placedDisposer();
      modeDisposer();
      drawObjectLabelsDisposer();
      modelElementsDisposer();
      radiusDisposer();
      canvasBoundariesDisposer();
    };
  }, [
    drawObject,
    drawObjectLabel,
    drawObjectOrbit,
    clickableCanvasRef,
    settingsStore,
    settingsStore.drawObjectLabels,
    settingsStore.mode,
    settingsStore.solarSystemCanvasOptions.canvasBoundaries.height,
    settingsStore.solarSystemCanvasOptions.canvasBoundaries.width,
    settingsStore.modelElements,
    testObjectsStore.placedObjects,
    testObjectsStore.selectedObject?.coordinates,
    testObjectsStore.selectedObject?.isPlaced,
    Colors,
  ]);

  return (
    <StyledCanvas
      data-testid="solar-system-clickable-canvas"
      ref={clickableCanvasRef}
      width={settingsStore.solarSystemCanvasOptions.canvasBoundaries.width}
      height={settingsStore.solarSystemCanvasOptions.canvasBoundaries.height}
      onMouseDown={updateObjectPosition}
    />
  );
});
