import { Injectable } from '@angular/core';
import { DamageProvider } from '~/src/app/features/models/damage-provider.model';
import { PushNotification, PushNotifications } from '~/src/app/features/models/push-notification.model';
import { TimeStamp } from '../../../features/state-models/time-stamp.model';
import { DamageType } from '../../enums/damage-type.enum';
import { Target } from '../../interfaces/target.interface';

@Injectable({ providedIn: 'root' })
export class EnemyAttackService {
   public animAttack(monster: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      const monsterTargetOrigin = monster['targetOrigin'];
      const currentMonsterTarget = monsterTargetOrigin.currentTarget.targetOrigin as Target;

      if (monster.anims.currentAnim.key === 'attack' && monster.anims.currentFrame.isLast) {
         const damageDealt = DamageProvider.getDamageDealtToTarget(monsterTargetOrigin.combatAttributes, currentMonsterTarget);
         console.log(damageDealt);

         if (damageDealt.type !== DamageType.BLOCK && typeof damageDealt.value === 'number') {
            currentMonsterTarget.combatAttributes.currentHealth -= damageDealt.value;
         }

         PushNotifications.addNotification({
            settings: { ...damageDealt, attachedTarget: monsterTargetOrigin.currentTarget },
         } as PushNotification);

         monsterTargetOrigin.combatAttributes.pauseStartTime = TimeStamp.now;
         return;
      }

      monster.setVelocityX(0);
      monster.anims.play({ key: 'attack' }, true);
   }
}
