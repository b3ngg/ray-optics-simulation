import type { Pt, PtIterable } from 'pts';
import type { Ray } from './Ray';
import type { Obstacle } from './Obstacle';
import { getIntersection } from './Obstacle';

export interface World {
	add: (obstacle: Obstacle) => void;
	getObstacles: () => Obstacle[];
	traceRay: (ray: Ray) => PtIterable[];
}

export const createWorld = (): World => {
	const obstacles: Obstacle[] = [];

	const traceRay = (currentRay: Ray, lines: PtIterable[] = [], depth = 0) => {
		if (depth > 10) return lines;

		// Test collision with every obstacle
		const allCollisions: [Pt, Obstacle][] = obstacles.map((currentObstacle) => {
			const collision = getIntersection(currentObstacle, currentRay);
			return [collision, currentObstacle];
		});

		// Filter and sort collision depending on the distance to the ray origin
		const sortedCollisions = allCollisions
			.filter(([collision, obstacle]) => {
				return (
					collision &&
					// Obstacle needs material to handle the reflection
					obstacle.material &&
					// Collision can not occur where the ray starts (prevent infinite reflections)
					!collision.equals(currentRay.origin)
				);
			})
			.sort(
				(a, b) =>
					a[0].$subtract(currentRay.origin).magnitudeSq() -
					b[0].$subtract(currentRay.origin).magnitudeSq()
			);

		// Exit if no collision is found
		if (sortedCollisions.length === 0) return lines;

		const [collision, obstacle] = sortedCollisions[0];

		// Get new rays resulting of the collision
		const newRays = obstacle.material.handleCollision(currentRay, obstacle, collision);

		// Trace new rays
		return newRays
			.map((ray) => {
				return traceRay(ray, [...lines, [currentRay.origin, collision]], depth + 1);
			})
			.flat();
	};

	return {
		add: (obstacle) => {
			obstacles.push(obstacle);
		},
		getObstacles: () => obstacles,
		traceRay
	};
};