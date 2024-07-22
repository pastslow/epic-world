import VirtualJoyStick from 'phaser3-rex-plugins/plugins/input/virtualjoystick/VirtualJoyStick';

export interface JoystickController extends VirtualJoyStick {
   simulatedKey: string;
}
