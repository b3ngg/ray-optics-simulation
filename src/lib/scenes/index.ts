import type { Scene } from '$types/Scene';
import { circleChaos } from './circleChaos';
import { circleReflection } from './circleReflection';
import { lineReflection } from './lineReflection';
import { parabolic } from './parabolic';
import { rotatingLine } from './rotatingLine';
import { lineChaos } from './lineChaos';

export const scenes: Record<string, Scene> = {
	'Line Chaos': lineChaos,
	'Line Reflection': lineReflection,
	'Circle Reflection': circleReflection,
	'Parabolic Reflector': parabolic,
	'Rotating Line': rotatingLine,
	'Circle Chaos': circleChaos
};
