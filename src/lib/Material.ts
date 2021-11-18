import type { Obstacle } from './Obstacle';
import type { Ray } from './Ray';
import { Pt, Vec } from 'pts';
import type { PtIterable } from 'pts';

export interface Material {
	handleCollision: (
		incomingRay: Ray,
		obstacle: Obstacle,
		collisionPoint: Pt,
		line?: PtIterable
	) => Ray[];
}

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
	handleCollision: (incidentRay, obstacle, collisionPoint, line) => {
		if (obstacle.type === 'line') {
			return [reflectRayOnLine(incidentRay, [obstacle.start, obstacle.end], collisionPoint)];
		}

		if (obstacle.type === 'circle') {
			const perpendicularAngle = collisionPoint.$subtract(obstacle.center).angle();
			return [{ origin: collisionPoint, angle: perpendicularAngle }];
		}

		if (obstacle.type === 'curve') {
			return [reflectRayOnLine(incidentRay, line, collisionPoint)];
		}

		return [];
	}
};
