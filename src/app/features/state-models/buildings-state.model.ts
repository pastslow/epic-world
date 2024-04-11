import { TargetType } from "../../shared/enums/target-type.enum";
import { Target } from "../../shared/interfaces/target.interface";
import { TargetAbilities } from "../models/target-abilities.model";

export class BuildingsState {
  public static buildings: Target[] = [
    {
      id: 1,
      name: "Tower",
      image: "assets/Castle/Tower/0.png",
      type: TargetType.PLAYER_BASE,
      combatAttributes: {
        currentHealth: 500,
        health: 500,
        minAttack: 0,
        maxAttack: 0,
        blockChance: 0,
        critChance: 0,
        minMoneyDrop: 0,
        maxMoneyDrop: 0,
        minMiningAttack: 0,
        maxMiningAttack: 0,
        miningCritChance: 0,
      },
      physicalAttributes: {
        width: 230,
        height: 190,
        speed: 0,
        initialPositionY: 127,
        initialPosition: 80,
        range: 500,
        position: 1,
        initialOrientation: 1,
        backgroundX: 0,
        projectileStartX: 2457,
        projectileStartY: 145,
      },
      aboveNotifications: [],
      effects: [],
      abilities: [TargetAbilities.getAbility("ProjectileArrow")],
      boundCssClass: [],
      currentTarget: null,
    },
  ];
}
