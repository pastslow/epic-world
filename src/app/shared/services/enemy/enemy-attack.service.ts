import { Injectable } from '@angular/core';
import { DamageProvider } from '~/src/app/features/models/damage-provider.model';
import { PushNotification, PushNotifications } from '~/src/app/features/models/push-notification.model';
import { TargetActions } from '~/src/app/features/state-models/target-actions.model';
import { TimeStamp } from '../../../features/state-models/time-stamp.model';
import { DamageType } from '../../enums/damage-type.enum';
import { Target } from '../../interfaces/target.interface';

@Injectable({ providedIn: 'root' })
export class EnemyAttackService {
   public animAttack(monster: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      const monsterTargetOrigin: Target = monster['targetOrigin'];
      const currentMonsterTarget = monsterTargetOrigin.currentTargets[0].targetOrigin as Target;

      monsterTargetOrigin.physicalAttributes.movementForbidden = true;

      if (monster.anims.currentAnim.key === monsterTargetOrigin.name + '_' + 'attack' && monster.anims.currentFrame.isLast) {
         monsterTargetOrigin.physicalAttributes.movementForbidden = false;

         const damageDealt = DamageProvider.getDamageDealtToTarget(monsterTargetOrigin.combatAttributes, currentMonsterTarget);

         if (damageDealt.type !== DamageType.BLOCK && typeof damageDealt.value === 'number') {
            currentMonsterTarget.combatAttributes.currentHealth -= damageDealt.value;
            TargetActions.setTargetBodyAsHurt(monsterTargetOrigin.currentTargets[0]);

            if (currentMonsterTarget.combatAttributes.currentHealth <= 0) {
               monsterTargetOrigin.currentTargets.splice(0, 1);
               return;
            }
         }

         PushNotifications.addNotification({
            settings: { ...damageDealt, attachedTarget: monsterTargetOrigin.currentTargets[0] },
         } as PushNotification);

         monsterTargetOrigin.combatAttributes.pauseStartTime = TimeStamp.now;
         return;
      }

      monster.setVelocityX(0);
      monster.anims.play({ key: monsterTargetOrigin.name + '_' + 'attack' }, true);
   }
}
