import { Injectable } from '@angular/core';
import { DynamicBody } from '../../interfaces/dynamic-body.interface';
import { Target } from '../../interfaces/target.interface';

@Injectable({ providedIn: 'root' })
export class EnemyMovementService {
   public animEntityMovement(entity: DynamicBody, collidedEntity: DynamicBody): void {
      const playerComesFromRight = collidedEntity.x >= entity.x;
      const playerComesFromLeft = collidedEntity.x < entity.x;

      if (playerComesFromRight) {
         entity.anims.play(entity.targetOrigin.name + '_' + 'walk', true);
         entity.flipX = true;
         entity.setVelocityX(150);
         return;
      }

      if (playerComesFromLeft) {
         entity.anims.play(entity.targetOrigin.name + '_' + 'walk', true);
         entity.flipX = false;
         entity.setVelocityX(-150);
      }
   }

   public returnToItsInitialPosition(entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, entityTargetOrigin: Target): void {
      if (Math.abs(entity.x - entityTargetOrigin.combatAttributes.initialPositionX) <= 100) {
         entityTargetOrigin.combatAttributes.initialPositionX = entity.x;
         entity.setVelocityX(0);
         return;
      }

      entity.anims.play(entityTargetOrigin.name + '_' + 'walk', true);

      if (entity.x > entityTargetOrigin.combatAttributes.initialPositionX) {
         entity.flipX = false;
         entity.setVelocityX(-150);
      } else {
         entity.flipX = true;
         entity.setVelocityX(150);
      }
   }
}
