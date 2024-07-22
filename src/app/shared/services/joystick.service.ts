import { Injectable } from '@angular/core';
import { GameScene } from '../../features/models/game-scene.model';
import { JoystickController } from '../interfaces/joystick-controller.interface';

@Injectable()
export class JoystickService {
   private joystick: JoystickController;

   public getJoystickSimulatedKey(): JoystickController {
      return this.joystick;
   }

   public initializeJoystick(): void {
      this.joystick = GameScene.plugins.get('rexVirtualJoystick')['add'](this, {
         x: 100,
         y: window.innerHeight - 100,
         radius: 50,
         base: GameScene.add.circle(0, 0, 50, 0x888888, 0.7),
         thumb: GameScene.add.circle(0, 0, 30, 0xcccccc, 0.7),
      });
   }
}
