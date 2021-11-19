import type { PtIterable } from 'pts';
import type { IntersectionReturn, Obstacle } from '$types/Obstacle';
import type { World } from '$types/World';
import type { Ray } from '$types/Ray';
import { MAX_TRACE_DEPTH } from './const';
import { fDistance } from './geometry';
import { rayToPts } from './ray';

export const createWorld = (): World => {
	const obstacles: Obstacle[] = [];

	const traceRay = (currentRay: Ray, lines: PtIterable[] = [], depth = 0) => {
		if (depth >= MAX_TRACE_DEPTH) return lines;

		// Test collision with every obstacle
		const rawCollisions: [IntersectionReturn, Obstacle][] = obstacles.map((currentObstacle) => [
			currentObstacle.getRayIntersections(rayToPts(currentRay)),
			currentObstacle
		]);
		const allCollisions: (IntersectionReturn[0] & { obstacle: Obstacle })[] = rawCollisions
			.filter(([collisions]) => collisions.length > 0)
			.flatMap(([intersectionReturns, obstacle]) =>
				intersectionReturns.map((c) => ({ ...c, obstacle }))
			);

		// Filter and sort collision depending on the distance to the ray origin
		const sortedCollisions = allCollisions
			.filter(({ intersection, obstacle }) => {
				return (
					intersection &&
					// Obstacle needs material to handle the reflection
					obstacle.material &&
					// Collision can not occur where the ray starts (prevent infinite reflections)
					fDistance(intersection, currentRay.origin) > 1
				);
			})
			.sort(
				({ intersection: a }, { intersection: b }) =>
					fDistance(a, currentRay.origin) - fDistance(b, currentRay.origin)
			);

		// Exit if no collision is found
		if (sortedCollisions.length === 0) return [...lines, rayToPts(currentRay)];

		const { intersection, collider, obstacle } = sortedCollisions[0];

		// Get new rays resulting of the collision
		const newRays = obstacle.material.handleCollision(intersection, collider, currentRay, obstacle);

		// Trace new rays
		return newRays
			.map((ray) => {
				return traceRay(ray, [...lines, [currentRay.origin, intersection]], depth + 1);
			})
			.flat();
	};

	return {
		add: (obstacle) => {
			obstacles.push(obstacle);
		},
		traceRay,
		draw: (f) => obstacles.forEach((o) => o.draw(f))
	};
};
