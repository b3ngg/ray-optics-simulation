import type { Obstacle } from '$types/Obstacle';
import type { TraceEnvironment } from '$types/TraceEnvironment';
import type { World } from '$types/World';
import { createTraceEnvironment } from './trace';

export const createWorld = (): Readonly<World> => {
	const obstacles: Obstacle[] = [];

	let environment: TraceEnvironment = createTraceEnvironment(obstacles);

	return {
		add: (obstacle) => {
			obstacles.push(obstacle);
			environment = createTraceEnvironment(obstacles);
		},
		traceRay: environment,
		draw: (f) => obstacles.forEach((o) => o.draw(f))
	};
};
