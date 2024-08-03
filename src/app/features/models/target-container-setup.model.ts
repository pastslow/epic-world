import { DynamicBody } from '../../shared/interfaces/dynamic-body.interface';
import { ImageFrame } from '../../shared/interfaces/image-frames.interface';
import { TargetContainer } from '../../shared/interfaces/target-container.interface';
import { Target } from '../../shared/interfaces/target.interface';
import { AnimationFrame } from './animation-frame.model';
import { GameScene } from './game-scene.model';

export abstract class TargetContainerSetup {
   public updateTargetContainerPosition(targetContainer: TargetContainer, dynamicBody: DynamicBody): void {
      targetContainer.setPosition(dynamicBody.x, dynamicBody.y);
      targetContainer.body.updateFromGameObject();
   }

   public getViewRange(target: Target): TargetContainer {
      return GameScene.add.rectangle(
         target.combatAttributes.initialPositionX,
         window.innerHeight - target.physicalAttributes.height,
         target.combatAttributes.viewRange,
         target.physicalAttributes.height,
         0x00ff00,
         0
      );
   }

   public getTargetContainer(targetOrigin: Target, platforms: Phaser.Physics.Arcade.StaticGroup): TargetContainer {
      const entity: DynamicBody = GameScene.physics.add.sprite(
         targetOrigin.combatAttributes.initialPositionX,
         window.innerHeight - targetOrigin.physicalAttributes.height,
         targetOrigin.name
      );

      entity.displayHeight = targetOrigin.physicalAttributes.height;
      entity.displayWidth = targetOrigin.physicalAttributes.width;
      entity.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);

      entity.name = targetOrigin.name;
      entity.targetOrigin = targetOrigin;

      const targetContainer: TargetContainer = this.getViewRange(targetOrigin);

      targetContainer.dynamicBody = entity;

      if (entity.targetOrigin.imageFrames.length) {
         this.generateTargetAnimations(targetOrigin, targetContainer.dynamicBody);
      }

      // targetContainer.dynamicBody.play('idle', true);
      entity.targetContainer = targetContainer;

      GameScene.physics.add.existing(entity);
      GameScene.physics.add.existing(targetContainer, true);
      GameScene.physics.add.collider(entity, platforms);
      entity.setBounce(0.2);
      entity.setCollideWorldBounds(true);

      return targetContainer;
   }

   private generateTargetAnimations(targetState: Target, entity: DynamicBody): void {
      targetState.imageFrames.forEach((frame: ImageFrame) => {
         AnimationFrame.create(entity, frame.name, targetState.name, frame.start, frame.end, frame.repeatable, frame.fps);
      });
   }
}
