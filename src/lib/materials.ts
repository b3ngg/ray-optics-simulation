import type { PtIterable } from 'pts';
import type { Material } from '$types/Material';
import type { Ray } from '$types/Ray';
import { Pt, Vec } from 'pts';

const reflectRayOnLine = (incidentRay: Ray, line: PtIterable, collisionPoint: Pt): Ray => {
	const d = new Pt(1, 0).toAngle(incidentRay.angle);
	const lineNormal = getLineNormal(line);

	const perpendicular = 2 * Vec.dot(d, lineNormal);
	const reflection = Vec.subtract(d, Vec.multiply(lineNormal, perpendicular));
	const r = new Pt(reflection);

	return { origin: collisionPoint, angle: r.angle() };
};

const getLineNormal = (line: PtIterable): Pt => {
	const normalAngle = line[0].$subtract(line[1]).angle() + Math.PI / 2;
	const lineNormal = new Pt(0, 1).toAngle(normalAngle).$unit();
	return lineNormal;
};

export const mirror: Material = {
	handleCollision: (intersection, collider, incoming, obstacle) => {
		if (obstacle.type === 'line') {
			return [reflectRayOnLine(incoming, collider, intersection)];
		}

		if (obstacle.type === 'circle') {
			const perpendicularAngle = intersection.$subtract(obstacle.start).angle();
			return [{ origin: intersection, angle: perpendicularAngle }];
		}

		if (obstacle.type === 'curve') {
			return [reflectRayOnLine(incoming, collider, intersection)];
		}

		return [];
	}
};
