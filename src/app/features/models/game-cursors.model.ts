export class GameCursors {
  public static keyboardControls: Phaser.Types.Input.Keyboard.CursorKeys;

  public static initializeKeyboardControls(this: Phaser.Scene): void {
    GameCursors.keyboardControls = this.input.keyboard.createCursorKeys();
  }
}
