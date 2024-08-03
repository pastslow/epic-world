import { Injectable } from '@angular/core';
import { TargetType } from '../../shared/enums/target-type.enum';
import { Target } from '../../shared/interfaces/target.interface';

@Injectable()
export class PlayerState {
   public static player: Target = {
      id: 1,
      name: 'player',
      type: TargetType.PLAYER,
      image: 'assets/characters/woman/1.png',
      currentMap: 'swamp',
      combatAttributes: {
         level: 1,
         currentHealth: 50,
         health: 50,
         currentExperience: 0,
         experience: 100,
         minAttack: 5,
         maxAttack: 10,
         blockChance: 25,
         critChance: 25,
         minMiningAttack: 15,
         maxMiningAttack: 25,
         miningCritChance: 0,
         initialPositionX: 400,
         initialPositionY: 40,
         pauseBetweenAttack: 300,
         pauseStartTime: 0,
         attackRange: 50,
         viewRange: 50,
      },
      physicalAttributes: {
         speed: 10,
         width: 100,
         height: 100,
      },
      atlasFrames: [
         {
            name: 'swim_attack',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'swim',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'hook',
            width: 47,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'jump_attack',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'jump',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'mine',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'pick',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'push',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'roll',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'run_equipped',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 12,
         },
         {
            name: 'gather',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'run_no_equipped',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 12,
         },
         {
            name: 'sowing',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'spin',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'throw',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'walk_equipped',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'walk_no_equipped',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'swim_idle_1',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'swim_up',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'jump_water',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'ride',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'sieve',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'fall',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'hammer',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'climb',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'swim_attack_up',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'swim_idle_attack',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'drowned',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'add',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'alchemy_read',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'attack_top',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'attack_mid',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'swim_attack_mid',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'bow',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'cast',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'founding',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'craft',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'swim_up_no_equipped',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'create',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'fill',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'death',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'double_jump',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'drink',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3, 4, 5],
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 10,
         },
         {
            name: 'row',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'cutting',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'falling',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'hang',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'eat',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'stir',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'idle',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'read',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'down',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'sharpen',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'crush',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'angry',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
         {
            name: 'fish',
            width: 48,
            height: 48,
            atlasMapper: [0, 1, 2, 3],
            frames: [0, 1, 2, 3],
            frameRate: 10,
         },
      ],
      imageFrames: [],
      pushNotifications: [],
      currentTargets: [],
   };
}
