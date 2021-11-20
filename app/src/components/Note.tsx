import React, { useEffect, useState } from "react";
import { Group, Image, Rect, Text } from "react-konva";
import { EditableText } from "./EditableText";
import useImage from "use-image";

export function StickyNote({
  id,
  color,
  text,
  x,
  y,
  imageUrl,
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
  onChangeColorClick,
  onSetImageClick,
}) {
  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [image, state] = useImage(imageUrl);

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

  const onMouseOver = () => setHovered(true);
  const onMouseLeave = () => setHovered(false);

  const noteWidth = width + 40;
  const noteHeight = width + 60;

  const isImage = imageUrl && image;
  return (
    <Group
      id={id}
      x={x}
      y={y}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      {isImage && <Image image={image} />}
      {!isImage && (
        <>
          <Rect
            x={20}
            y={20}
            width={width}
            height={height + 40}
            fill={color}
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
            width={noteWidth}
            height={noteHeight}
            fill={color}
            perfectDrawEnabled={false}
            onClick={onClick}
            onTap={onClick}
          />
          <EditableText
            x={20}
            y={20}
            text={imageUrl ? state : text}
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

          <Text
            text={"image"}
            x={5}
            y={noteHeight - 10}
            fontSize={8}
            onClick={onSetImageClick}
            opacity={hovered ? 1 : 0}
            color={"red"}
          />
          <Text
            text={"color"}
            x={noteWidth - 23}
            y={noteHeight - 10}
            fontSize={8}
            onClick={onChangeColorClick}
            opacity={hovered ? 1 : 0}
            fill={"red"}
          />
        </>
      )}
      <Text
        text={"+"}
        x={isImage ? -10 : noteWidth - 5}
        y={0}
        onClick={deleteNote}
        rotationDeg={44}
        opacity={hovered ? 1 : 0}
      />
    </Group>
  );
}
