/* eslint-disable @typescript-eslint/naming-convention */
import partial from 'lodash/partial';
import inRange from 'lodash/inRange';
import noop from 'lodash/noop';
import memoize from 'lodash/memoize';
import cond from 'lodash/cond';
import stubTrue from 'lodash/stubTrue';

import { ITestObject } from 'domainTypes';

import { MAX_RADIUS_IN_AU, MAX_SCALE_SIZE, MIN_OBJECT_RADIUS } from './consts';
import { IPoint } from './measureDistance';

interface IDrawOutlineCircleArgs {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  line: {
    width: number;
    color: string;
    /**
     * Segments for dashed line
     */
    segments?: number[];
  };
  distanceInPixels: number;
}

export const drawOutlineCircle = ({
  canvas,
  ctx,
  line,
  distanceInPixels,
}: IDrawOutlineCircleArgs) => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  ctx.save();
  ctx.beginPath();
  ctx.lineWidth = line.width;
  ctx.setLineDash(line.segments || []);
  ctx.beginPath();
  ctx.arc(centerX, centerY, distanceInPixels, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.strokeStyle = line.color;
  ctx.stroke();
  ctx.restore();
};

export function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number | { tl: number; tr: number; br: number; bl: number },
  fill?: boolean,
  stroke?: boolean,
) {
  if (typeof stroke === 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    for (let side in defaultRadius) {
      // @ts-expect-error
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height,
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}

interface ICanvasObjectToolsArgs {
  canvas: HTMLCanvasElement | null;
  currentRadius: number;
  maxRadius: number;
  objectOrbitColor: string;
  frostLineColor: string;
}

interface ICanvasObjectToolsResult {
  drawObject(object: ITestObject): void;
  drawObjectOrbit(object: ITestObject): void;
  drawObjectLabel(object: ITestObject): void;
}

export const canvasObjectTools = ({
  canvas,
  currentRadius,
  maxRadius,
  objectOrbitColor,
  frostLineColor,
}: ICanvasObjectToolsArgs): ICanvasObjectToolsResult => {
  if (!canvas) {
    return {
      drawObject: noop,
      drawObjectOrbit: noop,
      drawObjectLabel: noop,
    };
  }

  const ctx = canvas.getContext('2d')!;
  const shouldIgnoreRendering = (object: ITestObject): boolean =>
    object.distance > maxRadius + 0.05 || object.distance < MIN_OBJECT_RADIUS;

  const drawObject = (object: ITestObject) => {
    if (shouldIgnoreRendering(object)) {
      return;
    }

    const drawImage = () => {
      const {
        width: imageWidth,
        height: imageHeight,
        middleCoordinates,
      } = getObjectBoundaries(object, currentRadius);

      ctx.drawImage(
        object.image,
        middleCoordinates.x,
        middleCoordinates.y,
        imageWidth,
        imageHeight,
      );
    };

    if (object.isFrostLine) {
      const frostLineSize = currentRadius > 24 ? 2 : currentRadius > 16 ? 3 : 4;
      const drawFrostLine = partial(drawOutlineCircle, {
        canvas,
        ctx,
        distanceInPixels: object.distanceInPixels!,
        line: {
          color: frostLineColor,
          width: frostLineSize,
        },
      });

      return drawFrostLine();
    }

    drawImage();
  };

  const drawObjectOrbit = (object: ITestObject) => {
    if (shouldIgnoreRendering(object)) {
      return;
    }

    const _drawObjectOrbit = partial(drawOutlineCircle, {
      canvas,
      ctx,
      distanceInPixels: object.distanceInPixels!,
      line: {
        color: objectOrbitColor,
        width: 1,
      },
    });

    _drawObjectOrbit();
  };

  const drawObjectLabel = (object: ITestObject) => {
    if (object.shortLabel) {
      if (shouldIgnoreRendering(object)) {
        return;
      }

      const {
        width: imageWidth,
        height: imageHeight,
        middleCoordinates,
      } = getObjectBoundaries(object, currentRadius);
      const fontsize = 16;
      const fontFace = 'Open Sans, -apple-system, sans-serif';
      const lineHeight = 18;
      const text = object.shortLabel;

      ctx.font = fontsize + 'px ' + fontFace;
      const boxWidth = ctx.measureText(text).width + 2;
      const boxHeight = lineHeight;

      const centerCoordinates = {
        x: canvas.width / 2,
        y: canvas.height / 2,
      };

      const boxCoordinates = getLabelBoxCoordinates({
        coordinates: object.coordinates,
        centerCoordinates,
        middleCoordinates,
        boxWidth,
        boxHeight,
        imageWidth,
        imageHeight,
      });

      const textCoordinatesX = boxCoordinates.x + 1;
      const textCoordinatesY = boxCoordinates.y + 1;

      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';

      ctx.strokeStyle = '#fff';
      ctx.fillStyle = '#fff';
      roundRect(
        ctx,
        boxCoordinates.x,
        boxCoordinates.y,
        boxWidth,
        boxHeight,
        3,
        true,
      );

      ctx.fillStyle = '#333';
      ctx.fillText(text, textCoordinatesX, textCoordinatesY);
      ctx.restore();
    }
  };

  return {
    drawObject,
    drawObjectOrbit,
    drawObjectLabel,
  };
};

export const drawSun = (
  sunCoordinates: IPoint,
  ctx: CanvasRenderingContext2D,
  sunImage: HTMLImageElement,
  radius: number,
) => {
  const sunDiameter = getSunDiameter(radius);
  const sunImageWidth = sunDiameter;
  const sunImageHeight = sunDiameter;

  ctx.drawImage(
    sunImage,
    sunCoordinates.x - sunImageWidth / 2,
    sunCoordinates.y - sunImageHeight / 2,
    sunImageWidth,
    sunImageHeight,
  );
};

export const calcRadiusRatio = (radius: number) => {
  return (MAX_RADIUS_IN_AU / radius - 1) / MAX_SCALE_SIZE + 1;
};

/**
 * [0] - size above which percentage occurs
 * [1] - percentage of break point validity
 */
const sizesAndBreakPoints = [
  [10, 1],
  [15, 0.75],
  [20, 0.5],
  [25, 0.25],
  [40, 0],
];

export const getSunDiameter = memoize(
  (radius: number, maxRadius: number = MAX_RADIUS_IN_AU): number => {
    for (let index = 0; index < sizesAndBreakPoints.length; index++) {
      const [minSize, previousPercentage] = sizesAndBreakPoints[index - 1] || [
        sizesAndBreakPoints[0][0],
        2,
      ];
      const [maxSize, percentage] = sizesAndBreakPoints[index];
      const lowRadius = maxRadius * percentage;
      const highRadius = maxRadius * previousPercentage;
      if (inRange(radius, lowRadius, highRadius)) {
        return getScaledSize({
          minSize,
          maxSize,
          radius,
          lowRadius,
          highRadius,
        });
      }
    }

    return sizesAndBreakPoints[sizesAndBreakPoints.length - 1][0];
  },
);

const getScaledSize = ({
  minSize,
  maxSize,
  radius,
  lowRadius,
  highRadius,
}: {
  minSize: number;
  maxSize: number;
  radius: number;
  lowRadius: number;
  highRadius: number;
}) => {
  const diff = maxSize - minSize;
  const ratio = (highRadius - radius) / (highRadius - lowRadius);
  const additionalSize = diff * ratio;
  const result = minSize + additionalSize;

  return result;
};

interface IObjectBoundaries {
  width: number;
  height: number;
  middleCoordinates: IPoint;
}

const getObjectBoundaries = (
  object: ITestObject,
  currentRadius: number,
): IObjectBoundaries => {
  const sunDiameter = object.meta?.isScalable
    ? getSunDiameter(currentRadius)
    : null;
  const distanceOuterPlanets = object.meta?.distanceOuterPlanets ?? 4;
  const outerObjectScaleDivider = object.meta?.outerObjectScaleDivider ?? 1.25;
  const innerObjectScaleDivider = object.meta?.innerObjectScaleDivider ?? 3;
  const imageWidthRatio =
    object.image.height > object.image.width
      ? object.image.width / object.image.height
      : 1;
  const imageHeightRatio =
    object.image.width > object.image.height
      ? object.image.height / object.image.width
      : 1;
  const sizeDivider =
    object.distance > distanceOuterPlanets
      ? outerObjectScaleDivider
      : innerObjectScaleDivider;
  const imageWidth =
    sunDiameter == null
      ? object.image.width
      : Math.min(
          (sunDiameter / sizeDivider) * imageWidthRatio,
          object.image.width,
        );
  const imageHeight =
    sunDiameter == null
      ? object.image.height
      : Math.min(
          (sunDiameter / sizeDivider) * imageHeightRatio,
          object.image.height,
        );
  const middleHorizontalCoordinates = object.coordinates.x - imageWidth / 2;
  const middleVerticalCoordinates = object.coordinates.y - imageHeight / 2;

  return {
    width: imageWidth,
    height: imageHeight,
    middleCoordinates: {
      x: middleHorizontalCoordinates,
      y: middleVerticalCoordinates,
    },
  };
};

interface IDrawDonutArgs {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  color: string | CanvasPattern;
  startDistanceInPixels: number;
  endDistanceInPixels: number;
}

export const drawDonut = ({
  canvas,
  ctx,
  color,
  startDistanceInPixels,
  endDistanceInPixels,
}: IDrawDonutArgs) => {
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  ctx.save();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(centerX, centerY, startDistanceInPixels, 0, Math.PI * 2, false);
  ctx.arc(centerX, centerY, endDistanceInPixels, 0, Math.PI * 2, true);
  ctx.fill();

  ctx.restore();
};

interface IBoxCoordinatesArgs {
  coordinates: IPoint;
  centerCoordinates: IPoint;
  middleCoordinates: IPoint;
  boxWidth: number;
  boxHeight: number;
  imageWidth: number;
  imageHeight: number;
}

const isDirectionNW = ({
  coordinates,
  centerCoordinates,
}: IBoxCoordinatesArgs) =>
  coordinates.x < centerCoordinates.x && coordinates.y < centerCoordinates.y;

const isDirectionNE = ({
  coordinates,
  centerCoordinates,
}: IBoxCoordinatesArgs) =>
  coordinates.x > centerCoordinates.x && coordinates.y < centerCoordinates.y;

const isDirectionSE = ({
  coordinates,
  centerCoordinates,
}: IBoxCoordinatesArgs) =>
  coordinates.x > centerCoordinates.x && coordinates.y > centerCoordinates.y;

const isDirectionSW = ({
  coordinates,
  centerCoordinates,
}: IBoxCoordinatesArgs) =>
  coordinates.x < centerCoordinates.x && coordinates.y > centerCoordinates.y;

const getDirectionNWCoordinates = ({
  middleCoordinates,
  boxWidth,
  boxHeight,
  imageWidth,
  imageHeight,
}: IBoxCoordinatesArgs) => {
  const boxX = middleCoordinates.x - boxWidth + imageWidth / 2;
  const boxY = middleCoordinates.y - boxHeight + imageHeight / 2;

  return {
    x: boxX <= 0 ? boxX + boxWidth : boxX,
    y: boxY <= 0 ? boxY + boxHeight : boxY,
  };
};

const getDirectionNECoordinates = ({
  centerCoordinates,
  middleCoordinates,
  boxWidth,
  boxHeight,
  imageWidth,
  imageHeight,
}: IBoxCoordinatesArgs) => {
  const boxX = middleCoordinates.x + imageWidth / 2;
  const boxY = middleCoordinates.y - boxHeight + imageHeight / 2;

  return {
    x: boxX >= centerCoordinates.x * 2 - boxWidth ? boxX - boxWidth : boxX,
    y: boxY <= 0 ? boxY + boxHeight : boxY,
  };
};

const getDirectionSECoordinates = ({
  centerCoordinates,
  middleCoordinates,
  boxWidth,
  boxHeight,
  imageWidth,
  imageHeight,
}: IBoxCoordinatesArgs) => {
  const boxX = middleCoordinates.x + imageWidth / 2;
  const boxY = middleCoordinates.y + imageHeight / 2;

  return {
    x: boxX >= centerCoordinates.x * 2 - boxWidth ? boxX - boxWidth : boxX,
    y: boxY >= centerCoordinates.y * 2 - boxHeight ? boxY - boxHeight : boxY,
  };
};

const getDirectionSWCoordinates = ({
  centerCoordinates,
  middleCoordinates,
  boxWidth,
  boxHeight,
  imageWidth,
  imageHeight,
}: IBoxCoordinatesArgs) => {
  const boxX = middleCoordinates.x - boxWidth + imageWidth / 2;
  const boxY = middleCoordinates.y + imageHeight / 2;

  return {
    x: boxX <= 0 ? boxX + boxWidth : boxX,
    y: boxY >= centerCoordinates.y * 2 - boxHeight ? boxY - boxHeight : boxY,
  };
};

const getLabelBoxCoordinates = cond<IBoxCoordinatesArgs, IPoint>([
  [isDirectionNW, getDirectionNWCoordinates],
  [isDirectionNE, getDirectionNECoordinates],
  [isDirectionSE, getDirectionSECoordinates],
  [isDirectionSW, getDirectionSWCoordinates],
  [stubTrue, getDirectionSECoordinates],
]);
