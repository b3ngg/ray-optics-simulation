import type { Scene } from '$types/Scene';
import { createRay } from '$lib/ray';
import { Pt } from 'pts';
import { createCurve } from '$lib/obstacles';
import { mirror } from '$lib/materials';

/**
 * Reflections of multiple rays on a parabolic reflector
 */
export const parabolic: Scene = ({ world, center }) => {
	world.addObstacle(
		'reflector',
		createCurve(center, { f: (x) => (x / 10) ** 2, scale: 4, material: mirror })
	);

	return (_, p) => {
		for (let i = 0; i < 10; i++) {
			world.addSource('ray' + i, createRay(new Pt(p.x + i * 40, 0), Math.PI * 2.5));
		}
	};
};
