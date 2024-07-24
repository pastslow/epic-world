import { Component, OnInit } from '@angular/core';
import { StatusBar } from '@capacitor/status-bar';
import { NavigationBar } from '@hugotomazi/capacitor-navigation-bar';
import Phaser from 'phaser';
import { Observable, forkJoin, from, catchError, of } from 'rxjs';
import { AssetsLoader } from './features/models/assets-loader.model';
import { GameCursors } from './features/models/game-cursors.model';
import { GameScene } from './features/models/game-scene.model';
import { MapExtras } from './features/models/map-extras.model';
import { Parallax } from './features/models/parallax.model';
import { PushNotifications } from './features/models/push-notification.model';
import { BuildingsState } from './features/state-models/buildings-state.model';
import { EnemyState } from './features/state-models/enemy-state.model';
import { PlayerState } from './features/state-models/player-state.model';
import { TimeStamp } from './features/state-models/time-stamp.model';
import { BuildingsService } from './shared/services/buildings.service';
import { EnemyService } from './shared/services/enemy/enemy.service';
import { PlayerService } from './shared/services/player/player.service';
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js';
import { JoystickService } from './shared/services/joystick.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   public player;
   title = 'epic-world';
   private phaserGame: Phaser.Game; // Placeholder for Phaser game instance

   public config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      scene: {
         preload: this.preload.bind(this),
         create: this.create.bind(this),
         update: this.update.bind(this),
      },
      physics: {
         default: 'arcade',
         arcade: {
            gravity: { y: 600, x: 0 },
            debug: true,
         },
      },
      plugins: {
         global: [
            {
               key: 'rexVirtualJoystick',
               plugin: VirtualJoystickPlugin,
               start: true,
            },
         ],
      },
   };

   constructor(
      private readonly playerService: PlayerService,
      private readonly buildingService: BuildingsService,
      private readonly enemyService: EnemyService,
      private readonly joystickService: JoystickService
   ) {}

   public ngOnInit(): void {
      this.createGame();
      this.hideNavigationBarsForMobile().subscribe();

      this.player = PlayerState.player;
   }

   public preload(): void {
      GameScene.initGameScene(this.phaserGame);
      AssetsLoader.loadAssets([PlayerState.player]);
      AssetsLoader.loadAssets(EnemyState.enemies);
      Parallax.loadParallaxBackgrounds();
      MapExtras.loadMapExtras();
      AssetsLoader.loadAssets(BuildingsState.buildings, false);

      this.buildingService.loadBuildings();
   }

   public create(): void {
      Parallax.initializeParallaxBackgrounds();

      GameScene.physics.world.setBounds(0, 0, MapExtras.mapSize, window.innerHeight);

      GameCursors.initializeKeyboardControls();
      MapExtras.initializeMapExtras();

      MapExtras.initializeGrass(100);
      this.buildingService.initializeBuildings();
      this.playerService.initializePlayer(MapExtras.tiles);
      this.enemyService.initializeEnemies(MapExtras.tiles);
      MapExtras.initializeGrass(40);
      MapExtras.initializeTiles();

      GameScene.cameras.main.setBounds(0, 0, MapExtras.mapSize, window.innerHeight);
      GameScene.cameras.main.startFollow(this.playerService.entity, true, 0.08, 0.08);

      GameScene.physics.add.overlap(this.enemyService.enemiesGroup, this.playerService.entity, this.enemyService.handleTargetOverlap);

      this.joystickService.initializeJoystick();
   }

   public update(): void {
      TimeStamp.now = new Date().getTime();

      this.playerService.listenToPlayerActions();
      this.enemyService.listerToMonstersActions(this.playerService.entity);

      PushNotifications.listenToNotifications();
   }

   public createGame() {
      this.phaserGame = new Phaser.Game(this.config);
   }

   public hideNavigationBarsForMobile(): Observable<[void, void, void]> {
      return forkJoin([from(StatusBar.setOverlaysWebView({ overlay: true })), from(StatusBar.hide()), from(NavigationBar.hide())]).pipe(
         catchError(() => {
            return of(null);
         })
      );
   }
}
