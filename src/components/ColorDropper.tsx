import { FC, useEffect, useRef, useState } from "react";
import { Coordinates, debounce, getCoordinatesAndColor } from "../helpers/helpers";
import Sea from "../images/Sea.jpg";
import ColorPicker from "../images/IconColorPicker.svg";
import Magnifier from "./Magnifier";

const ColorDropper: FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    offsetX: 0,
    offsetY: 0,
  });
  const [color, setColor] = useState('');
  let [selectedColor, setSelectedColor] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isColorPickerClicked, setIsColorPickerClicked] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d", { willReadFrequently: true });

    if (!context) {
      return;
    }
    const image = new Image();
    image.onload = () => {
      context.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
    };
    image.src = Sea;
  }, []);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement>
  ): void => {
    if (!isColorPickerClicked) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;
    getCoordinatesAndColor(event, ctx, setCoordinates, setColor);
  };

  const debounceMouseMove = () => debounce(handleMouseMove, 13.4);

  const handleClick = (): void => {
    setSelectedColor(color);
    setIsColorPickerClicked(false);
    setCoordinates({ offsetX: 0, offsetY: 0 });
  };

  return (
    <>
      <div className="container">
        <button
          onClick={() => setIsColorPickerClicked(!isColorPickerClicked)}
          className="colorPicker"
        >
          <img src={ColorPicker} alt="error" />
        </button>
        {selectedColor && <div style={{ marginLeft: "auto" }}>
          <span> Selected color is '{selectedColor.toUpperCase()}'.</span>
        </div>}
      </div>
      <div onClick={handleClick}>
        <canvas
          id="canvas"
          ref={canvasRef}
          width="1400"
          height="550"
          onPointerMove={debounceMouseMove()}
        />
      </div>
      {isColorPickerClicked && (
        <Magnifier
          hexColor={color}
          coordinates={coordinates}
          canvasImage={canvasRef.current as HTMLCanvasElement}
        />
      )}
    </>
  );
};

export default ColorDropper;
