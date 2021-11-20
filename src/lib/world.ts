import type { Obstacle } from '$types/Obstacle';
import type { Ray } from '$types/Ray';
import type { World } from '$types/World';
import type { PtIterable } from 'pts';
import { COLORS } from './const';
import { createTraceEnvironment } from './trace';

export const createWorld = (): Readonly<World> => {
	const obstacles = new Map<string, Obstacle>();
	const sources = new Map<string, Ray>();

	let traces: Readonly<PtIterable[]> = [];
	return {
		addObstacle: (id, obstacle) => {
			obstacles.set(id, obstacle);
		},
		addSource: (id, ray) => {
			sources.set(id, ray);
		},
		update: () => {
			traces = createTraceEnvironment([...obstacles.values()])([...sources.values()]);
		},
		draw: (f) => {
			obstacles.forEach((o) => o.draw(f));
			traces.forEach((t) => f.stroke(COLORS.RAY, 4).alpha(0.8).line(t));
		}
	};
};
