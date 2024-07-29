import { DynamicBody } from './dynamic-body.interface';

export interface TargetContainer extends Phaser.GameObjects.Rectangle {
   dynamicBody?: DynamicBody;
   body: Phaser.Physics.Arcade.Body | any;
}
