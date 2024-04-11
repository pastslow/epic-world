import { GroupTargetType } from "../enums/group-target-type.enum";
import { TargetType } from "../enums/target-type.enum";
import { CombatAttributes } from "./combat-attributes.interface";
import { GameEffect } from "./game-effect.interface";
import { ImageFrame } from "./image-frames.interface";
import { Income } from "./income.interface";
import { NotificationState } from "./notification-state.interface";
import { PhysicalAttributes } from "./physical-attributes.interface";
import { ResourceDrop } from "./resource-drop.interface";
import { TargetAbility } from "./target-ability.interface";
import { TargetAnimation } from "./target-animation.interface";

export interface Target {
  id?: number;
  name?: string;
  type?: TargetType;
  groupType?: GroupTargetType;
  currentMap?: string;
  image?: string;
  equippedItems?: any;
  combatAttributes?: CombatAttributes;
  physicalAttributes?: PhysicalAttributes;
  income?: Income;
  imageFrames?: ImageFrame[];
  inProgressAnimations?: TargetAnimation[];
  effects?: GameEffect[];
  aboveNotifications?: NotificationState[];
  boundCssClass?: string[];
  additionalResourcesDrop?: ResourceDrop[];
  abilities?: TargetAbility[];
  currentTarget?: Target;
  currentTargetLocked?: boolean;
  defaultSound?: string;
  respawnTime?: number;
}
