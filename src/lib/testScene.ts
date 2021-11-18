import type { Scene } from '$types/scene';
import type { Ray } from './Ray';
import { Line, Pt } from 'pts';
import { mirror } from './Material';
import { createWorld } from './World';
import { events } from './EventManager';

/**
 * Placeholder scene
 */

export const testScene: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();
	// world.add({ type: 'line', start: new Pt(700, 300), end: new Pt(1800, 500), material: mirror });
	// world.add({ type: 'line', start: new Pt(200, 600), end: new Pt(1200, 800), material: mirror });
	world.add({ type: 'circle', center: new Pt(200, 100), radius: 100, material: mirror });

	events.on('angle', ([pt, angle, reflection]) => {
		form.text(pt, '' + reflection);
		form.stroke('#2774a5', 2).line(Line.fromAngle(pt, angle, 100));
	});
	events.on('collision', (data) => {
		form.stroke('#fff').point(data as Pt);
	});

	events.on('new-ray', (data) => {
		const rays = data as Ray[];
		rays.forEach((ray) => {
			form.stroke('#f22628', 4).line(Line.fromAngle(ray.origin, ray.angle, 200));
		});
	});

	space.add(() => {
		// Draw obstacles
		world.drawObstacles(form);

		const startPt = new Pt(600, 100);

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
