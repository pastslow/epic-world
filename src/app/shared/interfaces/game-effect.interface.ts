import { Effects } from '../enums/effects.enum';

export interface GameEffect {
    name: Effects;
    duration: number;
    icon: string;
    cssClass: string;
    startingTime: number;
    charges: number;
    initialCharges: number;
    totalStack: number;
    stack: number;
    stockable: boolean;
    backgroundImage: string;
}
