import * as React from "react";
import { Colorpicker } from "./Colorpicker";
import { Input } from "./Input";

export function Controls(props: {
  value: any;
  colorpicker: React.Component;
  imageInput: React.Component;
  onChange: (e) => void;
  addNote: () => any;
  removeAll: () => void;
}) {
  const { colorpicker, imageInput } = props;
  return (
    <div>
      <select
        value={props.value}
        onChange={props.onChange}
        style={{ position: "absolute", left: 20, bottom: 20 }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <h1
        onClick={props.addNote}
        style={{
          position: "absolute",
          left: 10,
          top: 25,
          fontSize: "100px",
          lineHeight: "100px",
        }}
      >
        +
      </h1>

      <h1
        onClick={props.removeAll}
        style={{
          position: "absolute",
          left: window.innerWidth - 350,
          top: window.innerHeight - 100,
          fontSize: 100,
        }}
      >
        RESET
      </h1>
      {colorpicker ? <Colorpicker {...colorpicker} /> : null}
      {imageInput ? <Input {...imageInput} /> : null}
    </div>
  );
}
