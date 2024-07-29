import { DynamicBody } from '../../shared/interfaces/dynamic-body.interface';

export class HealthBar {
   public static updateHealthBar(entity: DynamicBody, healthBar: Phaser.GameObjects.Graphics) {
      const barWidth = 40;
      const barHeight = 8;
      const healthPercentage = (entity.targetOrigin.combatAttributes.currentHealth * 100) / entity.targetOrigin.combatAttributes.health;
      const healthBarWidth = (barWidth * healthPercentage) / 100;

      healthBar.clear();
      healthBar.fillStyle(0x000000, 1);
      healthBar.fillRect(entity.x - barWidth / 2, entity.y - 50, barWidth, barHeight);
      healthBar.fillStyle(0xff0000, 1);
      healthBar.fillRect(entity.x - barWidth / 2, entity.y - 50, healthBarWidth < 0 ? 0 : healthBarWidth, barHeight - 1);
   }
}
