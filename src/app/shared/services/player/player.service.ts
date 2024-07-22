import { Injectable } from '@angular/core';
import { AnimationFrame } from '~/src/app/features/models/animation-frame.model';
import { GameCursors } from '~/src/app/features/models/game-cursors.model';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { PlayerState } from '~/src/app/features/state-models/player-state.model';
import { TargetActions } from '~/src/app/features/state-models/target-actions.model';
import { ImageFrame } from '../../interfaces/image-frames.interface';
import { Target } from '../../interfaces/target.interface';
import { JoystickService } from '../joystick.service';
import { PlayerAttackService } from './player-attack.service';
import { PlayerMovementService } from './player-movement.service';

@Injectable({
   providedIn: 'root',
})
export class PlayerService {
   public entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
   public playerNotifications: any[] = []; // Variable to hold the group of notifications

   constructor(
      private playerMovementService: PlayerMovementService,
      private playerAttackService: PlayerAttackService,
      private readonly joystickService: JoystickService
   ) {}

   public loadPlayer(): void {
      GameScene.load.spritesheet(PlayerState.player.name, PlayerState.player.image, { frameWidth: 48, frameHeight: 48 });
   }

   public initializePlayer(platforms: Phaser.Physics.Arcade.StaticGroup, buildingsGroup: Phaser.Physics.Arcade.Group, targetOrigin: Target): void {
      this.entity = GameScene.physics.add.sprite(100, window.innerHeight - 100, PlayerState.player.name);
      this.entity.displayHeight = 100;
      this.entity.displayWidth = 100;
      this.entity.name = PlayerState.player.name;
      this.entity['targetOrigin'] = PlayerState.player;

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
      TargetActions.updateActionsPause(this.entity);

      if (GameCursors.keyboardControls.space.isDown && target.combatAttributes.pauseStartTime === 0) {
         this.entity['targetOrigin'].combatAttributes.isAttacking = true;
      }

      if (this.entity['targetOrigin'].combatAttributes.isAttacking) {
         this.playerAttackService.animAttack(this.entity);
         return;
      }

      const joystick = this.joystickService.getJoystickSimulatedKey();

      this.playerMovementService.animEntityMovement(this.entity, joystick);
      this.playerMovementService.animEntityJumping(this.entity, joystick);
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
