import  { useRef, useEffect, FC } from "react";
import { drawRectangles, MagnifierProps } from "../helpers/helpers";

const Magnifier: FC<MagnifierProps> = ({
  hexColor,
  coordinates,
  canvasImage,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if(!coordinates.offsetX && !coordinates.offsetY) return;
    const canvas = canvasRef.current;
    if(!canvas) return;
    const context = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;
    context.drawImage(
      canvasImage,
      coordinates.offsetX - width / 2,
      coordinates.offsetY - height / 2,
      width,
      height,
      0,
      0,
      width,
      height
    );
    drawRectangles(canvas, context, 8);
    context.fillText(hexColor.toUpperCase(), width / 2, height / 2);
  }, [canvasImage, coordinates.offsetX, coordinates.offsetY, hexColor]);

  return (
    <canvas
      ref={canvasRef}
      width={80}
      height={80}
      style={{
        position: "absolute",
        borderRadius: "50%",
        border: `10px solid ${!coordinates.offsetY && !coordinates.offsetX ? 'black' : hexColor}`,
        top: coordinates.offsetY,
        left: coordinates.offsetX,
      }}
    />
  );
};

export default Magnifier;
