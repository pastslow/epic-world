import { TargetType } from '../enums/target-type.enum';
import { CombatAttributes } from './combat-attributes.interface';
import { PhysicalAttributes } from './physical-attributes.interface';
import { Target } from './target.interface';

export interface Projectile {
    id: string;
    name: string;
    image: string;
    type: TargetType;
    combatAttributes: CombatAttributes;
    physicalAttributes: PhysicalAttributes;
    currentTarget: Target;
    sound: string;
    owner: Target;
    startingTime: number;
    lifeTime: number;
}
