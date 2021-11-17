import type { LineObstacle, Obstacle } from './Obstacle';
import type { Ray } from './Ray';
import { Pt, Vec } from 'pts';
import { events } from './EventManager';

export interface Material {
	handleCollision: (incomingRay: Ray, obstacle: Obstacle, intersection: Pt) => Ray[];
}

const reflectRayOnLine = (incidentRay: Ray, line: LineObstacle, collisionPoint: Pt): Ray => {
	const d = incidentRay.direction.$subtract(incidentRay.origin).$unit();
	const normalAngle = line.start.$subtract(line.end).angle() + Math.PI / 2;
	const lineNormal = new Pt(0, 1).toAngle(normalAngle).$unit();

	events.trigger('angle', normalAngle);

	// TODO: Assure the ray reflects on the right side
	const perpendicular = 2 * Vec.dot(d, lineNormal);
	const reflection = Vec.subtract(d, Vec.multiply(lineNormal, perpendicular));
	const r = new Pt(reflection);

	return { origin: collisionPoint, direction: collisionPoint.$add(r) };
};

export const mirror: Material = {
	handleCollision: (incidentRay, obstacle, collisionPoint) => {
		if (obstacle.type === 'line') {
			return [reflectRayOnLine(incidentRay, obstacle, collisionPoint)];
		}

		// if (o.type === 'circle') {
		// 	const perpendicularAngle = is.$subtract(o.center).angle();
		// 	const direction = new Pt(0, 1).toAngle(perpendicularAngle);
		// 	return [{ origin: is, direction: direction.$unit() }];
		// }

		return [];
	}
};
