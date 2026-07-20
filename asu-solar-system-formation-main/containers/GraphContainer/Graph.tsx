import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { ResponsiveLine, CustomLayerProps, CustomLayer } from '@nivo/line';
import styled from 'styled-components';
// @ts-expect-error
import { Theme, patternDotsDef } from '@nivo/core';
import { useTheme } from 'styled-components';
import { area } from 'd3-shape';

import noop from 'lodash/noop';

import { useStores } from 'providers/StoreProvider/useStores';
import { IGraphItem } from 'domainTypes/GraphModel';
import { calculateTemperature } from 'utils/calculateTemperature';

import { GraphPoint } from './GraphPoint';
import {
  MAX_RADIUS_IN_AU,
  MIN_OBJECT_RADIUS,
  START_FROST_LINE_RADIUS,
} from 'utils/consts';
import { MODES, TestObjectId } from 'domainTypes';
import { condensationValues, OBJECT_NAMES } from 'utils/objectsMap';

const DOTS_PATTERN_ID = 'dots-pattern';
const GRAPH_MIN_TEMPERATURE = 20;

export const Graph = observer(() => {
  const { graphStore, settingsStore } = useStores();
  const { Colors, Consts } = useTheme();
  const data = graphStore.data.map((item: IGraphItem) => ({
    x: item.distance,
    y: item.temperature,
    key: item.key,
    shortLabel: item.shortLabel,
    objectName:
      OBJECT_NAMES[item.key as TestObjectId] || item.shortLabel || item.key,
  }));

  const edgePoints = useMemo<[number, number][]>(
    () => [
      [MIN_OBJECT_RADIUS, calculateTemperature(MIN_OBJECT_RADIUS)],
      [settingsStore.maxRadius, calculateTemperature(settingsStore.maxRadius)],
    ],
    [settingsStore.maxRadius],
  );

  const rockAndMetalCondensePoints = useMemo<[number, number][]>(
    () => [
      [
        condensationValues.rock!,
        calculateTemperature(condensationValues.rock!),
      ],
      [settingsStore.maxRadius, calculateTemperature(settingsStore.maxRadius)],
    ],
    [settingsStore.maxRadius],
  );

  const frostLinePoints = useMemo<[number, number][]>(
    () => [
      [START_FROST_LINE_RADIUS, calculateTemperature(START_FROST_LINE_RADIUS)],
      [settingsStore.maxRadius, calculateTemperature(settingsStore.maxRadius)],
    ],
    [settingsStore.maxRadius],
  );

  const theme = useMemo<Theme>(
    () => ({
      textColor: Colors.graphTextColor,
      fontFamily: Consts.defaultFontFamily,
      fontSize: 16,
      axis: {
        legend: {
          text: {
            fontSize: 16,
            fontWeight: 'bold',
            fontFamily: Consts.defaultFontFamily,
          },
        },
      },
      grid: {
        line: {
          stroke: Colors.graphGridLineColor,
        },
      },
    }),
    [Colors, Consts],
  );

  const TrendLayer = useMemo(
    () =>
      ({ xScale, yScale }: CustomLayerProps) => {
        return (
          <line
            data-testid="trend-line"
            // @ts-expect-error
            x1={xScale(edgePoints[0][0])}
            // @ts-expect-error
            y1={yScale(edgePoints[0][1])}
            // @ts-expect-error
            x2={xScale(edgePoints[1][0])}
            // @ts-expect-error
            y2={yScale(edgePoints[1][1])}
            stroke={Colors.graphTrendLineColor}
            strokeWidth={1}
          />
        );
      },
    [edgePoints, Colors],
  );

  const TemperatureAreaLayer = useMemo(
    () =>
      areaLayerFactory({
        id: 'temperature-area',
        points: rockAndMetalCondensePoints,
        fill: Colors.graphTemperatureAreaColor,
      }),
    [rockAndMetalCondensePoints, Colors],
  );

  const FrostLineAreaLayer = useMemo(
    () =>
      areaLayerFactory({
        id: 'frost-line-area',
        points: frostLinePoints,
        fill: `url(#${DOTS_PATTERN_ID})`,
      }),
    [frostLinePoints],
  );

  const graphHeight = settingsStore.graphClearButtonVisible ? 410 : 457;
  const pointSummary =
    data.length > 0
      ? `Plotted points: ${data
          .map(
            (point) =>
              `${point.objectName}, ${point.x} astronomical units, ${point.y} kelvin`,
          )
          .join('; ')}.`
      : 'No points are currently plotted.';
  const enablePoints =
    settingsStore.mode === MODES.SOLAR_SYSTEM ||
    settingsStore.mode === MODES.FROST_LINE
      ? graphStore.solarSystemIconsVisible
      : settingsStore.mode === MODES.EXOPLANETS
      ? graphStore.exoplanetIconsVisible
      : true;

  return (
    <GraphFigure
      aria-labelledby="graph-title"
      aria-describedby="graph-summary graph-regions"
      tabIndex={0}
    >
      <ChartWrapper style={{ height: graphHeight }} aria-hidden="true">
        <ResponsiveLine
          margin={{ top: 20, right: 20, bottom: 80, left: 90 }}
          theme={theme}
          animate={false}
          isInteractive={false}
          enableSlices={false}
          data={[
            {
              id: 'points',
              data: data,
            },
          ]}
          gridYValues={[16, 20, 50, 100, 500, 1000, 2000]}
          gridXValues={[0.125, 0.5, 1, 2, 5, 10, 20, 32]}
          xScale={{
            type: 'log',
            base: 2,
            min: MIN_OBJECT_RADIUS,
            max: MAX_RADIUS_IN_AU,
          }}
          axisBottom={{
            legend: 'Distance from the Sun (AU)',
            legendPosition: 'middle' as const,
            legendOffset: 50,
            tickValues: [0.5, 1, 2, 5, 10, 20, 32],
          }}
          yScale={{
            type: 'log',
            base: 2,
            min: GRAPH_MIN_TEMPERATURE,
            max: 2000,
          }}
          axisLeft={{
            tickValues: [20, 50, 100, 500, 1000, 2000],
            legend: 'Temperature (K)',
            legendPosition: 'middle' as const,
            legendOffset: -70,
          }}
          useMesh={true}
          layers={[
            'grid',
            'axes',
            graphStore.temperatureAreaVisible
              ? TemperatureAreaLayer
              : (noop as CustomLayer),
            graphStore.frostLineAreaVisible
              ? FrostLineAreaLayer
              : (noop as CustomLayer),
            graphStore.trendLineVisible ? TrendLayer : (noop as CustomLayer),
            'points',
          ]}
          pointSymbol={GraphPoint}
          defs={[
            patternDotsDef(DOTS_PATTERN_ID, {
              size: 5,
              padding: 10,
              stagger: false,
              background: 'transparent',
              color: Colors.graphFrostLineAreaColor,
            }),
          ]}
          enablePoints={enablePoints}
        />
      </ChartWrapper>
      <div className="sr-only">
        <p
          id="graph-summary"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          This graph covers distances from {MIN_OBJECT_RADIUS} to{' '}
          {MAX_RADIUS_IN_AU} astronomical units and temperatures from{' '}
          {GRAPH_MIN_TEMPERATURE} to 2000 kelvin. Temperature decreases as
          distance from the Sun increases. {pointSummary}
        </p>
        <div id="graph-regions">
          {graphStore.temperatureAreaVisible ? (
            <p>
              The yellow shaded rocks and metals region extends from{' '}
              {condensationValues.rock} to {settingsStore.maxRadius}{' '}
              astronomical units, from {GRAPH_MIN_TEMPERATURE} kelvin up to
              the temperature curve.
            </p>
          ) : null}
          {graphStore.frostLineAreaVisible ? (
            <p>
              The blue dotted hydrogen compounds region extends from{' '}
              {START_FROST_LINE_RADIUS} to {settingsStore.maxRadius}{' '}
              astronomical units, from {GRAPH_MIN_TEMPERATURE} kelvin up to
              the temperature curve.
            </p>
          ) : null}
          {!graphStore.temperatureAreaVisible &&
          !graphStore.frostLineAreaVisible ? (
            <p>No shaded or dotted condensation regions are currently visible.</p>
          ) : null}
        </div>
        {data.length > 0 ? (
          <table>
            <caption>Plotted temperature and distance data</caption>
            <thead>
              <tr>
                <th scope="col">Object</th>
                <th scope="col">Distance in AU</th>
                <th scope="col">Temperature in kelvin</th>
              </tr>
            </thead>
            <tbody>
              {data.map((point) => (
                <tr key={`${point.key}-${point.x}-${point.y}`}>
                  <th scope="row">{point.objectName}</th>
                  <td>{point.x}</td>
                  <td>{point.y}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </GraphFigure>
  );
});

const GraphFigure = styled.figure`
  ${({ theme: { Colors } }) => `
    width: 100%;
    min-width: 0;
    margin: 0;

    :focus-visible {
      outline: 3px solid ${Colors.graphFrostLineAreaColor};
      outline-offset: -5px;
    }
  `}
`;

const ChartWrapper = styled.div`
  width: 100%;
  min-width: 0;
`;

interface IAreaLayerFactoryOptions {
  id: string;
  points: [number, number][];
  fill: string;
}

const areaLayerFactory = ({ id, points, fill }: IAreaLayerFactoryOptions) => {
  return ({ xScale, yScale }: CustomLayerProps) => {
    const areaGenerator = area()
      // @ts-expect-error
      .x((d) => xScale(d[0]))
      // @ts-expect-error
      .y0(() => yScale(16))
      // @ts-expect-error
      .y1((d) => yScale(d[1]));

    return <path data-testid={id} d={areaGenerator(points)!} fill={fill} />;
  };
};
