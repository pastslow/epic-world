import { TargetType } from '../enums/target-type.enum';
import { CombatAttributes } from './combat-attributes.interface';
import { ImageFrame } from './image-frames.interface';
import { PhysicalAttributes } from './physical-attributes.interface';

export interface Target {
   id?: number;
   name?: string;
   type?: TargetType;
   image?: string;
   currentMap?: string;
   combatAttributes?: CombatAttributes;
   physicalAttributes?: PhysicalAttributes;
   imageFrames?: ImageFrame[];
   currentTarget?: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
}
