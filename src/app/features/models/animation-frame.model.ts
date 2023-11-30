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
}
