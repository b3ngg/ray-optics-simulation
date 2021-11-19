import type { Ray } from '$types/Ray';
import type { Scene } from '$types/Scene';
import { Pt } from 'pts';
import { mirror } from './materials';
import { createCircle, createLine } from './obstacles';
import { createWorld } from './world';

/**
 * Placeholder scene
 */

export const testScene: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();

	world.add(createCircle(new Pt(200, 200), { material: mirror, radius: 10 }));
	world.add(createLine(new Pt(200, 200), { material: mirror, end: new Pt(500, 1000) }));

	space.add(() => {
		world.draw(form);

		const startPt = new Pt(1000, 100);
		const startRay: Ray = {
			origin: startPt,
			angle: space.pointer.$subtract(startPt).angle()
		};

		const lines = world.traceRay(startRay);
		lines.forEach((l, i) => {
			form.font(20).text(l[0].$add(20), '' + i);
			form.stroke('#fff', 1).line(l);
		});
	});

	space.bindMouse().bindTouch().play();
};
