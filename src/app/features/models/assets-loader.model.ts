import { Target } from '../../shared/interfaces/target.interface';
import { AnimationFrame } from './animation-frame.model';
import { AtlasGenerator } from './atlas-generator.model';
import { GameScene } from './game-scene.model';

export class AssetsLoader {
   public static loadAssets(targets: Target[], spriteSheet = true, options = { width: 48, height: 48 }) {
      targets.forEach((target: Target) => {
         if (spriteSheet) {
            GameScene.load.spritesheet(target.name, target.image, {
               frameWidth: options.width,
               frameHeight: options.height,
            });
         } else {
            GameScene.load.image(target.name, target.image);
         }
      });
   }

   public static loadAtlasSprite(targets: Target[]) {
      targets.forEach((target) => {
         GameScene.load.animation(target.name, AnimationFrame.generateAtlasAnimation(target) as any);
         GameScene.load.atlas(target.name, target.image, AtlasGenerator.generateAtlas(target));
      });
   }
}
