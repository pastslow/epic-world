import { DynamicBody } from '../../shared/interfaces/dynamic-body.interface';
import { ImageFrame } from '../../shared/interfaces/image-frames.interface';
import { TargetContainer } from '../../shared/interfaces/target-container.interface';
import { Target } from '../../shared/interfaces/target.interface';
import { AnimationFrame } from './animation-frame.model';
import { GameScene } from './game-scene.model';

export abstract class TargetContainerSetup {
   public updateTargetContainerPosition(targetContainer: TargetContainer, dynamicBody: DynamicBody, castedAbility?): void {
      const previousTargetContainerPositionX = dynamicBody.previousX;
      const previousTargetContainerPositionY = dynamicBody.previousY;

      if (previousTargetContainerPositionX === dynamicBody.x && previousTargetContainerPositionY === dynamicBody.y) {
         return;
      }

      targetContainer.setPosition(dynamicBody.x, dynamicBody.y);
      targetContainer.body.updateFromGameObject();

      dynamicBody.attackRangeContainer.setPosition(dynamicBody.x, dynamicBody.y);
      dynamicBody.attackRangeContainer.body.updateFromGameObject();

      this.updateAttackRangeContainer(dynamicBody, castedAbility);

      dynamicBody.previousX = dynamicBody.x;
      dynamicBody.previousY = dynamicBody.y;
   }

   public updateAttackRangeContainer(dynamicBody: DynamicBody, castedAbility?): void {
      let attackRangeWidth, attackRangeHeight;

      if (castedAbility) {
         attackRangeWidth = castedAbility.viewRangeX;
         attackRangeHeight = castedAbility.viewRangeY;
      } else {
         attackRangeWidth = dynamicBody.targetOrigin.combatAttributes.attackRange;
         attackRangeHeight = dynamicBody.targetOrigin.physicalAttributes.height;
      }

      if (dynamicBody.attackRangeContainer.width !== attackRangeWidth) {
         dynamicBody.attackRangeContainer.setDisplaySize(attackRangeWidth, attackRangeHeight);
         dynamicBody.attackRangeContainer.body.updateFromGameObject();
      }
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

   public getAttackRange(target: Target): TargetContainer {
      return GameScene.add.rectangle(
         target.combatAttributes.initialPositionX,
         window.innerHeight - target.physicalAttributes.height,
         target.combatAttributes.attackRange,
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
      const attackRangeContainer: TargetContainer = this.getAttackRange(targetOrigin);

      targetContainer.dynamicBody = entity;

      if (entity.targetOrigin.imageFrames.length) {
         this.generateTargetAnimations(targetOrigin, targetContainer.dynamicBody);
      }

      entity.targetContainer = targetContainer;
      entity.attackRangeContainer = attackRangeContainer;

      GameScene.physics.add.existing(entity);
      GameScene.physics.add.existing(targetContainer, true);
      GameScene.physics.add.existing(attackRangeContainer, true);
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
