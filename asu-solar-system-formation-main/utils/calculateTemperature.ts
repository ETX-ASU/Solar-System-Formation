export const calculateTemperature = (distanceInAU: number): number => {
  return Math.pow(10, 2.73792671674324) * Math.pow(distanceInAU, -0.812550305);
};
