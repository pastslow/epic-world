import { Injectable } from '@angular/core';
import { DamageProvider } from '~/src/app/features/models/damage-provider.model';
import { PushNotification, PushNotifications } from '~/src/app/features/models/push-notification.model';
import { TimeStamp } from '~/src/app/features/state-models/time-stamp.model';
import { GameCursors } from '../../../features/models/game-cursors.model';
import { DamageType } from '../../enums/damage-type.enum';
import { DynamicBody } from '../../interfaces/dynamic-body.interface';

@Injectable({ providedIn: 'root' })
export class PlayerAttackService {
   public animAttack(entity: DynamicBody): void {
      entity.anims.play('attack', true);
      entity.setVelocityX(0);

      if (GameCursors.keyboardControls.left.isDown) {
         entity.flipX = true;
      }

      if (GameCursors.keyboardControls.right.isDown) {
         entity.flipX = false;
      }

      if (entity.anims.currentFrame.isLast) {
         entity.targetOrigin.combatAttributes.pauseStartTime = TimeStamp.now;
         entity.targetOrigin.combatAttributes.isAttacking = false;

         if (entity.targetOrigin.currentTargets.length) {
            entity.targetOrigin.currentTargets.forEach((target: DynamicBody) => {
               const damageDealt = DamageProvider.getDamageDealtToTarget(entity.targetOrigin.combatAttributes, target.targetOrigin);

               if (damageDealt.type !== DamageType.BLOCK && typeof damageDealt.value === 'number') {
                  target.targetOrigin.combatAttributes.currentHealth -= damageDealt.value;
               }

               PushNotifications.addNotification({
                  settings: { ...damageDealt, attachedTarget: target },
               } as PushNotification);
            });
         }
      }
   }
}
