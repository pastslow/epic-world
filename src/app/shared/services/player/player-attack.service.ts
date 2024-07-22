import { Injectable } from '@angular/core';
import { TimeStamp } from '~/src/app/features/state-models/time-stamp.model';
import { GameCursors } from '../../../features/models/game-cursors.model';

@Injectable({ providedIn: 'root' })
export class PlayerAttackService {
   public animAttack(entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      entity.anims.play('attack', true);
      entity.setVelocityX(0);

      if (GameCursors.keyboardControls.left.isDown) {
         entity.flipX = true;
      }

      if (GameCursors.keyboardControls.right.isDown) {
         entity.flipX = false;
      }

      if (entity.anims.currentFrame.isLast) {
         entity['targetOrigin'].combatAttributes.pauseStartTime = TimeStamp.now;
         entity['targetOrigin'].combatAttributes.isAttacking = false;
      }
   }
}
