import type { IntersectionReturn, Obstacle } from '$types/Obstacle';
import type { Ray } from '$types/Ray';
import type { TraceEnvironment } from '$types/TraceEnvironment';
import type { Pt, PtIterable } from 'pts';
import { MAX_TRACE_DEPTH } from './const';
import { fDistance } from './math';
import { rayToPts } from './ray';

/** Create a environment of obstacles to trace rays in */
export const createTraceEnvironment = (obstacles: Obstacle[]): TraceEnvironment => {
	const calculateTraceLines = (
		currentRay: Ray,
		lines: PtIterable[],
		depth: number
	): PtIterable[] => {
		// Prevent infinite reflections
		if (depth >= MAX_TRACE_DEPTH) return lines;

		// Get all collisions
		const allCollisions = getAllCollisions(currentRay, obstacles);

		// Get best collision
		const collision = getFirstCollision(allCollisions, currentRay.origin);

		// Return the lines and the current ray if not collision is found
		if (!collision) return [...lines, rayToPts(currentRay)];

		const { intersection, collider, obstacle } = collision;

		// Get new rays resulting of the collision
		const newRays = obstacle.material.handleCollision(intersection, collider, currentRay, obstacle);

		// Trace new rays
		return newRays
			.map((ray) => {
				return calculateTraceLines(ray, [...lines, [currentRay.origin, intersection]], depth + 1);
			})
			.flat();
	};

	return (startRays) => {
		return startRays.flatMap((startRay) => calculateTraceLines(startRay, [], 0));
	};
};

type Collision = Readonly<IntersectionReturn[0] & { obstacle: Obstacle }>;

/** Get all collisions of the ray with all objects */
const getAllCollisions = (ray: Ray, obstacles: Obstacle[]): Readonly<Collision[]> => {
	const rayPts = rayToPts(ray);

	// Get all raw collisions
	const allCollisions: Readonly<[IntersectionReturn, Obstacle][]> = obstacles.map(
		(currentObstacle) => [currentObstacle.getRayIntersections(rayPts), currentObstacle]
	);

	// Transform collisions into an practical format
	return allCollisions
		.filter(([collisions]) => collisions.length > 0)
		.flatMap(([intersectionReturns, obstacle]) =>
			intersectionReturns.map((c) => ({ ...c, obstacle }))
		);
};

/** Filter the collisions and get the closest real collision */
const getFirstCollision = (
	collisions: Readonly<Collision[]>,
	rayOrigin: Pt
): Readonly<Collision> => {
	const sortedCollisions = collisions
		.filter(({ intersection, obstacle }) => {
			return (
				intersection &&
				// Obstacle needs material to handle the reflection
				obstacle.material &&
				// Collision can not occur where the ray starts (prevent infinite reflections)
				fDistance(intersection, rayOrigin) > 1
			);
		})
		.sort(
			({ intersection: a }, { intersection: b }) =>
				fDistance(a, rayOrigin) - fDistance(b, rayOrigin)
		);
	return sortedCollisions[0];
};
