import type { Scene } from '$types/Scene';
import { mirror } from '$lib/materials';
import { createCircle } from '$lib/obstacles';
import { createRay } from '$lib/ray';
import { createWorld } from '$lib/world';
import { Const, Create, Pt, Tempo } from 'pts';

export const circleChaos: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();

	let start: Pt;
	space.add({
		start: (bound) => {
			const pts = Create.distributeRandom(bound, 30);
			start = space.center;

			pts.forEach((pt, i) => {
				world.addObstacle('circle' + i, createCircle(pt, { material: mirror, radius: 60 }));
			});
		}
	});

	const tempo = new Tempo(1);

	tempo.every(2).progress((_, t) => {
		world.addSource('dynamic-ray', createRay(start, Const.two_pi * t - Const.half_pi));
		world.update();
		world.draw(form);
	}, 0);

	space.add(tempo);

	space.bindMouse().bindTouch().play();
};
