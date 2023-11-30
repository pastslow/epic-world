export interface PhysicalAttributes {
  isAttacking?: boolean;
  isMining?: boolean;
  isMovingRight?: boolean;
  isMovingLeft?: boolean;
  isMovingBack?: boolean;
  width?: number;
  height?: number;
  speed?: number;
  left?: number;
  bottom?: number;
  initialPosition?: number;
  initialPositionY?: number;
  range?: number;
  pause?: number;
  position?: number;
  initialOrientation?: number;
  stackOrder?: number;
  backgroundX?: number;
  rotation?: number;
  projectileStartX?: number;
  projectileStartY?: number;
}
