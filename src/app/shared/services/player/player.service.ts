import { Injectable } from '@angular/core';
import { AnimationFrame } from '~/src/app/features/models/animation-frame.model';
import { GameCursors } from '~/src/app/features/models/game-cursors.model';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { PlayerState } from '~/src/app/features/state-models/player-state.model';
import { TargetActions } from '~/src/app/features/state-models/target-actions.model';
import { DynamicBody } from '../../interfaces/dynamic-body.interface';
import { ImageFrame } from '../../interfaces/image-frames.interface';
import { Target } from '../../interfaces/target.interface';
import { JoystickService } from '../joystick.service';
import { PlayerAttackService } from './player-attack.service';
import { PlayerMovementService } from './player-movement.service';

@Injectable({
   providedIn: 'root',
})
export class PlayerService {
   public entity: DynamicBody;
   public playerNotifications: any[] = []; // Variable to hold the group of notifications

   constructor(
      private playerMovementService: PlayerMovementService,
      private playerAttackService: PlayerAttackService,
      private readonly joystickService: JoystickService
   ) {}

   public loadPlayer(): void {
      GameScene.load.spritesheet(PlayerState.player.name, PlayerState.player.image, { frameWidth: 48, frameHeight: 48 });
   }

   public initializePlayer(platforms: Phaser.Physics.Arcade.StaticGroup): void {
      this.entity = GameScene.physics.add.sprite(100, window.innerHeight - 100, PlayerState.player.name);
      this.entity.displayHeight = 100;
      this.entity.displayWidth = 100;
      this.entity.name = PlayerState.player.name;
      this.entity.targetOrigin = PlayerState.player;

      this.entity.setBodySize(25, 0, true); //TODO maybe this coyld make the player more accurate

      this.entity.setBounce(0.2);
      this.entity.setCollideWorldBounds(true);
      this.generatePlayerAnimations();

      // --- initialize default animation for player --- //
      this.entity.anims.play('idle', true);

      GameScene.physics.add.collider(this.entity, platforms);
   }

   public listenToPlayerActions(): void {
      const target: Target = this.entity.targetOrigin;
      TargetActions.updateActionsPause(this.entity);

      if (GameCursors.keyboardControls.space.isDown && target.combatAttributes.pauseStartTime === 0) {
         this.entity.targetOrigin.combatAttributes.isAttacking = true;
      }

      if (this.entity.targetOrigin.combatAttributes.isAttacking) {
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
}
