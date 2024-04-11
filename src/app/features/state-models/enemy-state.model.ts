import { Injectable } from "@angular/core";
import { TargetType } from "../../shared/enums/target-type.enum";
import { Target } from "../../shared/interfaces/target.interface";

@Injectable()
export class EnemyState {
  public static enemies: Target[] = [
    {
      id: 1,
      name: "Hyena",
      image: "assets/Characters/Hyena_0.png",
      type: TargetType.ENEMY,
      currentMap: "swamp",
      equippedItems: {},
      combatAttributes: {
        level: 1,
        currentHealth: 50,
        health: 50,
        currentExperience: 0,
        experience: 100,
        minAttack: 5,
        maxAttack: 10,
        blockChance: 2,
        critChance: 100,
        minMiningAttack: 15,
        maxMiningAttack: 25,
        miningCritChance: 0,
      },
      physicalAttributes: {
        width: 70,
        height: 70,
        speed: 10,
      },
      income: {
        gold: 0,
        diamonds: 0,
      },
      imageFrames: [
        {
          name: "idle",
          start: 0,
          end: 3,
          repeatable: true,
          fps: 10,
        },
        {
          name: "walking",
          start: 4,
          end: 9,
          repeatable: true,
          fps: 10,
        },
        {
          name: "running",
          start: 4,
          end: 9,
          repeatable: true,
          fps: 12,
        },
        {
          name: "attack",
          start: 16,
          end: 21,
          repeatable: true,
          fps: 10,
        },
      ],
      effects: [],
      aboveNotifications: [],
      boundCssClass: [],
    },
  ];
}
