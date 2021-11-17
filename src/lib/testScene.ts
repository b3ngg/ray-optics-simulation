import type { Scene } from '$types/scene';
import type { Ray } from './Ray';
import { Pt } from 'pts';
import { mirror } from './Material';
import { createWorld } from './World';
import { events } from './EventManager';

/**
 * Placeholder scene
 */

let angle = 0;
export const testScene: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();
	world.add({ type: 'line', start: new Pt(700, 300), end: new Pt(1800, 300), material: mirror });
	world.add({ type: 'line', start: new Pt(200, 600), end: new Pt(1200, 800), material: mirror });

	events.on('angle', (data) => (angle = data as number));

	space.add(() => {
		// Draw obstacles
		world.drawObstacles(form);

		const startRay: Ray = {
			origin: new Pt(600, 100),
			angle: space.pointer.$subtract(new Pt(600, 100)).angle()
		};

		const lines = world.traceRay(startRay);

		lines.forEach((l) => form.line(l));

		form.text(new Pt(10, 10), '' + angle);
	});

	space.bindMouse().bindTouch().play();
};
