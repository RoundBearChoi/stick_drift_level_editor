import { Engine } from 'excalibur';
import { FixedTimestep } from './fixed_timestep';
import { Tickable } from './tickable';
import { LevelContext } from './level_context';

export const NATIVE_RESOLUTION = {
  width: 640,
  height: 360,
} as const;

export type Resolution = typeof NATIVE_RESOLUTION;

/**
 * minimal context for the level editor.
 * owns the level data and the fixed-timestep tickable list used by the camera mover.
 */
export class GameContext {
  readonly native_resolution = NATIVE_RESOLUTION;
  readonly level_ctx = new LevelContext();

  /** editor view center. survives scene recreation. */
  editor_cam_x = NATIVE_RESOLUTION.width / 2;
  editor_cam_y = NATIVE_RESOLUTION.height / 2;

  private readonly _tickables = new Set<Tickable>();
  private readonly _fixed_timestep = new FixedTimestep(60, 5);

  registerTickable(tickable: Tickable): void {
    this._tickables.add(tickable);
  }

  unregisterTickable(tickable: Tickable): void {
    this._tickables.delete(tickable);
  }

  /** run on every visual frame from the scene's onPostUpdate. */
  update(_engine: Engine, realElapsed: number): void {
    this._fixed_timestep.step(realElapsed, (dt) => {
      for (const t of this._tickables) {
        t.fixedUpdate(dt);
      }
    });
  }
}
