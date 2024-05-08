export interface CombatAttributes {
  level?: number;
  currentHealth?: number;
  health?: number;
  currentExperience?: number;
  experience?: number;
  minAttack?: number;
  maxAttack?: number;
  blockChance?: number;
  critChance?: number;
  minMiningAttack?: number;
  maxMiningAttack?: number;
  miningCritChance?: number;
  respawnDuration?: number;
  viewRange?: number;
  pauseBetweenAttack?: number;
  pauseStartTime?: number;
  initialPositionX?: number;
  initialPositionY?: number;
}
