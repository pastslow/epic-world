import { TargetType } from '../enums/target-type.enum';
import { CombatAttributes } from './combat-attributes.interface';
import { DynamicBody } from './dynamic-body.interface';
import { ImageFrame } from './image-frames.interface';
import { PhysicalAttributes } from './physical-attributes.interface';

export interface Target {
   id?: number;
   name?: string;
   type?: TargetType;
   image?: string;
   imageFrames?: ImageFrame[];
   currentMap?: string;
   combatAttributes?: CombatAttributes;
   physicalAttributes?: PhysicalAttributes;
   currentTargets?: DynamicBody[];
   pushNotifications?: any[];
   healthBar?: Phaser.GameObjects.Graphics;
}
