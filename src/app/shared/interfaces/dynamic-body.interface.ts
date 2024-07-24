import { Target } from './target.interface';

export interface DynamicBody extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
   targetOrigin?: Target;
}
