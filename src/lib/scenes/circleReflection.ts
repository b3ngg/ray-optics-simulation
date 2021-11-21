import type { Scene } from '$types/Scene';
import { createRay } from '$lib/ray';
import { createWorld } from '$lib/world';
import { Pt } from 'pts';
import { createCircle } from '$lib/obstacles';
import { mirror } from '$lib/materials';

/**
 * Simple reflection of a ray on a circle
 */
export const circleReflection: Scene = (space) => {
	const form = space.getForm();
	const world = createWorld();

	world.addSource('ray', createRay(new Pt(), Math.PI * 2.2));
	world.addObstacle('circle', createCircle(new Pt(800, 600), { radius: 100, material: mirror }));

	world.update();
	space.add(() => {
		world.draw(form);
	});

	space.playOnce();
};
