import type { Scene } from '$types/Scene';
import { mirror } from '$lib/materials';
import { createLine } from '$lib/obstacles';
import { createRay } from '$lib/ray';
import { createWorld } from '$lib/world';
import { Const, Create, Num, Pt } from 'pts';

export const lineChaos: Scene = (space) => {
	const form = space.getForm();

	const world = createWorld();

	space.add({
		start: (bound) => {
			const pts = Create.distributeRandom(bound, 50);

			world.addObstacle(
				'border-b',
				createLine(bound.bottomRight, {
					material: mirror,
					end: bound.bottomRight.subtract(bound.width, 0)
				})
			);

			world.addObstacle(
				'border-r',
				createLine(bound.bottomRight, {
					material: mirror,
					end: bound.bottomRight.subtract(0, bound.height)
				})
			);

			pts.forEach((pt, i) => {
				world.addObstacle(
					'line' + i,
					createLine(pt, {
						material: mirror,
						end: pt.$add(Num.randomPt(new Pt(100, 100), new Pt(400, 400)))
					})
				);
			});
			world.addSource(
				'static-ray',
				createRay(new Pt(50, 50), Const.two_pi + Num.randomRange(0, Const.half_pi))
			);

			world.update();
		}
	});

	space.add(() => world.draw(form));

	space.playOnce();
};
