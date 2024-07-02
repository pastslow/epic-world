import { Injectable } from '@angular/core';
import { TimeStamp } from '../../features/state-models/time-stamp.model';

@Injectable({ providedIn: 'root' })
export class EnemyAttackService {
   public animAttack(monster: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      if (monster.anims.currentAnim.key === 'attack' && monster.anims.currentFrame.isLast) {
         monster['targetOrigin'].combatAttributes.pauseStartTime = TimeStamp.now;
         return;
      }

      monster.setVelocityX(0);
      monster.anims.play({ key: 'attack' }, true);
   }
}
