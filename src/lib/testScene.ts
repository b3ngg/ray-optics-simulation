import type { Scene } from '$types/Scene';
import { Pt } from 'pts';
import { COLORS } from './const';
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

	world.add(createCircle(new Pt(200, 200), { material: mirror, radius: 10 }));
	world.add(createLine(new Pt(200, 200), { material: mirror, end: new Pt(500, 1000) }));
	world.add(
		createCurve(new Pt(800, 1200), { f: (x) => (x / 4) ** 2, scale: 10, material: mirror })
	);

	space.add(() => {
		world.draw(form);

		const startPt = new Pt(1000, 100);
		const startRay = createRay(startPt, space.pointer.$subtract(startPt).angle());

		const lines = world.traceRay([startRay, createRay(startPt, -Math.PI - 1)]);
		lines.forEach((l) => {
			form.stroke(COLORS.RAY, 4).alpha(0.8).line(l);
		});
	});

	space.bindMouse().bindTouch().play();
};
