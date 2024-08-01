import { Injectable } from '@angular/core';
import { GameCursors } from '~/src/app/features/models/game-cursors.model';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { TargetContainerSetup } from '~/src/app/features/models/target-container-setup.model';
import { PlayerState } from '~/src/app/features/state-models/player-state.model';
import { TargetActions } from '~/src/app/features/state-models/target-actions.model';
import { DynamicBody } from '../../interfaces/dynamic-body.interface';
import { DynamicTarget } from '../../interfaces/dynamic-target.interface';
import { TargetContainer } from '../../interfaces/target-container.interface';
import { Target } from '../../interfaces/target.interface';
import { JoystickService } from '../joystick.service';
import { PlayerAttackService } from './player-attack.service';
import { PlayerMovementService } from './player-movement.service';

@Injectable({
   providedIn: 'root',
})
export class PlayerService extends TargetContainerSetup implements DynamicTarget {
   public targetsContainer: Phaser.GameObjects.Group;
   public dynamicEntries: Phaser.Physics.Arcade.Group;

   public entity: DynamicBody;

   constructor(
      private playerMovementService: PlayerMovementService,
      private playerAttackService: PlayerAttackService,
      private joystickService: JoystickService
   ) {
      super();
   }

   public initializeTarget(platforms: Phaser.Physics.Arcade.StaticGroup): void {
      this.targetsContainer = GameScene.add.group();
      this.dynamicEntries = GameScene.physics.add.group();

      const targetContainer = this.getTargetContainer(PlayerState.player, platforms);
      targetContainer.dynamicBody.body.setSize(PlayerState.player.physicalAttributes.width / 4, 0, true);

      this.targetsContainer.add(targetContainer);
      this.dynamicEntries.add(targetContainer.dynamicBody);
      this.entity = targetContainer.dynamicBody;
   }

   public listenToTargetActions(): void {
      const target: Target = this.entity.targetOrigin;
      TargetActions.updateActionsPause(this.entity);
      this.updateTargetContainerPosition(this.entity.targetContainer, this.entity);

      if (target.combatAttributes.currentHealth <= 0) {
         this.handleDeath(this.entity, this.entity.targetContainer);
         return;
      }

      if (GameCursors.keyboardControls.space.isDown && target.combatAttributes.pauseStartTime === 0) {
         this.entity.targetOrigin.combatAttributes.isAttacking = true;
      }

      this.removeOutRangeTargets(target);

      if (this.entity.targetOrigin.combatAttributes.isAttacking) {
         this.playerAttackService.animAttack(this.entity);
         return;
      }

      const joystick = this.joystickService.getJoystickSimulatedKey();

      this.playerMovementService.animEntityMovement(this.entity, joystick);
      this.playerMovementService.animEntityJumping(this.entity, joystick);
   }

   public handleTargetOverlap(targetContainer: TargetContainer, overlappedEntity: DynamicBody): void {
      const currentTargets = targetContainer.dynamicBody.targetOrigin.currentTargets;
      const isTargetAlreadyAdded = currentTargets.some((target: DynamicBody) => target.targetOrigin.id === overlappedEntity.targetOrigin.id);

      if (!isTargetAlreadyAdded) {
         targetContainer.dynamicBody.targetOrigin.currentTargets.push(overlappedEntity);
      }
   }

   private removeOutRangeTargets(target: Target): void {
      if (!target.currentTargets.length) {
         return;
      }

      target.currentTargets.forEach((dynamicTarget: DynamicBody) => {
         const currentTargetWentOutOfRange = Math.abs(this.entity.x - dynamicTarget.x) > this.entity.targetContainer.body.width;
         const currentTargetIndex = target.currentTargets.indexOf(dynamicTarget);

         if (currentTargetWentOutOfRange) {
            target.currentTargets.splice(currentTargetIndex, 1);
         }
      });
   }

   private handleDeath(dynamicBody: DynamicBody, targetContainer: TargetContainer): void {
      dynamicBody.setVelocityX(0);
      dynamicBody.anims.play('death', true);

      if (dynamicBody.anims.currentAnim.key === 'death' && dynamicBody.anims.currentFrame.isLast) {
         dynamicBody.setX(dynamicBody.targetOrigin.combatAttributes.initialPositionX);
         // this.targetsContainer.remove(targetContainer, true, true);
         // targetContainer.dynamicBody.targetOrigin.healthBar.destroy(true);
         // this.dynamicEntries.remove(targetContainer.dynamicBody, true, true);
      }
   }
}
