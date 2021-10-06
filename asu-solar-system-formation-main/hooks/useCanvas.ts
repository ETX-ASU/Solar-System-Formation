import React from 'react';

export const useCanvas = (
  callback?: (args: [HTMLCanvasElement, CanvasRenderingContext2D]) => void,
) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d');
    callback?.([canvas!, ctx!]);

    return () => ctx?.clearRect(0, 0, canvas!.width, canvas!.height);
  }, [callback]);

  return canvasRef;
};
