import type { Scene } from '$types/Scene';
import { mirror } from '$lib/materials';
import { createLine } from '$lib/obstacles';
import { createRay } from '$lib/ray';
import { createWorld } from '$lib/world';
import { Const, Pt, Tempo } from 'pts';

export const rotatingLine: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();

	const tempo = new Tempo(1);
	tempo.every(1).progress((_, t) => {
		world.addObstacle(
			'line',
			createLine(space.center, {
				end: space.innerBound.bottomRight.rotate2D(t * 10 * Const.two_pi),
				material: mirror
			})
		);

		world.addSource('dynamic-ray', createRay(new Pt(0, 0), Const.half_pi * t));
		world.update();
		world.draw(form);
	}, 0);

	space.add(tempo);

	space.bindMouse().bindTouch().play();
};
