import { Injectable } from '@angular/core';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { HealthBar } from '~/src/app/features/models/health-bar.model';
import { Particles } from '~/src/app/features/models/particles.model';
import { TargetContainerSetup } from '~/src/app/features/models/target-container-setup.model';
import { EnemyState } from '~/src/app/features/state-models/enemy-state.model';
import { TargetActions } from '~/src/app/features/state-models/target-actions.model';
import { DynamicBody } from '../../interfaces/dynamic-body.interface';
import { DynamicTarget } from '../../interfaces/dynamic-target.interface';
import { TargetContainer } from '../../interfaces/target-container.interface';
import { Target } from '../../interfaces/target.interface';

import { EnemyAttackService } from './enemy-attack.service';
import { EnemyMovementService } from './enemy-movement.service';

@Injectable({
   providedIn: 'root',
})
export class EnemyService extends TargetContainerSetup implements DynamicTarget {
   public targetsContainer: Phaser.GameObjects.Group;
   public dynamicEntries: Phaser.Physics.Arcade.Group;

   constructor(private enemyMovementService: EnemyMovementService, private enemyAttackService: EnemyAttackService) {
      super();
   }

   public initializeTarget(platforms: Phaser.Physics.Arcade.StaticGroup): void {
      this.targetsContainer = GameScene.add.group();
      this.dynamicEntries = GameScene.physics.add.group();

      EnemyState.enemies.forEach((target: Target) => {
         const targetContainer = this.getTargetContainer(target, platforms);

         this.targetsContainer.add(targetContainer);
         this.dynamicEntries.add(targetContainer.dynamicBody);
      });
   }

   public listenToTargetActions(): void {
      this.targetsContainer.children.entries.forEach((targetContainer: TargetContainer) => {
         const dynamicBody = targetContainer.dynamicBody;
         const entityTargetOrigin: Target = dynamicBody.targetOrigin;
         this.updateTargetContainerPosition(targetContainer, dynamicBody);

         if (entityTargetOrigin.healthBar) {
            HealthBar.updateHealthBar(dynamicBody, entityTargetOrigin.healthBar);
         }

         if (entityTargetOrigin.combatAttributes.currentHealth <= 0) {
            this.handleDeath(dynamicBody, targetContainer);
            return;
         }

         TargetActions.updateActionsPause(dynamicBody);

         if (!entityTargetOrigin.currentTargets.length) {
            if (entityTargetOrigin.combatAttributes.initialPositionX !== dynamicBody.x) {
               this.enemyMovementService.returnToItsInitialPosition(dynamicBody, entityTargetOrigin);
               return;
            }

            dynamicBody.setVelocityX(0);
            dynamicBody.anims.play('idle', true);
            return;
         }

         const currentTargetWentOutOfRange = Math.abs(dynamicBody.x - entityTargetOrigin.currentTargets[0].x) > targetContainer.body.width;

         if (currentTargetWentOutOfRange) {
            entityTargetOrigin.currentTargets = [];
            return;
         }

         if (
            !TargetActions.isTargetInActionEntityRange(dynamicBody, entityTargetOrigin.currentTargets[0]) &&
            entityTargetOrigin.combatAttributes.pauseStartTime === 0 &&
            !entityTargetOrigin.physicalAttributes.movementForbidden
         ) {
            this.enemyMovementService.animEntityMovement(dynamicBody, entityTargetOrigin.currentTargets[0]);
            return;
         }

         if (entityTargetOrigin.combatAttributes.pauseStartTime === 0) {
            this.enemyAttackService.animAttack(dynamicBody);
         } else {
            dynamicBody.setVelocityX(0);
            dynamicBody.anims.play('idle', true);
         }
      });
   }

   public handleTargetOverlap(targetContainer: TargetContainer, overlappedEntity: DynamicBody): void {
      if (overlappedEntity.targetOrigin.combatAttributes.currentHealth <= 0) {
         targetContainer.dynamicBody.targetOrigin.currentTargets = [];
         return;
      }

      targetContainer.dynamicBody.targetOrigin.currentTargets = [overlappedEntity];

      if (!targetContainer.dynamicBody.targetOrigin.healthBar) {
         const healthBar = GameScene.add.graphics();
         targetContainer.dynamicBody.targetOrigin.healthBar = healthBar;
      }
   }

   private handleDeath(dynamicBody: DynamicBody, targetContainer: TargetContainer): void {
      dynamicBody.setVelocityX(0);
      dynamicBody.anims.play('death', true);

      if (dynamicBody.anims.currentAnim.key === 'death' && dynamicBody.anims.currentFrame.isLast) {
         this.targetsContainer.remove(targetContainer, true, true);
         targetContainer.dynamicBody.targetOrigin.healthBar.destroy(true);
         this.dynamicEntries.remove(targetContainer.dynamicBody, true, true);
      }
   }

   public handleTargetInheritance(targetContainer: TargetContainer, overlappedTargetContainer: TargetContainer): void {
      const hasTargets = targetContainer.dynamicBody.targetOrigin.currentTargets.length;
      const hasOverlappedEntityTargets = overlappedTargetContainer.dynamicBody.targetOrigin.currentTargets.length;

      if (hasTargets && hasOverlappedEntityTargets) {
         return;
      }

      if (hasTargets && !hasOverlappedEntityTargets) {
         GameScene.time.delayedCall(400, () => {
            overlappedTargetContainer.dynamicBody.targetOrigin.combatAttributes.initialPositionX = targetContainer.x;
         });
      }
   }
}
