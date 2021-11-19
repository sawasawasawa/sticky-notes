import React, { useEffect, useState } from "react";
import { Group, Rect, Text } from "react-konva";
import { EditableText } from "./EditableText";

export function StickyNote({
  colour,
  text,
  x,
  y,
  width,
  height,
  onClick,
  onTextResize,
  onTextChange,
  selected,
  onTextClick,
  onDragStart,
  onDragEnd,
  deleteNote,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    } else if (!selected && isTransforming) {
      setIsTransforming(false);
    }
  }, [selected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    onTextClick(!isEditing);
  }

  function toggleTransforming() {
    setIsTransforming(!isTransforming);
    onTextClick(!isTransforming);
  }

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Text text={"x"} x={-10} y={10} onClick={deleteNote} />
      <Rect
        x={20}
        y={20}
        width={width}
        height={height + 40}
        fill={colour}
        shadowColor="black"
        shadowOffsetY={10}
        shadowOffsetX={0}
        shadowBlur={30}
        shadowOpacity={0.6}
        perfectDrawEnabled={false}
      />
      <Rect
        x={0}
        y={0}
        width={width + 40}
        height={height + 60}
        fill={colour}
        perfectDrawEnabled={false}
        onClick={onClick}
        onTap={onClick}
      />
      {/*<EditableText*/}
      <EditableText
        x={20}
        y={40}
        text={text}
        width={width}
        height={height}
        onResize={onTextResize}
        isEditing={isEditing}
        isTransforming={isTransforming}
        onToggleEdit={toggleEdit}
        // onToggleTransform={toggleTransforming}
        onToggleTransform={() => {}}
        onChange={onTextChange}
        fontSize={16}
      />
    </Group>
  );
}
