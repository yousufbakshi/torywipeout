// src/components/HoverableHexagon.tsx
import React from "react";
import { Hexagon, HexagonProps } from "react-hexgrid";

interface HoverableHexagonProps extends HexagonProps {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const HoverableHexagon: React.FC<HoverableHexagonProps> = ({
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  return (
    <g onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Hexagon {...props} />
    </g>
  );
};

export default HoverableHexagon;
