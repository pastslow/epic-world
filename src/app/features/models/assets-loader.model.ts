export class AssetsLoader {
  public static loadImage(
    this: Phaser.Scene,
    keyName: string,
    path: string
  ): void {
    this.load.image(keyName, path);
  }
}
