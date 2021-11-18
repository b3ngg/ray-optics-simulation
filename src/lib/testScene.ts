import type { IntersectionReturn } from '$types/Obstacle';
import type { Ray } from '$types/Ray';
import type { Scene } from '$types/scene';
import { Pt } from 'pts';
import { events } from './EventManager';
import { mirror } from './materials';
import { createCircle, createLine } from './obstacles';
import { createWorld } from './World';

/**
 * Placeholder scene
 */

export const testScene: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();

	space.add(() => {
		// Draw obstacles
		world.add(createCircle(new Pt(200, 200), { material: mirror, radius: 10, type: 'circle' }));
		world.add(
			createLine(new Pt(200, 200), { material: mirror, end: new Pt(500, 1000), type: 'line' })
		);

		world.draw(form);

		events.on('collision', (data) => {
			if (!data) return;
			const { intersection } = data as IntersectionReturn[0];
			form.point(intersection);
		});

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
