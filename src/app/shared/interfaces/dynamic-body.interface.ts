import { TargetContainer } from './target-container.interface';
import { Target } from './target.interface';

export interface DynamicBody extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
   targetOrigin?: Target;
   targetContainer?: TargetContainer;
   attackRangeContainer?: Phaser.Physics.Arcade.Body | any;
   previousX?: number;
   previousY?: number;
   knocked?: boolean;
}
