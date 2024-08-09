import { Injectable } from '@angular/core';
import { DamageProvider } from '~/src/app/features/models/damage-provider.model';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { MapExtras } from '~/src/app/features/models/map-extras.model';
import { PushNotification, PushNotifications } from '~/src/app/features/models/push-notification.model';
import { TargetActions } from '~/src/app/features/state-models/target-actions.model';
import { TimeStamp } from '../../../features/state-models/time-stamp.model';
import { DamageType } from '../../enums/damage-type.enum';
import { DynamicBody } from '../../interfaces/dynamic-body.interface';

@Injectable({ providedIn: 'root' })
export class EnemyAttackService {
   public ammunitionGroup: Phaser.Physics.Arcade.Group;

   public animAttack(monster: DynamicBody, castedAbility): void {
      const monsterTargetOrigin = monster.targetOrigin;
      const currentMonsterTarget = monsterTargetOrigin.currentTargets[0].targetOrigin;

      monsterTargetOrigin.physicalAttributes.movementForbidden = true;

      if (monster.anims.currentAnim.key === monsterTargetOrigin.name + '_' + 'attack' && monster.anims.currentFrame.isLast) {
         monsterTargetOrigin.physicalAttributes.movementForbidden = false;
         monsterTargetOrigin.combatAttributes.pauseStartTime = TimeStamp.now;

         if (castedAbility && this.canCastAbility(castedAbility)) {
            this.fireWithAmmo(monster, castedAbility);
            return;
         }

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

         return;
      }

      monster.setVelocityX(0);
      monster.anims.play({ key: monsterTargetOrigin.name + '_' + 'attack' }, true);
   }

   public updateAmmoPosition() {
      this.ammunitionGroup.setVelocityX(-100);
   }

   public handleTargetOverlap(arrow: DynamicBody, overlappedEntity: DynamicBody) {
      const knockbackStrength = 200;
      const direction = new Phaser.Math.Vector2(arrow.x - overlappedEntity.x, arrow.y - overlappedEntity.y).normalize();

      overlappedEntity.setVelocity(-direction.x * knockbackStrength, direction.y * knockbackStrength);
      overlappedEntity.knocked = true;

      GameScene.time.delayedCall(100, () => {
         overlappedEntity.knocked = false;
      });

      DamageProvider.dealTargetDamage(arrow.targetOrigin.combatAttributes, overlappedEntity);

      arrow.destroy();
   }

   private canCastAbility(castedAbility) {
      return castedAbility.stack === -1 || castedAbility.stack > 0;
   }

   private fireWithAmmo(monster: DynamicBody, castedAbility) {
      const ammo = GameScene.physics.add.image(monster.x, monster.y + 10, 'simple_arrow') as DynamicBody;
      ammo.targetOrigin = {};
      ammo.setBounce(0.2);
      ammo.setCollideWorldBounds(true);
      ammo.setImmovable(true);
      ammo.setName('arrow');
      GameScene.physics.add.collider(ammo, MapExtras.tiles);
      ammo.targetOrigin.combatAttributes = { speed: monster.flipX ? 400 * 2 : -(400 * 2), ...castedAbility };
      this.ammunitionGroup.add(ammo);
   }
}
