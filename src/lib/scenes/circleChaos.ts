import type { Scene } from '$types/Scene';
import { mirror } from '$lib/materials';
import { createCircle } from '$lib/obstacles';
import { createRay } from '$lib/ray';
import { Const, Create } from 'pts';

export const circleChaos: Scene = ({ center, bounds, world, scale }) => {
	const pts = Create.distributeRandom(bounds, scale / 80);
	pts.forEach((pt, i) => {
		world.addObstacle('circle' + i, createCircle(pt, { material: mirror, radius: 60 }));
	});

	return (t) => {
		world.addSource('dynamic-ray', createRay(center, Const.two_pi * (t / 100000) - Const.half_pi));
	};
};
