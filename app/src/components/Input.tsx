import { useState } from "react";

export const Input = ({
  x = 0,
  y = 0,
  value = "",
  callback = (s: string) => console.log("_____ cb", s),
  style = {},
}) => {
  const [text, setText] = useState(value);
  console.log("_______ x, y", x, y);
  const handleChangeText = (event: { target: { value: string } }) => {
    setText(event.target.value);
    callback(event.target.value);
  };
  return (
    <input
      type="text"
      value={text}
      placeholder={"Paste image url here"}
      onChange={handleChangeText}
      style={{
        position: "absolute",
        top: y,
        left: x,
        zIndex: 100,
        ...style,
        width: 132,
      }}
    />
  );
};
