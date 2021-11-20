import React from "react";
import { useState } from "react";

export const Colorpicker = ({
  x = 0,
  y = 0,
  callback = (s: string) => console.log("_____ cb", s),
  style = {},
}) => {
  const [color, setColor] = useState("blue");

  const handleChangeColor = (event: { target: { value: string } }) => {
    setColor(event.target.value);
    callback(event.target.value);
  };
  return (
    <input
      type="color"
      value={color}
      onChange={handleChangeColor}
      style={{ position: "absolute", top: y, left: x, zIndex: 100, ...style }}
    />
  );
};
