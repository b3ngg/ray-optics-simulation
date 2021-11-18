import type { Scene } from '$types/scene';
import type { Ray } from './Ray';
import { Line, Pt } from 'pts';
import type { PtIterable } from 'pts';
import { mirror } from './Material';
import { createWorld } from './World';
import { events } from './EventManager';
import type { Obstacle } from './Obstacle';

/**
 * Placeholder scene
 */

export const testScene: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();
	// world.add({ type: 'line', start: new Pt(700, 300), end: new Pt(1800, 500), material: mirror });
	// world.add({ type: 'line', start: new Pt(200, 600), end: new Pt(1200, 800), material: mirror });
	// world.add({ type: 'circle', center: new Pt(200, 1000), radius: 100, material: mirror });
	// world.add({ type: 'circle', center: new Pt(500, 800), radius: 100, material: mirror });
	// world.add({ type: 'circle', center: new Pt(900, 500), radius: 100, material: mirror });
	// world.add({ type: 'circle', center: new Pt(100, 400), radius: 100, material: mirror });
	world.add({
		type: 'curve',
		start: new Pt(1800, 600),
		f: (x) => (x / 4) ** 2,
		scale: 10,
		material: mirror,
		rotation: -Math.PI / 2
	});

	events.on('data', (data) => {
		form.text(new Pt(10, 20), '' + data);
	});

	events.on('collision', (data) => {
		if (!data) return;
		const [[collision, line]] = data as [[Pt, PtIterable], Obstacle];
		form.strokeOnly('#fff', 1).point(collision);
		form.stroke('#f22628', 2).line(line);
	});

	events.on('new-ray', (data) => {
		const rays = data as Ray[];
		rays.forEach((ray) => {
			form.stroke('#f22628', 2).line(Line.fromAngle(ray.origin, ray.angle, 200));
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
