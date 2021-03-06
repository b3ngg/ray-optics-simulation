import type { PtIterable } from 'pts';
import type { Material } from '$types/Material';
import type { Ray } from '$types/Ray';
import { Pt, Vec } from 'pts';
import { createRay } from './ray';

/** Reflects all rays without loss or distortion  */
export const mirror: Readonly<Material> = {
	handleCollision: (intersection, collider, incoming, obstacle) => {
		if (obstacle.type === 'line') {
			return [getReflectedRayOnLine(incoming, collider, intersection)];
		}

		if (obstacle.type === 'circle') {
			return [getReflectedRayOnCircle(incoming, intersection, obstacle.start)];
		}

		if (obstacle.type === 'curve') {
			return [getReflectedRayOnLine(incoming, collider, intersection)];
		}

		return [];
	}
} as const;

/** Calculate the normal point of a line */
const getLineNormal = (line: PtIterable): Readonly<Pt> => {
	const normalAngle = line[0].$subtract(line[1]).angle() + Math.PI / 2;
	return new Pt(0, 1).toAngle(normalAngle).$unit();
};

/** Calculate the reflected ray of an incoming ray with the angle d to a line on a point */
const getReflectedRayOnLine = (
	incidentRay: Ray,
	line: PtIterable,
	collisionPoint: Pt
): Readonly<Ray> => {
	const d = new Pt(1, 0).toAngle(incidentRay.angle);
	const lineNormal = getLineNormal(line);

	const perpendicular = 2 * Vec.dot(d, lineNormal);
	const reflection = Vec.subtract(d, Vec.multiply(lineNormal, perpendicular));
	const r = new Pt(reflection);

	return createRay(collisionPoint, r.angle());
};

/** Calculates the reflected ray of an incoming ray on a circle */
const getReflectedRayOnCircle = (
	incidentRay: Ray,
	collisionPoint: Pt,
	circleCenter: Pt
): Readonly<Ray> => {
	const d = new Pt(1, 0).toAngle(incidentRay.angle);
	const circleNormal = new Pt(0, 1).toAngle(collisionPoint.$subtract(circleCenter).angle());

	const perpendicular = 2 * Vec.dot(d, circleNormal);
	const reflection = Vec.subtract(d, Vec.multiply(circleNormal, perpendicular));
	const r = new Pt(reflection);

	return createRay(collisionPoint, r.angle());
};
