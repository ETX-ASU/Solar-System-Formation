import packageJson from '../package.json';

export const IS_DEBUG = process.env.NODE_ENV !== 'production';
export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH != null
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : IS_DEBUG
    ? ''
    : `/${packageJson.name}`;

export const CANVAS_WIDTH = 415;
export const CANVAS_HEIGHT = 305;
export const SUN_WIDTH = 40;
export const SUN_HEIGHT = 40;
export const IMAGE_WIDTH = 24;
export const IMAGE_HEIGHT = 24;
export const MAX_RADIUS_IN_PIXELS_REFERENCE = 142;
export const MAX_RADIUS_IN_AU = 32;
export const MAX_SCALE_SIZE = 1.5;
/**
 * Minimal object distance in Astronomical Unit
 */
export const MIN_OBJECT_RADIUS = 0.2;
export const START_FROST_LINE_RADIUS = 4.9;
