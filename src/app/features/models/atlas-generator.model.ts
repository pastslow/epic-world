import { Target } from '../../shared/interfaces/target.interface';

export class AtlasGenerator {
   static generateAtlas(target: Target) {
      const atlas = { frames: [] };

      target.atlasFrames.forEach((imageFrame, rowIndex) => {
         imageFrame['atlasMapper'].forEach((atlasValue, index) => {
            const keyFrame = {
               filename: target.name + '_' + imageFrame.name + '_' + index,
               frame: {
                  w: imageFrame['width'],
                  h: imageFrame['height'],
                  x: index === 0 ? 0 : imageFrame['width'] * index,
                  y: rowIndex === 0 ? 0 : imageFrame['height'] * rowIndex,
               },
               anchor: {
                  x: 0.5,
                  y: 0.5,
               },
            };

            atlas.frames.push(keyFrame);
         });
      });
      console.log('atlas', atlas);
      return atlas;
   }
}
