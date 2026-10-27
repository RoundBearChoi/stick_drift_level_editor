import { Engine, ImageFiltering, DisplayMode } from 'excalibur';
import { loader } from './resources';
import { LevelEditorTestScene } from './level_editor_test_scene';
import { GameContext, NATIVE_RESOLUTION } from './game_context';
import { DraculaColorScheme } from './dracula_color_scheme';

const engine = new Engine({
  width: NATIVE_RESOLUTION.width,
  height: NATIVE_RESOLUTION.height,
  backgroundColor: DraculaColorScheme.background,
  displayMode: DisplayMode.Fixed,
  antialiasing: {
    pixelArtSampler: false,
    filtering: ImageFiltering.Pixel,
    nativeContextAntialiasing: false,
    multiSampleAntialiasing: false,
    canvasImageRendering: 'pixelated'
  },
  snapToPixel: true,
  pixelRatio: 1,
  suppressPlayButton: true,
});

const game_context = new GameContext();

engine.add('level_editor', new LevelEditorTestScene());

engine.start(loader).then(() => {
  engine.goToScene('level_editor', {
    sceneActivationData: game_context,
  });

  console.log('level editor started');
});

(window as any).engine = engine;
(window as any).game_context = game_context;
