import { mirror } from '$lib/materials';
import { createCircle, createLine } from '$lib/obstacles';
import { createRay } from '$lib/ray';
import type { Scene } from '$types/Scene';
import { Pt } from 'pts';

export const basic: Scene = ({ world, screen, center }) => {
	world.addObstacle(
		'line1',
		createLine(new Pt(0.4, 0.2).$multiply(screen), {
			material: mirror,
			end: new Pt(0.8, 0.1).$multiply(screen)
		})
	);

	world.addObstacle(
		'line2',
		createLine(new Pt(0.1, 0.2).$multiply(screen), {
			material: mirror,
			end: new Pt(0.1, 0.9).$multiply(screen)
		})
	);

	world.addObstacle(
		'circle1',
		createCircle(new Pt(0.4, 0.8).$multiply(screen), {
			material: mirror,
			radius: 100
		})
	);

	world.addObstacle(
		'circle2',
		createCircle(new Pt(0.9, 0.55).$multiply(screen), {
			material: mirror,
			radius: 300
		})
	);

	return (_, p) => {
		world.addSource('ray', createRay(center, p.$subtract(center).angle()));
	};
};
