import { Injectable } from '@angular/core';
import { TargetType } from '../../shared/enums/target-type.enum';
import { Target } from '../../shared/interfaces/target.interface';

@Injectable()
export class EnemyState {
   public static enemies: Target[] = [
      {
         id: 1,
         name: 'Hyena',
         type: TargetType.ENEMY,
         image: 'assets/Enemies/Desert/Hyena/1.png',
         currentMap: 'swamp',
         combatAttributes: {
            level: 1,
            currentHealth: 20,
            health: 20,
            currentExperience: 0,
            experience: 100,
            minAttack: 5,
            maxAttack: 10,
            blockChance: 2,
            critChance: 25,
            viewRange: 400,
            pauseBetweenAttack: 1000,
            pauseStartTime: 0,
            initialPositionX: 720,
            initialPositionY: 40,
         },
         physicalAttributes: {
            width: 90,
            height: 90,
            speed: 10,
         },
         imageFrames: [
            {
               name: 'idle',
               start: 0,
               end: 3,
               repeatable: true,
               fps: 10,
            },
            {
               name: 'walk',
               start: 4,
               end: 9,
               repeatable: true,
               fps: 10,
            },
            {
               name: 'attack',
               start: 10,
               end: 15,
               repeatable: true,
               fps: 12,
            },
            {
               name: 'death',
               start: 16,
               end: 21,
               repeatable: true,
               fps: 12,
            },
            {
               name: 'hurt',
               start: 22,
               end: 23,
               repeatable: true,
               fps: 12,
            },
         ],
         currentTargets: [],
      },
      {
         id: 2,
         name: 'Hyena',
         type: TargetType.ENEMY,
         image: 'assets/Enemies/Desert/Hyena/1.png',
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
            width: 90,
            height: 90,
            speed: 10,
         },
         imageFrames: [
            {
               name: 'idle',
               start: 0,
               end: 3,
               repeatable: true,
               fps: 10,
            },
            {
               name: 'walk',
               start: 4,
               end: 9,
               repeatable: true,
               fps: 10,
            },
            {
               name: 'attack',
               start: 10,
               end: 15,
               repeatable: true,
               fps: 12,
            },
            {
               name: 'death',
               start: 16,
               end: 21,
               repeatable: true,
               fps: 12,
            },
         ],
         currentTargets: [],
      },
   ];
}
