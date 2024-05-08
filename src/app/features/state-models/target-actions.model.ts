import { TimeStamp } from "./time-stamp.model";

export class TargetActions {
  public static isTargetAheadEntity(
    targetOffsetLeft: number,
    entityPosition: number,
    entityWidth: number,
    enemySize: number,
    entityRange = 0
  ): boolean {
    return (
      targetOffsetLeft >
      entityPosition + (entityWidth - enemySize / 2 + entityRange)
    );
  }

  public static isTargetBehindEntity(
    targetOffsetLeft: number,
    entityPosition: number,
    enemySize: number,
    entityRange = 0
  ): boolean {
    return targetOffsetLeft < entityPosition - enemySize / 2 - entityRange;
  }

  public static isTargetInActionEntityRange(
    targetOffsetLeft: number,
    targetSize: number,
    entityX: number,
    entitySize: number
  ): boolean {
    const isTargetAheadEnemy = this.isTargetAheadEntity(
      targetOffsetLeft,
      entityX,
      entitySize,
      targetSize
    );
    const isTargetBehindEntity = this.isTargetBehindEntity(
      targetOffsetLeft,
      entityX,
      targetSize
    );

    return isTargetAheadEnemy || isTargetBehindEntity;
  }

  public static updateActionsPause(
    entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody
  ) {
    const hadEnoughPause =
      TimeStamp.now - entity["targetOrigin"].combatAttributes.pauseStartTime >
      entity["targetOrigin"].combatAttributes.pauseBetweenAttack;

    if (hadEnoughPause) {
      entity["targetOrigin"].combatAttributes.pauseStartTime = 0;
    }
  }
}
