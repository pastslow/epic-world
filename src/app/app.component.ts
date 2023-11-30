import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser';
import { Buildings } from './features/models/buildings.model';
import { GameCursors } from './features/models/game-cursors.model';
import { MapExtras } from './features/models/map-extras.model';
import { Parallax } from './features/models/parallax.model';
import { Player } from './features/models/player.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'epic-world';

  public config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: {
      preload: this.preload,
      create: this.create,
      update: this.update,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 450 },
        debug: false,
      },
    },
  };
  public game: Phaser.Game = new Phaser.Game(this.config);

  public ngOnInit(): void {}

  public preload(this: Phaser.Scene): void {
    Parallax.loadParallaxBackgrounds.bind(this)();
    MapExtras.loadMapExtras.bind(this)();
    Player.loadPlayer.bind(this)();
    Buildings.loadBuildings.bind(this)();
  }

  public create(this: Phaser.Scene): void {
    Parallax.initializeParallaxBackgrounds.bind(this)();

    this.physics.world.setBounds(0, 0, MapExtras.mapSize, window.innerHeight);

    GameCursors.initializeKeyboardControls.bind(this)();
    MapExtras.initializeMapExtras.bind(this)();

    MapExtras.initializeGrass(100);
    Buildings.initializeBuildings.bind(this)();
    Player.initializePlayer.bind(this)(
      MapExtras.tiles,
      Buildings.buildingsGroup
    );
    MapExtras.initializeGrass(40);
    MapExtras.initializeTiles();

    this.cameras.main.setBounds(0, 0, MapExtras.mapSize, window.innerHeight);
    this.cameras.main.startFollow(Player.entity, true, 0.08, 0.08);
  }

  public update(this: Phaser.Scene): void {
    Player.listenToPlayerActions.bind(this)(Buildings.buildingsGroup);
  }
}
