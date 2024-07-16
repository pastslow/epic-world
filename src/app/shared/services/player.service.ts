import { Injectable } from '@angular/core';
import { AnimationFrame } from '../../features/models/animation-frame.model';
import { GameCursors } from '../../features/models/game-cursors.model';
import { GameScene } from '../../features/models/game-scene.model';
import { PlayerState } from '../../features/state-models/player-state.model';
import { ImageFrame } from '../interfaces/image-frames.interface';
import { Target } from '../interfaces/target.interface';
import { PlayerAttackService } from './player-attack.service';
import { PlayerMovementService } from './player-movement.service';

@Injectable({
   providedIn: 'root',
})
export class PlayerService {
   public entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

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
      this.playerMovementService.restrictPartialActionsInAreas(buildingsGroup, this.entity);

      if (this.entity['targetOrigin'].combatAttributes.isAttacking) {
         this.playerAttackService.animAttack(this.entity);
         return;
      }

      if (GameCursors.keyboardControls.space.isDown) {
         if (!this.entity['targetOrigin'].combatAttributes.isAttacking) {
            this.entity['targetOrigin'].combatAttributes.isAttacking = true;
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
