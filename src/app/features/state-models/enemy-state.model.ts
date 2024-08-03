import { Injectable } from '@angular/core';
import { TargetType } from '../../shared/enums/target-type.enum';
import { Target } from '../../shared/interfaces/target.interface';

@Injectable()
export class EnemyState {
   public static enemies: Target[] = [
      {
         id: 2,
         name: 'wolf',
         type: TargetType.ENEMY,
         image: 'assets/map_1_village/monsters/wolf/1.png',
         currentMap: 'swamp',
         combatAttributes: {
            level: 1,
            currentHealth: 100,
            health: 100,
            currentExperience: 0,
            experience: 100,
            minAttack: 5,
            maxAttack: 10,
            blockChance: 2,
            critChance: 25,
            viewRange: 400,
            pauseBetweenAttack: 1000,
            pauseStartTime: 0,
            initialPositionX: 1110,
            initialPositionY: 40,
         },
         physicalAttributes: {
            width: 80,
            height: 80,
            speed: 10,
         },
         atlasFrames: [
            {
               name: 'death',
               width: 48,
               height: 48,
               atlasMapper: [0, 1, 2, 3, 4, 5],
               frames: [0, 1, 2, 3, 4, 5],
               frameRate: 12,
            },
            {
               name: 'walk',
               width: 48,
               height: 48,
               atlasMapper: [0, 1, 2, 3, 4, 5],
               frames: [0, 1, 2, 3, 4, 5],
               frameRate: 10,
            },
            {
               name: 'attack',
               width: 48,
               height: 48,
               atlasMapper: [0, 1, 2, 3],
               frames: [0, 1, 2, 3],
               frameRate: 12,
            },
            {
               name: 'idle',
               width: 48,
               height: 48,
               atlasMapper: [0, 1, 2, 3],
               frames: [0, 1, 2, 3],
               frameRate: 10,
            },
         ],
         imageFrames: [],
         currentTargets: [],
      },
   ];
}
