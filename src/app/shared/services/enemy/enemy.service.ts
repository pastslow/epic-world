import { Injectable } from '@angular/core';
import { AnimationFrame } from '~/src/app/features/models/animation-frame.model';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { HealthBar } from '~/src/app/features/models/health-bar.model';
import { EnemyState } from '~/src/app/features/state-models/enemy-state.model';
import { TargetActions } from '~/src/app/features/state-models/target-actions.model';
import { DynamicBody } from '../../interfaces/dynamic-body.interface';
import { ImageFrame } from '../../interfaces/image-frames.interface';
import { Target } from '../../interfaces/target.interface';

import { EnemyAttackService } from './enemy-attack.service';
import { EnemyMovementService } from './enemy-movement.service';

@Injectable({
   providedIn: 'root',
})
export class EnemyService {
   public enemiesGroup: Phaser.Physics.Arcade.Group;

   constructor(private enemyMovementService: EnemyMovementService, private enemyAttackService: EnemyAttackService) {}

   public initializeEnemies(platforms: Phaser.Physics.Arcade.StaticGroup): void {
      this.enemiesGroup = GameScene.physics.add.group();

      EnemyState.enemies.forEach((enemy: Target) => {
         const entity: DynamicBody = GameScene.physics.add.sprite(
            enemy.combatAttributes.initialPositionX,
            window.innerHeight - enemy.physicalAttributes.height,
            enemy.name
         );

         entity.setBodySize(enemy.combatAttributes.viewRange, 0, true);

         entity.name = enemy.name;
         entity.targetOrigin = enemy;
         entity.displayHeight = enemy.physicalAttributes.width;
         entity.displayWidth = enemy.physicalAttributes.height;

         entity.setBounce(0.2);
         entity.setCollideWorldBounds(true);

         this.generatePlayerAnimations(enemy, entity);

         entity.anims.play('idle', true);

         GameScene.physics.add.collider(entity, platforms);

         this.enemiesGroup.add(entity);
      });
   }

   public listerToMonstersActions(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      this.enemiesGroup.children.entries.forEach((entry: DynamicBody) => {
         const entityTargetOrigin: Target = entry.targetOrigin;
         if (entityTargetOrigin['healthBar']) {
            HealthBar.updateHealthBar(entry, entityTargetOrigin['healthBar']);
         }

         TargetActions.updateActionsPause(entry);

         if (!entityTargetOrigin.currentTarget) {
            if (entityTargetOrigin.combatAttributes.initialPositionX !== entry.x) {
               this.enemyMovementService.returnToItsInitialPosition(entry, entityTargetOrigin);
               return;
            }

            entry.setVelocityX(0);
            entry.anims.play('idle', true);
            return;
         }

         const currentTargetWentOutOfRange = Math.abs(entry.x - entityTargetOrigin.currentTarget.x) > entry.body.width;

         if (currentTargetWentOutOfRange) {
            entityTargetOrigin.currentTarget = null;
            return;
         }

         if (
            !TargetActions.isTargetInActionEntityRange(entry, player) &&
            entityTargetOrigin.combatAttributes.pauseStartTime === 0 &&
            !entityTargetOrigin.physicalAttributes.movementForbidden
         ) {
            this.enemyMovementService.animEntityMovement(entry, entityTargetOrigin.currentTarget);
            return;
         }

         if (entityTargetOrigin.combatAttributes.pauseStartTime === 0) {
            this.enemyAttackService.animAttack(entry);
         } else {
            entry.setVelocityX(0);
            entry.anims.play('idle', true);
         }
      });
   }

   public handleTargetOverlap(overlappedEntity: DynamicBody, entity: DynamicBody): void {
      entity.targetOrigin.currentTarget = overlappedEntity;

      if (!entity.targetOrigin['healthBar']) {
         const healthBar = GameScene.add.graphics();
         entity.targetOrigin['healthBar'] = healthBar;
      }
   }

   private generatePlayerAnimations(targetState: Target, entity: DynamicBody): void {
      targetState.imageFrames.forEach((frame: ImageFrame) => {
         AnimationFrame.create(entity, frame.name, targetState.name, frame.start, frame.end, frame.repeatable, frame.fps);
      });
   }
}
