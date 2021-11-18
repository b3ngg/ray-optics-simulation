import type { LineObstacle, Obstacle } from './Obstacle';
import type { Ray } from './Ray';
import { Pt, Vec } from 'pts';
import { events } from './EventManager';

export interface Material {
	handleCollision: (incomingRay: Ray, obstacle: Obstacle, intersection: Pt) => Ray[];
}

const reflectRayOnLine = (incidentRay: Ray, line: LineObstacle, collisionPoint: Pt): Ray => {
	const d = new Pt(1, 0).toAngle(incidentRay.angle);
	const normalAngle = line.start.$subtract(line.end).angle() + Math.PI / 2;
	const lineNormal = new Pt(0, 1).toAngle(normalAngle).$unit();

	// TODO: Assure the ray reflects on the right side
	const perpendicular = 2 * Vec.dot(d, lineNormal);
	const reflection = Vec.subtract(d, Vec.multiply(lineNormal, perpendicular));
	const r = new Pt(reflection);

	events.trigger('angle', [collisionPoint, normalAngle, r.angle()]);
	return { origin: collisionPoint, angle: r.angle() };
};

export const mirror: Material = {
	handleCollision: (incidentRay, obstacle, collisionPoint) => {
		if (obstacle.type === 'line') {
			return [reflectRayOnLine(incidentRay, obstacle, collisionPoint)];
		}

		if (obstacle.type === 'circle') {
			const perpendicularAngle = collisionPoint.$subtract(obstacle.center).angle();
			return [{ origin: collisionPoint, angle: perpendicularAngle }];
		}

		return [];
	}
};
