import type { Scene } from '$types/scene';
import type { Ray } from './Ray';
import { Circle, Pt } from 'pts';
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
		world.getObstacles().forEach((obstacle) => {
			if (obstacle.type === 'circle')
				return form.fill('#fff').circle(Circle.fromCenter(obstacle.center, obstacle.radius));
			if (obstacle.type === 'line') return form.fill('#fff').line([obstacle.start, obstacle.end]);
		});

		const startRay: Ray = {
			origin: new Pt(600, 100),
			direction: space.pointer
		};

		const lines = world.traceRay(startRay);

		lines.forEach((l) => form.line(l));

		form.text(new Pt(10, 10), '' + angle);
	});

	space.bindMouse().bindTouch().play();
};
