import type { Scene } from '$types/Scene';
import { circleChaos } from './circleChaos';
import { lineReflection } from './lineReflection';
import { rotatingLine } from './rotatingLine';
import { start } from './start';

export const scenes: Record<string, Scene> = {
	Start: start,
	'Line Reflection': lineReflection,
	'Rotating Line': rotatingLine,
	'Circle Chaos': circleChaos
};
