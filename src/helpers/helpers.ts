export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<F>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const drawRectangles = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  numRectangles: number
) => {
  const width = canvas.width;
  const height = canvas.height;
  const rectangleWidth = width / numRectangles;
  const rectangleHeight = height / numRectangles;
  const rectangleBorderWidth = 0.1;
  const rectangleBorderColor = "white";
  context.strokeStyle = rectangleBorderColor;
  context.lineWidth = rectangleBorderWidth;
  context.font = "18px Monospace";
  context.textAlign = "center";
  context.textBaseline = "top";
  for (let i = 0; i < numRectangles; i++) {
    for (let j = 0; j < numRectangles; j++) {
      const x = i * rectangleWidth;
      const y = j * rectangleHeight;
      context.strokeRect(
        x + rectangleBorderWidth / 2,
        y + rectangleBorderWidth / 2,
        rectangleWidth - rectangleBorderWidth,
        rectangleHeight - rectangleBorderWidth
      );
    }
  }
};

export const getCoordinatesAndColor = (
  event: React.MouseEvent,
  context: CanvasRenderingContext2D,
  setCoordinates: (coordinates: Coordinates) => void,
  setColor: (color: string) => void,
) => {
  const x = event.nativeEvent.offsetX;
  const y = event.nativeEvent.offsetY;
  setCoordinates({ offsetX: x, offsetY: y });
  const pixelData = context.getImageData(x, y, 1, 1).data;
  const hexColor = getHexColor(pixelData);
  setColor(hexColor);
};

export const getHexColor = (pixelData: Uint8ClampedArray) =>
  "#" +
  pixelData[0].toString(16) +
  pixelData[1].toString(16) +
  pixelData[2].toString(16);

export type Coordinates = {
  offsetX: number;
  offsetY: number;
};

export type MagnifierProps = {
  hexColor: string;
  coordinates: Coordinates;
  canvasImage: HTMLCanvasElement;
};
