import type { Scene } from '$types/Scene';
import { createRay } from '$lib/ray';
import { createWorld } from '$lib/world';
import { Pt } from 'pts';
import { createCurve } from '$lib/obstacles';
import { mirror } from '$lib/materials';

/**
 * Reflections of multiple rays on a parabolic reflector
 */
export const parabolic: Scene = (space) => {
	const form = space.getForm();
	const world = createWorld();

	for (let i = 0; i < 10; i++) {
		world.addSource('ray' + i, createRay(new Pt(500 + 40 * i, 0), Math.PI * 2.5));
	}

	world.addObstacle(
		'reflector',
		createCurve(new Pt(480 + 5 * 40, 500), { f: (x) => (x / 10) ** 2, scale: 6, material: mirror })
	);

	world.update();
	space.add(() => {
		world.draw(form);
	});

	space.playOnce();
};
