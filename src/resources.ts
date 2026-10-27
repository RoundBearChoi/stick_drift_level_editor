import { TerminalLoader } from './terminal_loader';
import { debugFontSource } from './debug_font';
import { AsepriteResource } from '@excaliburjs/plugin-aseprite';

export const Resources = {
  brick_8x8: new AsepriteResource('./res/sprites/8x8_brick.aseprite'),
  brick_16x16: new AsepriteResource('./res/sprites/16x16_brick.aseprite'),
  spikes_16x16: new AsepriteResource('./res/sprites/16x16_spikes.aseprite'),
} as const;

const loader = new TerminalLoader();

loader.addResource(debugFontSource);
loader.addResource(Resources.brick_8x8);
loader.addResource(Resources.brick_16x16);
loader.addResource(Resources.spikes_16x16);

export { loader };
