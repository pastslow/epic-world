import { Target } from "../../shared/interfaces/target.interface";
import { GameScene } from "./game-scene.model";

export class AssetsLoader {
  public static loadAssets(
    targets: Target[],
    spriteSheet = true,
    options = { width: 48, height: 48 }
  ) {
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
}
