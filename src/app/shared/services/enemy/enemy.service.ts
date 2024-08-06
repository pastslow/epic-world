import { Injectable } from '@angular/core';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { HealthBar } from '~/src/app/features/models/health-bar.model';
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
   public attackRangeContainer: Phaser.GameObjects.Group;
   public targetsContainer: Phaser.GameObjects.Group;
   public dynamicEntries: Phaser.Physics.Arcade.Group;

   constructor(private enemyMovementService: EnemyMovementService, private enemyAttackService: EnemyAttackService) {
      super();
   }

   public initializeTarget(platforms: Phaser.Physics.Arcade.StaticGroup): void {
      this.attackRangeContainer = GameScene.add.group();
      this.targetsContainer = GameScene.add.group();
      this.dynamicEntries = GameScene.physics.add.group();
      this.enemyAttackService.ammunitionGroup = GameScene.physics.add.group();

      EnemyState.enemies.forEach((target: Target) => {
         const targetContainer = this.getTargetContainer(target, platforms);

         this.targetsContainer.add(targetContainer);
         this.dynamicEntries.add(targetContainer.dynamicBody);
         this.attackRangeContainer.add(targetContainer.dynamicBody.attackRangeContainer);
      });
   }

   public listenToTargetActions(): void {
      this.targetsContainer.children.entries.forEach((targetContainer: TargetContainer) => {
         const dynamicBody = targetContainer.dynamicBody;
         const entityTargetOrigin: Target = dynamicBody.targetOrigin;
         const castedAbility = this.getCastedAbility(entityTargetOrigin);
         this.updateTargetContainerPosition(targetContainer, dynamicBody, castedAbility);
         const ammunitionEntries = this.enemyAttackService.ammunitionGroup.children.entries;
         const dynamicBodyX = dynamicBody.x;

         if (ammunitionEntries.length) {
            ammunitionEntries.forEach((entry) => {
               entry['setVelocityX'](entry['combatAttributes'].speed);
            });
         }

         if (entityTargetOrigin.healthBar) {
            HealthBar.updateHealthBar(dynamicBody, entityTargetOrigin.healthBar);
         }

         if (entityTargetOrigin.combatAttributes.currentHealth <= 0) {
            this.handleDeath(dynamicBody, targetContainer);
            return;
         }

         TargetActions.updateActionsPause(dynamicBody);

         if (!entityTargetOrigin.currentTargets.length) {
            if (entityTargetOrigin.combatAttributes.initialPositionX !== dynamicBodyX) {
               this.enemyMovementService.returnToItsInitialPosition(dynamicBody, entityTargetOrigin);
               return;
            }

            dynamicBody.setVelocityX(0);
            dynamicBody.anims.play(entityTargetOrigin.name + '_' + 'idle', true);
            return;
         }

         const currentTargetX = entityTargetOrigin.currentTargets[0].x;
         const currentTargetWentOutOfRange = Math.abs(dynamicBodyX - currentTargetX) > targetContainer.body.width;

         if (currentTargetWentOutOfRange) {
            entityTargetOrigin.currentTargets = [];
            return;
         }

         this.flipMonsterBasedOnTargetPosition(dynamicBody, dynamicBodyX, currentTargetX);

         if (this.isTargetInAttackEntityRange(dynamicBody, entityTargetOrigin)) {
            this.enemyMovementService.animEntityMovement(dynamicBody, entityTargetOrigin.currentTargets[0]);
            return;
         }

         this.handleTargetAttack(entityTargetOrigin, dynamicBody, castedAbility);
      });
   }

   public isTargetInAttackEntityRange(dynamicBody: DynamicBody, entityTargetOrigin: Target): boolean {
      return (
         !TargetActions.isTargetInAttackEntityRange(dynamicBody, entityTargetOrigin.currentTargets[0]) &&
         entityTargetOrigin.combatAttributes.pauseStartTime === 0 &&
         !entityTargetOrigin.physicalAttributes.movementForbidden
      );
   }

   public flipMonsterBasedOnTargetPosition(dynamicBody, dynamicBodyX, currentTargetX) {
      const playerComesFromRight = dynamicBodyX >= currentTargetX;
      const playerComesFromLeft = dynamicBodyX < currentTargetX;

      if (playerComesFromRight) {
         dynamicBody.flipX = false;
      }

      if (playerComesFromLeft) {
         dynamicBody.flipX = true;
      }
   }

   public handleTargetAttack(entityTargetOrigin, dynamicBody, castedAbility) {
      if (entityTargetOrigin.combatAttributes.pauseStartTime === 0) {
         this.enemyAttackService.animAttack(dynamicBody, castedAbility);
      } else {
         dynamicBody.setVelocityX(0);
         dynamicBody.anims.play(entityTargetOrigin.name + '_' + 'idle', true);
      }
   }

   public getCastedAbility(entityTargetOrigin: Target) {
      if (!entityTargetOrigin?.abilities?.length) {
         return;
      }
      const randomAbilityIndex = Math.round(Math.random() * (entityTargetOrigin.abilities.length - 1));

      const chance = Math.round(Math.random() * 100);

      if (entityTargetOrigin.abilities[randomAbilityIndex].chance >= chance) {
         return entityTargetOrigin.abilities[randomAbilityIndex];
      }
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
      dynamicBody.anims.play(dynamicBody.targetOrigin.name + '_death', true);

      if (dynamicBody.anims.currentAnim.key === dynamicBody.targetOrigin.name + '_death' && dynamicBody.anims.currentFrame.isLast) {
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
