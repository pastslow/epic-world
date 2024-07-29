export class GameScene {
   public static physics: Phaser.Physics.Arcade.ArcadePhysics;
   public static cameras: Phaser.Cameras.Scene2D.CameraManager;
   public static load: Phaser.Loader.LoaderPlugin;
   public static add: Phaser.GameObjects.GameObjectFactory;
   public static input: Phaser.Input.InputPlugin;
   public static plugins: Phaser.Plugins.PluginManager;
   public static make: Phaser.GameObjects.GameObjectCreator;
   public static time: Phaser.Time.Clock;

   public static initGameScene(phaserGame: Phaser.Game) {
      this.physics = phaserGame.scene.getScene('default').physics;
      this.cameras = phaserGame.scene.getScene('default').cameras;
      this.load = phaserGame.scene.getScene('default').load;
      this.add = phaserGame.scene.getScene('default').add;
      this.input = phaserGame.scene.getScene('default').input;
      this.plugins = phaserGame.scene.getScene('default').plugins;
      this.make = phaserGame.scene.getScene('default').make;
      this.time = phaserGame.scene.getScene('default').time;
   }
}
