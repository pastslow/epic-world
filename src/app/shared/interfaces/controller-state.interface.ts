import { GameControllerKeys } from '../enums/game-controller-keys.enum';

export interface ControllerState {
    activeKeys: GameControllerKeys[];
    startX: number;
    startY: number;
    positionX: number;
    positionY: number;
    initialPositionX: number;
    initialPositionY: number;
}
