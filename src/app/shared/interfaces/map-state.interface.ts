import { DeadTarget } from './dead-target.interface';
import { MapTarget } from './map-target.interface';

export interface MapState {
    name: string;
    targets: MapTarget[];
    temporaryDeadTargets: DeadTarget[];
}
