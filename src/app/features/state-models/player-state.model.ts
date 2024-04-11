import { Injectable } from "@angular/core";
import { TargetType } from "../../shared/enums/target-type.enum";
import { Target } from "../../shared/interfaces/target.interface";

@Injectable()
export class PlayerState {
  public static player: Target = {
    id: 1,
    name: "GraveRobber",
    type: TargetType.PLAYER,
    image: "assets/Characters/GraveRobber/anim/player.png",
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
      speed: 10,
      range: 60,
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
        start: 10,
        end: 15,
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
  };
}
