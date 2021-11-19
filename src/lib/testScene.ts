import type { Scene } from '$types/Scene';
import { Pt } from 'pts';
import { mirror } from './materials';
import { createCircle, createCurve, createLine } from './obstacles';
import { createRay } from './ray';
import { createWorld } from './world';

/**
 * Placeholder scene
 */
export const testScene: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();
	const startPt = new Pt(1000, 100);

	world.addObstacle('circle', createCircle(new Pt(200, 200), { material: mirror, radius: 10 }));
	world.addObstacle(
		'line',
		createLine(new Pt(200, 200), { material: mirror, end: new Pt(500, 1000) })
	);
	world.addObstacle(
		'curve',
		createCurve(new Pt(800, 1200), { f: (x) => (x / 4) ** 2, scale: 10, material: mirror })
	);
	world.addSource('static-ray', createRay(startPt, -Math.PI - 1));

	space.add(() => {
		world.draw(form);

		world.addSource('dynamic-ray', createRay(startPt, space.pointer.$subtract(startPt).angle()));
		world.update();
	});

	space.bindMouse().bindTouch().play();
};
