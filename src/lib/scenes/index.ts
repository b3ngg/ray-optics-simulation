import type { Scene } from '$types/Scene';
import { circleChaos } from './circleChaos';
import { rotatingLine } from './rotatingLine';
import { start } from './start';

export const scenes: Record<string, Scene> = {
	Start: start,
	'Rotating Line': rotatingLine,
	'Circle Chaos': circleChaos
};
