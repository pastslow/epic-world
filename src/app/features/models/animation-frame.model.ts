import { Target } from '../../shared/interfaces/target.interface';

export class AnimationFrame extends Phaser.Scene {
   public static create(
      entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
      keyName: string,
      entityName: string,
      frameStart: number,
      frameEnd: number,
      repeatable: boolean,
      fps = 10
   ) {
      entity.anims.create({
         key: keyName,
         frames: entity.anims.generateFrameNumbers(entityName, {
            start: frameStart,
            end: frameEnd,
         }),
         frameRate: fps,
         repeat: repeatable ? -1 : 1,
      });
   }

   public static generateAtlasAnimation(target: Target) {
      const atlasAnimation = { anims: [] };

      target.atlasFrames.forEach((imageFrame, rowIndex) => {
         const animation = {
            key: target.name + '_' + imageFrame.name,
            type: 'frames',
            repeat: -1,
            frameRate: imageFrame.frameRate,
            frames: [],
         };

         imageFrame['frames'].forEach((frameValue, index) => {
            const keyFrame = {
               key: target.name,
               frame: target.name + '_' + imageFrame.name + '_' + frameValue,
            };

            animation.frames.push(keyFrame);
         });

         atlasAnimation.anims.push(animation);
      });
      console.log('atlasAnimation', atlasAnimation);
      return atlasAnimation;
   }
}
