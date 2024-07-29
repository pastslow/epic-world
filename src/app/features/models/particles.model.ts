import { GameScene } from './game-scene.model';

export class Particles {
   public static particlesEmitter: Phaser.GameObjects.Particles.ParticleEmitter;

   static loadParticles(): void {
      const graphics = GameScene.make.graphics({ x: 0, y: 0 }, false);
      graphics.fillStyle(0xffffff, 1.0);
      graphics.fillRect(0, 0, 10, 10);
      graphics.generateTexture('whiteSquare', 10, 10);
   }

   static initializeParticlesEffects(): void {
      this.particlesEmitter = GameScene.add.particles(0, 0, 'whiteSquare', {
         lifespan: 4000,
         speed: { min: 150, max: 300 },
         scale: { start: 0.8, end: 0 },
         gravityY: 600,
         blendMode: 'ADD',
         emitting: false,
      });
   }

   static explodeParticles(count = 16, x = 0, y = 0): void {
      this.particlesEmitter.explode(count, x, y);
   }
}
