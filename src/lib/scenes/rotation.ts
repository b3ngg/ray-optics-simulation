import { mirror } from '$lib/materials';
import { createLine } from '$lib/obstacles';
import { createRay } from '$lib/ray';
import type { Scene } from '$types/Scene';
import { Const, Pt } from 'pts';

export const rotation: Scene = ({ world, bounds, center, screen }) => {
	return (t) => {
		world.addObstacle(
			'line1',
			createLine(new Pt(0.5, 0).$multiply(screen), {
				end: new Pt(10.0, 0).$multiply(screen).rotate2D((t / 10000) * Const.two_pi),
				material: mirror
			})
		);

		world.addObstacle(
			'line2',
			createLine(new Pt(0.5, 0.8).$multiply(screen), {
				end: new Pt(10.0, 0.8).$multiply(screen).rotate2D(-(t / 10000) * Const.two_pi),
				material: mirror
			})
		);

		world.addObstacle(
			'line3',
			createLine(new Pt(0.9, 0.5).$multiply(screen), {
				end: new Pt(10.0, 0.5).$multiply(screen).rotate2D((t / 5000) * Const.two_pi),
				material: mirror
			})
		);

		world.addSource('dynamic-ray', createRay(center, Const.half_pi * (t / 50000)));
	};
};
