export interface PhysicalAttributes {
   isAttacking?: boolean;
   isMining?: boolean;
   isMovingRight?: boolean;
   isMovingLeft?: boolean;
   isMovingBack?: boolean;
   width?: number;
   height?: number;
   speed?: number;
   initialPosition?: number;
   initialPositionY?: number;
   pause?: number;
   movementForbidden?: number;
}
