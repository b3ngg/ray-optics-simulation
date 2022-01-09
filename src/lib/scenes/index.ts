import type { Scene } from '$types/Scene';
import { circleChaos } from './circleChaos';
import { parabolic } from './parabolic';

export interface SceneInfo {
	title: string;
	scene: Scene;
	content?: string;
	randomized?: boolean;
}

export const scenes: SceneInfo[] = [
	{
		title: 'Circle Chaos',
		scene: circleChaos,
		content: '/circle-chaos.md',
		randomized: true
	},
	{
		title: 'Parabolic Reflector',
		scene: parabolic,
		content: '/parabolic-reflector.md'
	}
];
