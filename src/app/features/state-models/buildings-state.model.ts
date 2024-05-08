import { TargetType } from "../../shared/enums/target-type.enum";
import { Target } from "../../shared/interfaces/target.interface";

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
      },
    },
  ];
}
