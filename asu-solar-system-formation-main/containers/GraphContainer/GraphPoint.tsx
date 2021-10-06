import React from 'react';
import { PointSymbolProps, DatumValue } from '@nivo/line';

import memoize from 'lodash/memoize';

import { TestObjectId } from 'domainTypes';

import { condensationValues, IMG_BY_OBJECT_ID } from 'utils/objectsMap';

export type IGraphPointProps = PointSymbolProps & {
  datum: {
    y?: DatumValue | null;
    key?: TestObjectId;
    shortLabel?: string;
  };
};

export const GraphPoint = ({ datum }: IGraphPointProps) => {
  if (datum.key === 'probe') {
    return (
      <g data-testid="point_probe">
        <g fill="#fff" stroke="#2d3a4c" strokeWidth="3">
          <circle cx="0" cy="0" r="6" stroke="none" />
          <circle cx="0" cy="0" r="7.5" fill="none" />
        </g>
      </g>
    );
  }

  if (datum.key === 'gas' || datum.key === 'compound' || datum.key === 'rock') {
    const condensationValue = condensationValues[datum.key];
    const condensed =
      condensationValue == null ? false : datum.x! > condensationValue;

    return condensed ? (
      <g data-testid="condensed-point">
        <g fill="#2d3a4c" stroke="#2d3a4c" strokeWidth="3">
          <circle cx="0" cy="0" r="6" stroke="none" />
          <circle cx="0" cy="0" r="7.5" fill="none" />
        </g>
        <g fill="#2d3a4c" stroke="#fff" strokeWidth="2">
          <circle cx="0" cy="0" r="6" stroke="none" />
          <circle cx="0" cy="0" r="5" fill="none" />
        </g>
      </g>
    ) : (
      <g data-testid="no-condensed-point" transform="translate(-5 -5)">
        <g>
          <g
            transform="translate(0 2.121) rotate(-45)"
            fill="#435a6b"
            stroke="#2d3a4c"
            strokeWidth="3"
          >
            <rect width="3" height="14" rx="1.5" stroke="none" />
            <rect x="-1.5" y="-1.5" width="6" height="17" rx="3" fill="none" />
          </g>
          <g
            transform="translate(2.121 12.021) rotate(-135)"
            fill="#435a6b"
            stroke="#2d3a4c"
            strokeWidth="3"
          >
            <rect width="3" height="14" rx="1.5" stroke="none" />
            <rect x="-1.5" y="-1.5" width="6" height="17" rx="3" fill="none" />
          </g>
        </g>
        <g>
          <rect
            width="3"
            height="14"
            rx="1.5"
            transform="translate(0 2.121) rotate(-45)"
            fill="#fff"
          />
          <rect
            width="3"
            height="14"
            rx="1.5"
            transform="translate(2.121 12.021) rotate(-135)"
            fill="#fff"
          />
        </g>
      </g>
    );
  }

  if (
    datum.key &&
    ([
      'mercury',
      'venus',
      'earth',
      'mars',
      'jupiter',
      'saturn',
      'uranus',
      'neptune',
    ].includes(datum.key) ||
      ['planet1', 'planet2', 'planet3'].includes(datum.key))
  ) {
    let labelElement;
    if (datum.shortLabel) {
      const fontFamily = 'Montserrat, -apple-system, sans-serif';
      const fontSize = 16;
      const clientWidth = getTextWidth(datum.shortLabel, fontSize, fontFamily);

      const y = typeof datum.y === 'number' ? datum.y : 0;
      const shouldDrawTop = y < 250;

      const rectWidth = clientWidth + 4;
      const rectX = (-1 * rectWidth) / 2;
      const rectHeight = fontSize + 1;
      const lineStartY = shouldDrawTop ? -11.5 : 11.5;
      const lineEndY = shouldDrawTop ? -21.5 : 21.5;
      const rectY = shouldDrawTop ? lineEndY - rectHeight : lineEndY;
      const textX = rectX + 2;
      const textY = rectY - 2 + fontSize;

      labelElement = (
        <>
          <line
            x1="0"
            y1={lineStartY}
            x2="0"
            y2={lineEndY}
            style={{ stroke: 'rgb(255,255,255)', strokeWidth: 1 }}
          />
          <rect
            x={rectX}
            y={rectY}
            width={rectWidth}
            height={rectHeight}
            fill="#FFFFFF"
            rx="2"
          ></rect>
          <text
            x={textX}
            y={textY}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight="bold"
            fill="#333333"
          >
            {datum.shortLabel}
          </text>
        </>
      );
    }

    return (
      <g data-testid={`${datum.key}-point`}>
        <g fill="#2d3a4c" stroke="#2d3a4c" strokeWidth="3">
          <circle cx="0" cy="0" r="7" stroke="none" />
          <circle cx="0" cy="0" r="8.5" fill="none" />
        </g>
        <g transform="translate(-7.5 -7.5)">
          <image href={IMG_BY_OBJECT_ID[datum.key]} height="15" width="15" />
        </g>
        {labelElement}
      </g>
    );
  }

  return (
    <g>
      <circle fill="#fff" r={10 / 2} strokeWidth={2} stroke={'transparent'} />
      <circle
        r={10 / 5}
        strokeWidth={2}
        stroke={'transparent'}
        fill={'red'}
        fillOpacity={0.35}
      />
    </g>
  );
};

const getTextWidth = memoize(
  (text: string, fontSize: number, fontFamily: string): number => {
    const div = document.createElement('div');
    div.innerHTML = text;
    div.style.position = 'absolute';
    div.style.visibility = 'hidden';
    div.style.fontSize = `${fontSize}px`;
    div.style.fontFamily = fontFamily;
    document.body.appendChild(div);
    const clientWidth = div.clientWidth;
    document.body.removeChild(div);

    return clientWidth;
  },
);
