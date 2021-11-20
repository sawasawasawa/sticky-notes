import React from "react";

export function Controls(props: {
  value: any;
  onChange: (e) => void;
  onClick: () => any;
  onClick1: () => void;
}) {
  return (
    <>
      <select
        value={props.value}
        onChange={props.onChange}
        style={{ position: "absolute", left: 20, bottom: 20 }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
      </select>
      <h1
        onClick={props.onClick}
        style={{
          position: "absolute",
          left: 10,
          top: 45,
          fontSize: "200px",
          lineHeight: "100px",
        }}
      >
        +
      </h1>

      <h1
        onClick={props.onClick1}
        style={{
          position: "absolute",
          left: window.innerWidth - 350,
          top: window.innerHeight - 100,
          fontSize: 100,
        }}
      >
        RESET
      </h1>
    </>
  );
}
