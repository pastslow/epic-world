import { Frame } from './frame.interface';

export interface ImageFrame {
    attack?: Frame;
    idle?: Frame;
    walk?: Frame;
    stand?: Frame;
    run?: Frame;
    mine?: Frame;
    death?: Frame;
}
