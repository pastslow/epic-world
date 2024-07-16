import { Injectable } from '@angular/core';
import { AnimationFrame } from '~/src/app/features/models/animation-frame.model';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { EnemyState } from '~/src/app/features/state-models/enemy-state.model';
import { TargetActions } from '~/src/app/features/state-models/target-actions.model';
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
         const entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = GameScene.physics.add.sprite(
            enemy.combatAttributes.initialPositionX,
            window.innerHeight - enemy.physicalAttributes.height,
            enemy.name
         );

         entity.name = enemy.name;
         entity['targetOrigin'] = enemy;
         entity.displayHeight = enemy.physicalAttributes.width;
         entity.displayWidth = enemy.physicalAttributes.height;

         entity.setBounce(0.2);
         entity.setCollideWorldBounds(true);
         entity.setImmovable(true);

         this.generatePlayerAnimations(enemy, entity);

         entity.anims.play('idle', true);

         GameScene.physics.add.collider(entity, platforms);

         this.enemiesGroup.add(entity);
      });
   }

   public listerToMonstersActions(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      this.enemiesGroup.children.entries.forEach((entry: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
         this.setCurrentTarget(entry, [player]);

         const entityTargetOrigin: Target = entry['targetOrigin'];
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

         if (
            TargetActions.isTargetInActionEntityRange(
               entityTargetOrigin.currentTarget.x,
               entityTargetOrigin.currentTarget.displayWidth,
               entry.x,
               entry.displayWidth
            )
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

   private generatePlayerAnimations(targetState: Target, entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      targetState.imageFrames.forEach((frame: ImageFrame) => {
         AnimationFrame.create(entity, frame.name, targetState.name, frame.start, frame.end, frame.repeatable, frame.fps);
      });
   }

   private setCurrentTarget(entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, entries: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]): void {
      const entityTargetOrigin = entity['targetOrigin'];

      if (entityTargetOrigin.combatAttributes.currentHealth <= 0) {
         return;
      }

      const entry = entries.find((entry: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
         return Math.abs(entry.x - entity.x) <= entityTargetOrigin.combatAttributes.viewRange;
      });

      if (entry) {
         entityTargetOrigin.currentTarget = entry;
         return;
      }

      entityTargetOrigin.currentTarget = null;
   }
}
