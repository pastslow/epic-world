import { NotificationColorType } from '../enums/notification-color-type.enum';

export interface NotificationState {
    value?: number;
    type?: NotificationColorType;
    operationalSign?: string;
    duration?: number;
    startingTime?: number;
    notificationEndSign?: string;
}
