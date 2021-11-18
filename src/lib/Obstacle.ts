import { Circle, Line, Pt } from 'pts';
import { MAX_TRACE_LENGTH } from './const';
import type { LinearFunction } from './geometry';
import type { Material } from './Material';
import type { Ray } from './Ray';

export type Obstacle = CircleObstacle | LineObstacle | CurveObstacle;

export interface BaseObstacle {
	type: 'circle' | 'line' | 'curve';
	material?: Material;
}

export interface CircleObstacle extends BaseObstacle {
	type: 'circle';
	center: Pt;
	radius: number;
}

export interface LineObstacle extends BaseObstacle {
	type: 'line';
	start: Pt;
	end: Pt;
}

export interface CurveObstacle extends BaseObstacle {
	type: 'curve';
	start: Pt;
	f: LinearFunction;
	scale: number;
}

export const getIntersection = (obstacle: Obstacle, ray: Ray): Pt => {
	const { type } = obstacle;
	const rayPts = Line.fromAngle(ray.origin, ray.angle, MAX_TRACE_LENGTH);

	if (type === 'circle')
		return Circle.intersectLine2D(Circle.fromCenter(obstacle.center, obstacle.radius), rayPts)[1];

	if (type === 'line') return Line.intersectLine2D([obstacle.start, obstacle.end], rayPts);
};
