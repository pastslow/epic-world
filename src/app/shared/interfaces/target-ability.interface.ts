import { Effects } from '../enums/effects.enum';
import { TargetType } from '../enums/target-type.enum';

export interface TargetAbility {
    name: Effects;
    chance: number;
    initialCharges: number;
    charges: number;
    cooldown: number;
    startingTime: number;
    possibleTargets: TargetType[];
}
