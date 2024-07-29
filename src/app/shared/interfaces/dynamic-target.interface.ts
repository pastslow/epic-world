import { DynamicBody } from './dynamic-body.interface';
import { TargetContainer } from './target-container.interface';

export interface DynamicTarget {
   targetsContainer: Phaser.GameObjects.Group;

   initializeTarget(platforms: Phaser.Physics.Arcade.StaticGroup): void;
   listenToTargetActions(): void;
   updateTargetContainerPosition(targetContainer: TargetContainer, dynamicBody: DynamicBody): void;
}
