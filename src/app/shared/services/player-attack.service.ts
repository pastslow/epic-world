import { Injectable } from '@angular/core';
import { GameCursors } from '../../features/models/game-cursors.model';

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

      if (entity.anims.currentFrame.index === entity.anims.currentAnim.frames.length - 1 && !GameCursors.keyboardControls.space.isDown) {
         entity['targetOrigin'].combatAttributes.isAttacking = false;
      }
   }
}
