import { DamageType } from '../../shared/enums/damage-type.enum';
import { TimeStamp } from '../state-models/time-stamp.model';
import { GameScene } from './game-scene.model';

export class PushNotifications {
   private static notifications: PushNotification[] = [];

   public static addNotification(notification: PushNotification): void {
      const attachedTargetPositionX = notification.settings.attachedTarget.x;
      const attachedTargetPositionY = notification.settings.attachedTarget.y;
      const attachedTargetWidth = notification.settings.attachedTarget.displayWidth / 2;
      const attachedTargetHeight = notification.settings.attachedTarget.displayHeight / 2;

      const text: PushNotification = GameScene.add.text(
         attachedTargetPositionX,
         attachedTargetPositionY - attachedTargetHeight,
         notification.settings.value.toString(),
         {
            fontSize: '32px',
            color: '#ffffff',
         }
      );
      notification.settings.size = 32;
      notification.settings.duration = 500;
      notification.settings.currentTime = TimeStamp.now;
      text.settings = { ...notification.settings };

      this.notifications.push(text);
   }

   public static listenToNotifications(): void {
      if (!this.notifications.length) {
         return;
      }

      this.notifications.forEach((notification: PushNotification, index: number) => {
         const attachedTargetPositionX = notification.settings.attachedTarget.x;
         const attachedTargetWidth = notification.settings.attachedTarget.displayWidth / 2;

         if (notification.settings.duration + notification.settings.currentTime < TimeStamp.now) {
            notification.destroy();
            this.notifications.splice(index, 1);
            return;
         }

         notification.settings.size -= 0.2;
         notification.setX(attachedTargetPositionX - attachedTargetWidth);
         notification.setY(notification.y - 0.2);
         notification.setFontSize(notification.settings.size);
      });
   }
}
export interface PushNotification extends Phaser.GameObjects.Text {
   settings?: PushNotificationSettings;
}

export interface PushNotificationSettings {
   type?: DamageType;
   value?: DamageType | number;
   size?: number;
   duration?: number;
   currentTime?: number;
   attachedTarget: any;
}
