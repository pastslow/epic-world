import { Injectable } from '@angular/core';
import { DamageProvider } from '~/src/app/features/models/damage-provider.model';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { PushNotification, PushNotifications } from '~/src/app/features/models/push-notification.model';
import { TargetActions } from '~/src/app/features/state-models/target-actions.model';
import { GameCursors } from '../../../features/models/game-cursors.model';
import { DamageType } from '../../enums/damage-type.enum';
import { DynamicBody } from '../../interfaces/dynamic-body.interface';

@Injectable({ providedIn: 'root' })
export class PlayerAttackService {
   public animAttack(entity: DynamicBody, joystick): void {
      if (!joystick?.up && !GameCursors.keyboardControls.up.isDown) {
         entity.anims.play(entity.targetOrigin.name + '_' + 'attack_top', true);
         entity.setVelocityX(0);
      } else {
         entity.anims.play(entity.targetOrigin.name + '_' + 'jump_attack', true);
      }

      if (GameCursors.keyboardControls.left.isDown) {
         entity.flipX = true;
      }

      if (GameCursors.keyboardControls.right.isDown) {
         entity.flipX = false;
      }

      if (entity.anims.currentFrame.isLast) {
         entity.targetOrigin.combatAttributes.pauseStartTime = GameScene.time.now;
         entity.targetOrigin.combatAttributes.isAttacking = false;

         if (entity.targetOrigin.currentTargets.length) {
            entity.targetOrigin.currentTargets.forEach((target: DynamicBody, index: number) => {
               if (target.targetOrigin.combatAttributes.currentHealth <= 0) {
                  entity.targetOrigin.currentTargets.splice(index, 1);
                  return;
               }

               const damageDealt = DamageProvider.getDamageDealtToTarget(entity.targetOrigin.combatAttributes, target.targetOrigin);

               if (damageDealt.type !== DamageType.BLOCK && typeof damageDealt.value === 'number') {
                  target.targetOrigin.combatAttributes.currentHealth -= damageDealt.value;

                  TargetActions.setTargetBodyAsHurt(target);

                  if (target.targetOrigin.combatAttributes.currentHealth <= 0) {
                     entity.targetOrigin.currentTargets.splice(index, 1);
                  }
               }

               PushNotifications.addNotification({
                  settings: { ...damageDealt, attachedTarget: target },
               } as PushNotification);
            });
         }
      }
   }
}
