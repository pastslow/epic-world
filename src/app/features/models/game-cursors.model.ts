import { GameScene } from "./game-scene.model";

export class GameCursors {
  public static keyboardControls: Phaser.Types.Input.Keyboard.CursorKeys;

  public static initializeKeyboardControls(): void {
    GameCursors.keyboardControls = GameScene.input.keyboard.createCursorKeys();
  }
}
