import { IPositionToUpdate } from 'domainTypes';

export interface IPoint {
  x: number;
  y: number;
}

export const measureDistance = (
  startPoint: IPoint,
  endPoint: IPoint,
): number => {
  if (startPoint.x === endPoint.x) {
    return Math.abs(startPoint.y - endPoint.y);
  }

  if (startPoint.y === endPoint.y) {
    return Math.abs(startPoint.x - endPoint.x);
  }

  return Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
};

export interface IAstronomicalDistanceOptions {
  point: IPoint;
  sunCoordinates: IPoint;
  edgeInPixels: number;
  maxRadiusInAU: number;
}

export const measureAstronomicalDistance = ({
  point,
  sunCoordinates,
  edgeInPixels,
  maxRadiusInAU,
}: IAstronomicalDistanceOptions): number => {
  const distanceInPixels = measureDistance(sunCoordinates, point);
  const distanceInAU = (maxRadiusInAU * distanceInPixels) / edgeInPixels;

  return distanceInAU;
};

export const radiansToDegreesInCircle = (radians: number): number => {
  const degrees = (180 * radians) / Math.PI;

  return degrees > 0 ? degrees : 360 + degrees;
};

export const degreesToRadiansInCircle = (angle: number): number => {
  const degrees = angle > 180 ? angle - 360 : angle;

  return (degrees * Math.PI) / 180;
};

interface IPointCoordinates {
  x: number;
  y: number;
}

interface IUpdatePositionForDistanceArgs {
  distance: number;
  angleInDegrees: number;
  currentDistance: number;
  currentDistanceInPixels: number;
  maxObjectRadius: number;
  minObjectRadius: number;
  maxObjectRadiusInPixels: number;
  sunCoordinates: IPointCoordinates;
}

export const getCoordinatesForDistance = (
  distanceInPixels: number,
  angleInDegrees: number,
  sunCoordinates: IPointCoordinates,
): IPointCoordinates => {
  const angleRad = degreesToRadiansInCircle(angleInDegrees);

  const newX = sunCoordinates.x - distanceInPixels * Math.cos(angleRad);
  const newY = sunCoordinates.y - distanceInPixels * Math.sin(angleRad);

  return {
    x: newX,
    y: newY,
  };
};

export const updatePositionForDistance = ({
  distance,
  angleInDegrees,
  currentDistance,
  currentDistanceInPixels,
  maxObjectRadius,
  minObjectRadius,
  maxObjectRadiusInPixels,
  sunCoordinates,
}: IUpdatePositionForDistanceArgs): IPositionToUpdate => {
  const safeDistance = Math.max(
    Math.min(distance, maxObjectRadius),
    minObjectRadius,
  );

  const scaledDistanceInPixels =
    currentDistance > 0
      ? (currentDistanceInPixels * safeDistance) / currentDistance
      : (maxObjectRadiusInPixels * safeDistance) / maxObjectRadius;

  return {
    distance: safeDistance,
    distanceInPixels: scaledDistanceInPixels,
    angle: angleInDegrees,
    coordinates: getCoordinatesForDistance(
      scaledDistanceInPixels,
      angleInDegrees,
      sunCoordinates,
    ),
  };
};
