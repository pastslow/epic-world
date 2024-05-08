import { Injectable } from '@angular/core';
import { AnimationFrame } from '../../features/models/animation-frame.model';
import { GameScene } from '../../features/models/game-scene.model';
import { EnemyState } from '../../features/state-models/enemy-state.model';
import { TargetActions } from '../../features/state-models/target-actions.model';
import { TimeStamp } from '../../features/state-models/time-stamp.model';
import { ImageFrame } from '../interfaces/image-frames.interface';
import { Target } from '../interfaces/target.interface';

@Injectable({
   providedIn: 'root',
})
export class EnemyService {
   public enemiesGroup: Phaser.Physics.Arcade.Group;

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

   private generatePlayerAnimations(targetState: Target, entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      targetState.imageFrames.forEach((frame: ImageFrame) => {
         AnimationFrame.create(entity, frame.name, targetState.name, frame.start, frame.end, frame.repeatable, frame.fps);
      });
   }

   public animEntityMovement(entity, collidedEntity) {
      const playerComesFromRight = TargetActions.isTargetAheadEntity(collidedEntity.x, entity.x, entity.displayWidth, collidedEntity.displayWidth, 50);
      const playerComesFromLeft = TargetActions.isTargetBehindEntity(collidedEntity.x, entity.x, collidedEntity.displayHeight, 50);

      if (playerComesFromRight) {
         entity.anims.play('walk', true);
         entity.flipX = true;
         entity.setVelocityX(150);
         return;
      }

      if (playerComesFromLeft) {
         entity.anims.play('walk', true);
         entity.flipX = false;
         entity.setVelocityX(-150);
         return;
      }
   }

   public listerToMonstersActions(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      this.setCurrentTarget([player]);

      this.enemiesGroup.children.entries.forEach((entry: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
         const entityTargetOrigin: Target = entry['targetOrigin'];

         if (!entityTargetOrigin.currentTarget) {
            if (entityTargetOrigin.combatAttributes.initialPositionX !== entry.x) {
               this.returnToItsInitialPosition(entry, entityTargetOrigin);
               return;
            }

            entry.setVelocityX(0);
            entry.anims.play('idle', true);
            return;
         }

         TargetActions.updateActionsPause(entry);

         if (
            TargetActions.isTargetInActionEntityRange(
               entityTargetOrigin.currentTarget.x,
               entityTargetOrigin.currentTarget.displayWidth,
               entry.x,
               entry.displayWidth
            )
         ) {
            this.animEntityMovement(entry, entityTargetOrigin.currentTarget);
            return;
         }

         if (entityTargetOrigin.combatAttributes.pauseStartTime === 0) {
            this.animAttack(entry);
         } else {
            entry.setVelocityX(0);
            entry.anims.play('idle', true);
         }
      });
   }

   private setCurrentTarget(entries: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]): void {
      this.enemiesGroup.children.entries.forEach((children: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
         const entityTargetOrigin = children['targetOrigin'];

         if (entityTargetOrigin.combatAttributes.currentHealth <= 0) {
            return;
         }

         const entry = entries.find((entry: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
            return Math.abs(entry.x - children.x) <= entityTargetOrigin.combatAttributes.viewRange;
         });

         if (entry) {
            entityTargetOrigin.currentTarget = entry;
            return;
         }

         entityTargetOrigin.currentTarget = null;
      });
   }

   public animMonstersWithoutCurrentTarget(): void {
      this.enemiesGroup.children.entries.forEach((entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) => {
         const entityTargetOrigin: Target = entity['targetOrigin'];

         if (!entityTargetOrigin.currentTarget) {
            if (entityTargetOrigin.combatAttributes.initialPositionX !== entity.x) {
               this.returnToItsInitialPosition(entity, entityTargetOrigin);
               return;
            }

            entity.setVelocityX(0);
            entity.anims.play('idle', true);
         }
      });
   }

   public animAttack(monster: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      if (monster.anims.currentAnim.key === 'attack' && monster.anims.currentFrame.isLast) {
         monster['targetOrigin'].combatAttributes.pauseStartTime = TimeStamp.now;
         return;
      }

      monster.setVelocityX(0);
      monster.anims.play({ key: 'attack' }, true);
   }

   private returnToItsInitialPosition(entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, entityTargetOrigin: Target) {
      if (Math.abs(entity.x - entityTargetOrigin.combatAttributes.initialPositionX) <= 100) {
         entityTargetOrigin.combatAttributes.initialPositionX = entity.x;
         entity.setVelocityX(0);
         return;
      }

      entity.anims.play('walk', true);

      if (entity.x > entityTargetOrigin.combatAttributes.initialPositionX) {
         entity.flipX = false;
         entity.setVelocityX(-150);
      } else {
         entity.flipX = true;
         entity.setVelocityX(150);
      }
   }
}
