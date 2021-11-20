import type { Scene } from '$types/Scene';
import { mirror } from '$lib/materials';
import { createCircle } from '$lib/obstacles';
import { createRay } from '$lib/ray';
import { createWorld } from '$lib/world';
import { Pt, Create } from 'pts';

/**
 * Placeholder scene
 */
export const testScene: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();
	const startPt = new Pt(1000, 100);

	space.add({
		start: (bound) => {
			const pts = Create.distributeRandom(bound, 10);

			pts.forEach((pt, i) => {
				world.addObstacle('circle' + i, createCircle(pt, { material: mirror, radius: 40 }));
			});
		}
	});

	space.add(() => {
		world.draw(form);

		world.addSource('dynamic-ray', createRay(startPt, space.pointer.$subtract(startPt).angle()));
		world.update();
	});

	space.bindMouse().bindTouch().play();
};
