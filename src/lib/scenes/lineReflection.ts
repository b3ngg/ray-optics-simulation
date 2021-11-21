import type { Scene } from '$types/Scene';
import { createRay } from '$lib/ray';
import { createWorld } from '$lib/world';
import { Pt } from 'pts';
import { createLine } from '$lib/obstacles';
import { mirror } from '$lib/materials';

/**
 * Simple reflection of a ray on a vertical line
 */
export const lineReflection: Scene = (space) => {
	const form = space.getForm();
	const world = createWorld();

	world.addSource('ray', createRay(new Pt(), Math.PI * 2.2));
	world.addObstacle(
		'line',
		createLine(new Pt(800, 0), { end: new Pt(800, 5000), material: mirror })
	);

	world.update();
	space.add(() => {
		world.draw(form);
	});

	space.playOnce();
};
