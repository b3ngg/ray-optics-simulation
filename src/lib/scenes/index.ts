import type { Scene } from '$types/Scene';
import { basic } from './basic';
import { circleChaos } from './circleChaos';
import { parabolic } from './parabolic';

export interface SceneInfo {
	title: string;
	scene: Scene;
	content?: string;
	randomized?: boolean;
	inputBased?: boolean;
}

export const scenes: SceneInfo[] = [
	{
		title: 'Basic shapes',
		scene: basic,
		content: 'See how the light ray reflects on circles and lines of different sizes.',
		inputBased: true
	},
	{
		title: 'Circle Chaos',
		scene: circleChaos,
		content: 'When many circles are randomly arranged, complex behavior develops very quickly.',
		randomized: true
	},
	{
		title: 'Parabolic Reflector',
		scene: parabolic,
		content:
			'Move your mouse (or touch the screen) to move the light rays. They will always hit on on point, because of the parabolic reflector.',
		inputBased: true
	}
];
