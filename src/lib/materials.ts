import type { PtIterable } from 'pts';
import type { Material } from '$types/Material';
import type { Ray } from '$types/Ray';
import { Pt, Vec } from 'pts';
import { createRay } from './ray';

/** Calculate the normal point of a line */
const getLineNormal = (line: PtIterable): Pt => {
	const normalAngle = line[0].$subtract(line[1]).angle() + Math.PI / 2;
	return new Pt(0, 1).toAngle(normalAngle).$unit();
};

/** Calculate the reflected ray of an incoming ray with the angle d to a line on a point */
const getReflectedRayOnLine = (incidentRay: Ray, line: PtIterable, collisionPoint: Pt): Ray => {
	const d = new Pt(1, 0).toAngle(incidentRay.angle);
	const lineNormal = getLineNormal(line);

	const perpendicular = 2 * Vec.dot(d, lineNormal);
	const reflection = Vec.subtract(d, Vec.multiply(lineNormal, perpendicular));
	const r = new Pt(reflection);

	return createRay(collisionPoint, r.angle());
};

/** Calculates the reflected ray of an incoming ray on a circle */
const getReflectedRayOnCircle = (collisionPoint: Pt, circleCenter: Pt): Ray => {
	const perpendicularAngle = collisionPoint.$subtract(circleCenter).angle();
	return createRay(collisionPoint, perpendicularAngle);
};

/** Reflects all rays without loss or distortion  */
export const mirror: Material = {
	handleCollision: (intersection, collider, incoming, obstacle) => {
		if (obstacle.type === 'line') {
			return [getReflectedRayOnLine(incoming, collider, intersection)];
		}

		if (obstacle.type === 'circle') {
			return [getReflectedRayOnCircle(intersection, obstacle.start)];
		}

		if (obstacle.type === 'curve') {
			return [getReflectedRayOnLine(incoming, collider, intersection)];
		}

		return [];
	}
};
