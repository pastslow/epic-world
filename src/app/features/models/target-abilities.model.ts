import { Effects } from '../../shared/enums/effects.enum';
import { TargetType } from '../../shared/enums/target-type.enum';
import { TargetAbility } from '../../shared/interfaces/target-ability.interface';

export class TargetAbilities {
  public static abilities = {
    poison: {
      name: Effects.Poison,
      chance: 10,
      initialCharges: 1,
      charges: 1,
      cooldown: 8000,
      startingTime: 0,
      possibleTargets: [TargetType.PLAYER],
    },
    bleeding: {
      name: Effects.Bleeding,
      chance: 10,
      initialCharges: 1,
      charges: 1,
      cooldown: 12000,
      startingTime: 0,
      possibleTargets: [TargetType.PLAYER],
    },
    burning: {
      name: Effects.Burning,
      chance: 100,
      initialCharges: 1,
      charges: 1,
      cooldown: 10000,
      startingTime: 0,
      possibleTargets: [TargetType.PLAYER],
    },
    ProjectileArrow: {
      name: Effects.Arrow,
      chance: 100,
      initialCharges: 999,
      charges: 999,
      cooldown: 2000,
      startingTime: 0,
      possibleTargets: [TargetType.ENEMY],
    },
  };

  public static getAbility(abilityName: string): TargetAbility {
    return structuredClone(this.abilities[abilityName]) as TargetAbility;
  }
}
