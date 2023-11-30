import { TargetType } from '../enums/target-type.enum';
import { TargetAbilities } from '../models/target-abilities.model';
import { CombatAttributes } from './combat-attributes.interface';
import { Coordinates } from './coordinates.interface';
import { ImageFrame } from './image-frames.interface';
import { PhysicalAttributes } from './physical-attributes.interface';

export interface TargetEntry {
    id?: number;
    name: string;
    type?: TargetType;
    coordinates?: Coordinates;
    health?: number;
    position?: number;
    level?: number;
    orientation?: number;
    imageFrames?: ImageFrame;
    combatAttributes?: CombatAttributes;
    physicalAttributes?: PhysicalAttributes;
    boundCssClass?: string[];
    abilities?: TargetAbilities[];
}
