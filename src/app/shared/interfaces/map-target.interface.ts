import { GroupTargetType } from '../enums/group-target-type.enum';
import { TargetType } from '../enums/target-type.enum';
import { CombatAttributes } from './combat-attributes.interface';
import { PhysicalAttributes } from './physical-attributes.interface';

export interface MapTarget {
    id?: number;
    name: string;
    level?: number;
    type?: TargetType;
    groupType?: GroupTargetType;
    physicalAttributes?: PhysicalAttributes;
    combatAttributes?: CombatAttributes;
    health?: number;
    positionX?: number;
    positionY?: number;
    stackOrder?: number;
    orientation?: number;
    respawnTime?: number;
}
