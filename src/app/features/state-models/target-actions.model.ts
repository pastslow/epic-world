import { DynamicBody } from '../../shared/interfaces/dynamic-body.interface';
import { GameScene } from '../models/game-scene.model';

export class TargetActions {
   public static isTargetAheadEntity(targetOffsetLeft: number, entityPosition: number, entityWidth: number, enemySize: number, entityRange = 0): boolean {
      return targetOffsetLeft > entityPosition + (entityWidth - enemySize / 2 + entityRange);
   }

   public static isTargetBehindEntity(targetOffsetLeft: number, entityPosition: number, enemySize: number, entityRange = 0): boolean {
      return targetOffsetLeft < entityPosition - enemySize / 2 - entityRange;
   }

   static isTargetInAttackEntityRange(entity: DynamicBody, monster: DynamicBody): boolean {
      const playerBounds = entity.attackRangeContainer.getBounds();
      const monsterBounds = monster.getBounds();

      const overlapX = Math.max(0, Math.min(playerBounds.right, monsterBounds.right) - Math.max(playerBounds.left, monsterBounds.left));

      const halfMonsterArea = monsterBounds.width / 2;

      return overlapX >= halfMonsterArea;
   }

   public static updateActionsPause(entity: DynamicBody) {
      const hadEnoughPause = GameScene.time.now - entity.targetOrigin.combatAttributes.pauseStartTime > entity.targetOrigin.combatAttributes.pauseBetweenAttack;

      if (hadEnoughPause) {
         entity.targetOrigin.combatAttributes.pauseStartTime = 0;
      }
   }

   public static setTargetBodyAsHurt(targetBody: DynamicBody) {
      targetBody.setTint(0xff0000);

      GameScene.time.delayedCall(100, () => {
         targetBody.clearTint();
      });
   }
}
