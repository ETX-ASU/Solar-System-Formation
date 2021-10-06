import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAX_RADIUS_IN_PIXELS_REFERENCE,
} from 'components/SolarSystemVisualization/consts';
import {
  IPoint,
  IAstronomicalDistanceOptions,
  measureDistance,
  measureAstronomicalDistance,
} from './measureDistance';

interface ITestCase {
  startPoint: IPoint;
  endPoint: IPoint;
  expected: number;
}

describe('measureDistance()', () => {
  const testCases: ITestCase[] = [
    {
      startPoint: {
        x: 0,
        y: 0,
      },
      endPoint: {
        x: 3,
        y: 4,
      },
      expected: 5,
    },
    {
      startPoint: {
        x: 0,
        y: 0,
      },
      endPoint: {
        x: 0,
        y: 4,
      },
      expected: 4,
    },
    {
      startPoint: {
        x: 0,
        y: 0,
      },
      endPoint: {
        x: 3,
        y: 0,
      },
      expected: 3,
    },
    {
      startPoint: {
        x: 3,
        y: 4,
      },
      endPoint: {
        x: 0,
        y: 0,
      },
      expected: 5,
    },
    {
      startPoint: {
        x: 0,
        y: 4,
      },
      endPoint: {
        x: 0,
        y: 0,
      },
      expected: 4,
    },
    {
      startPoint: {
        x: 3,
        y: 0,
      },
      endPoint: {
        x: 0,
        y: 0,
      },
      expected: 3,
    },
  ];

  testCases.forEach((testCase: ITestCase) => {
    it(`Distance between ${JSON.stringify(
      testCase.startPoint,
    )} and ${JSON.stringify(testCase.endPoint)} should be ${
      testCase.expected
    }`, () => {
      const result = measureDistance(testCase.startPoint, testCase.endPoint);

      expect(result).toBe(testCase.expected);
    });
  });
});

interface ITestAstronomicalDistanceCase {
  description: string;
  options: IAstronomicalDistanceOptions;
  expected: number;
}

// NOTE: Deprecated after zooming
describe.skip('measureAstronomicalDistance()', () => {
  const testCases: ITestAstronomicalDistanceCase[] = [
    {
      description: 'Half radius distance in AU for canvas',
      options: {
        point: {
          x: CANVAS_WIDTH / 2,
          y: CANVAS_HEIGHT / 2 + MAX_RADIUS_IN_PIXELS_REFERENCE / 2,
        },
        radiusInAU: 16,
        radiusInPixels: MAX_RADIUS_IN_PIXELS_REFERENCE,
        sunCoordinates: {
          x: CANVAS_WIDTH / 2,
          y: CANVAS_HEIGHT / 2,
        },
      },
      expected: 8,
    },
    {
      description: 'Full radius distance in AU for canvas',
      options: {
        point: {
          x: CANVAS_WIDTH / 2,
          y: CANVAS_HEIGHT / 2 + MAX_RADIUS_IN_PIXELS_REFERENCE,
        },
        radiusInAU: 16,
        radiusInPixels: MAX_RADIUS_IN_PIXELS_REFERENCE,
        sunCoordinates: {
          x: CANVAS_WIDTH / 2,
          y: CANVAS_HEIGHT / 2,
        },
      },
      expected: 16,
    },
    {
      description: 'Half double radius distance in AU for canvas',
      options: {
        point: {
          x: CANVAS_WIDTH / 2,
          y: CANVAS_HEIGHT / 2 + MAX_RADIUS_IN_PIXELS_REFERENCE / 2,
        },
        radiusInAU: 32,
        radiusInPixels: MAX_RADIUS_IN_PIXELS_REFERENCE,
        sunCoordinates: {
          x: CANVAS_WIDTH / 2,
          y: CANVAS_HEIGHT / 2,
        },
      },
      expected: 16,
    },
  ];

  testCases.forEach((testCase: ITestAstronomicalDistanceCase) => {
    it(testCase.description, () => {
      const result = measureAstronomicalDistance(testCase.options);

      expect(result).toBe(testCase.expected);
    });
  });
});
