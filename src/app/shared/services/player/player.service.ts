import { Injectable } from '@angular/core';
import { AnimationFrame } from '~/src/app/features/models/animation-frame.model';
import { GameCursors } from '~/src/app/features/models/game-cursors.model';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { PlayerState } from '~/src/app/features/state-models/player-state.model';
import { TimeStamp } from '~/src/app/features/state-models/time-stamp.model';
import { ImageFrame } from '../../interfaces/image-frames.interface';
import { Target } from '../../interfaces/target.interface';
import { PlayerAttackService } from './player-attack.service';
import { PlayerMovementService } from './player-movement.service';

@Injectable({
   providedIn: 'root',
})
export class PlayerService {
   public entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
   public playerNotifications: any[] = []; // Variable to hold the group of notifications

   constructor(private playerMovementService: PlayerMovementService, private playerAttackService: PlayerAttackService) {}

   public loadPlayer(): void {
      GameScene.load.spritesheet(PlayerState.player.name, PlayerState.player.image, { frameWidth: 48, frameHeight: 48 });
   }

   public initializePlayer(platforms: Phaser.Physics.Arcade.StaticGroup, buildingsGroup: Phaser.Physics.Arcade.Group, targetOrigin: Target): void {
      const realPlayerSize = 100 * Math.floor(window.innerHeight / 1000);
      this.entity = GameScene.physics.add.sprite(realPlayerSize, window.innerHeight - realPlayerSize, PlayerState.player.name);
      this.entity.displayHeight = realPlayerSize;
      this.entity.displayWidth = realPlayerSize;
      this.entity.name = PlayerState.player.name;
      this.entity['targetOrigin'] = targetOrigin;

      this.entity.setBounce(0.2);
      this.entity.setCollideWorldBounds(true);

      this.generatePlayerAnimations();

      // --- initialize default animation for player --- //
      this.entity.anims.play('idle', true);

      GameScene.physics.add.collider(this.entity, platforms);

      GameScene.physics.add.overlap(this.entity, buildingsGroup, this.playerHitBuilding, null, null);
   }

   public listenToPlayerActions(buildingsGroup: Phaser.Physics.Arcade.Group): void {
      const target: Target = this.entity['targetOrigin'];
      this.playerMovementService.restrictPartialActionsInAreas(buildingsGroup, this.entity);

      // if (target.pushNotifications.length) {
      //    const numberText = GameScene.add.text(this.entity.x - 10, this.entity.y - this.entity.displayHeight / 2, '5', {
      //       fontSize: '32px',
      //       color: '#ffffff',
      //    });
      //    numberText['settings'] = target.pushNotifications[0];
      //    numberText['settings'].size = 32;

      //    target.pushNotifications = [];
      //    this.playerNotifications.push(numberText);
      // }

      // if (this.playerNotifications.length) {
      //    this.playerNotifications.forEach((notification: Phaser.GameObjects.Text, index: number) => {
      //       if (notification['settings'].duration + notification['settings'].currentTime < TimeStamp.now) {
      //          notification.destroy();
      //          this.playerNotifications.splice(index, 1);
      //          return;
      //       }

      //       notification['settings'].size -= 1;
      //       notification.setX(this.entity.x - 10);
      //       notification.setY(notification.y - 1);
      //       notification.setFontSize(notification['settings'].size);
      //    });
      // }

      if (target.combatAttributes.isAttacking) {
         this.playerAttackService.animAttack(this.entity);
         return;
      }

      if (GameCursors.keyboardControls.space.isDown) {
         if (!target.combatAttributes.isAttacking) {
            target.combatAttributes.isAttacking = true;
            return;
         }
      }

      this.playerMovementService.animEntityMovement(this.entity);
      this.playerMovementService.animEntityJumping(this.entity);
   }

   private generatePlayerAnimations(): void {
      PlayerState.player.imageFrames.forEach((frame: ImageFrame) => {
         AnimationFrame.create(this.entity, frame.name, PlayerState.player.name, frame.start, frame.end, frame.repeatable, frame.fps);
      });
   }

   private playerHitBuilding(player, object) {
      // This function will be called when the player collides with the building
      // Add your collision handling logic here
      console.log('Player collided with the building!', object.name);
      // For example, you can add game over logic or perform some action when the collision occurs
   }
}
