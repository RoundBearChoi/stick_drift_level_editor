import { Engine, ImageFiltering, DisplayMode } from 'excalibur';
import { loader } from './resources';
import { LevelEditorTestScene } from './level_editor_test_scene';
import { GameContext, NATIVE_RESOLUTION } from './game_context';
import { DraculaColorScheme } from './dracula_color_scheme';
import { ResolutionScale } from './resolution_scale';

const engine = new Engine({
  width: NATIVE_RESOLUTION.width,
  height: NATIVE_RESOLUTION.height,
  backgroundColor: DraculaColorScheme.background,
  displayMode: DisplayMode.Fixed, // important for clean integer CSS scaling
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
const resolution_scale = new ResolutionScale();

engine.add('level_editor', new LevelEditorTestScene());

engine.start(loader).then(() => {
  // attach integer scaling after engine is ready
  resolution_scale.attachToEngine(engine);

  // wire resolution debug so the on-screen label stays in sync
  game_context.screen_resolution_debug.setScale(resolution_scale);
  resolution_scale.setDebugRefresh(() => game_context.screen_resolution_debug.refresh());

  engine.goToScene('level_editor', {
    sceneActivationData: game_context,
  });

  console.log('level editor started');
  console.log('integer resolution scaling ready (f8 to cycle)');
});

(window as any).engine = engine;
(window as any).game_context = game_context;
(window as any).resolution_scale = resolution_scale;
