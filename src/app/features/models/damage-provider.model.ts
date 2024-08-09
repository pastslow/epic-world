import { CombatAttributes } from '../../shared/interfaces/combat-attributes.interface';
import { Target } from '../../shared/interfaces/target.interface';
import { DamageType } from '../../shared/enums/damage-type.enum';
import { DynamicBody } from '../../shared/interfaces/dynamic-body.interface';
import { TargetActions } from '../state-models/target-actions.model';
import { PushNotifications, PushNotification } from './push-notification.model';

export class DamageProvider {
   public static getDamageDealtToTarget(entityCombatAttributes: CombatAttributes, target: Target) {
      const hasBlockedTheAttack = this.hasBlockedTheAttack(target.combatAttributes.blockChance);

      if (hasBlockedTheAttack) {
         return { type: DamageType.BLOCK, value: '🛡️' };
      }

      const damageDealt = this.getDamage(entityCombatAttributes);
      const isCriticalStrike = this.isCriticalStrike(entityCombatAttributes.critChance);

      if (isCriticalStrike) {
         const criticalDamage = entityCombatAttributes.critDamage || 2;

         return { type: DamageType.CRITICAL, value: damageDealt * criticalDamage };
      }

      return { type: DamageType.NORMAL, value: damageDealt };
   }

   public static dealTargetDamage(combatAttributes: CombatAttributes, overlappedEntity: DynamicBody): void {
      const damageDealt = DamageProvider.getDamageDealtToTarget(combatAttributes, overlappedEntity.targetOrigin);

      if (damageDealt.type !== DamageType.BLOCK && typeof damageDealt.value === 'number') {
         overlappedEntity.targetOrigin.combatAttributes.currentHealth -= damageDealt.value;
         TargetActions.setTargetBodyAsHurt(overlappedEntity);
      }

      PushNotifications.addNotification({
         settings: { ...damageDealt, attachedTarget: overlappedEntity },
      } as PushNotification);
   }

   private static getDamage(entityCombatAttributes: CombatAttributes): number {
      const minAttack = entityCombatAttributes.minAttack;
      const maxAttack = entityCombatAttributes.maxAttack;

      return Math.floor(Math.random() * (maxAttack - minAttack + 1)) + minAttack;
   }

   private static hasBlockedTheAttack(blockChance: number): boolean {
      const randomChance = Math.round(Math.random() * 100);
      return blockChance >= randomChance;
   }

   private static isCriticalStrike(critChance: number): boolean {
      const randomChance = Math.round(Math.random() * 100);
      return critChance >= randomChance;
   }
}
