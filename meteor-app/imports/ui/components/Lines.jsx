import React from "react";
import { Line } from "react-konva";

export function Lines({ lines = [] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke="#df4b26"
          strokeWidth={line.tool === "eraser" ? 50 : 5}
          tension={0.5}
          lineCap="round"
          globalCompositeOperation={
            line.tool === "eraser" ? "destination-out" : "source-over"
          }
        />
      ))}
    </>
  );
}
