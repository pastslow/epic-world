import { CombatAttributes } from '../../shared/interfaces/combat-attributes.interface';
import { Target } from '../../shared/interfaces/target.interface';
import { DamageType } from '../../shared/enums/damage-type.enum';

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

   private static getDamage(entityCombatAttributes: CombatAttributes): number {
      const minAttack = entityCombatAttributes.minAttack;
      const maxAttack = entityCombatAttributes.maxAttack;

      return minAttack + Math.round(Math.random() * maxAttack);
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
