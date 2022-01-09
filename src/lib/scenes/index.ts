import type { Scene } from '$types/Scene';
import { circleChaos } from './circleChaos';

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
	}
];
