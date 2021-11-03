// Types
import { IPosition } from "@common/types/Position";

/**
 * Calculate if a point is inside a rect
 * @param boundingBox
 * @param point
 * @returns
 */
export const checkIfRectContainsPoint = (
  boundingBox: DOMRect,
  point: IPosition
) => {
  const horizontallyContains =
    boundingBox.x <= point.x && boundingBox.x + boundingBox.width >= point.x;
  const verticallyContains =
    boundingBox.y <= point.y && boundingBox.y + boundingBox.height >= point.y;

  return horizontallyContains && verticallyContains;
};
