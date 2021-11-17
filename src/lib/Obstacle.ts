import { Circle, Line, Pt } from 'pts';
import type { Material } from './Material';
import type { Ray } from './Ray';

export type Obstacle = CircleObstacle | LineObstacle;

export interface BaseObstacle {
	type: 'circle' | 'line' | 'polygon' | 'curve';
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

export const getIntersection = (obstacle: Obstacle, ray: Ray): Pt => {
	const { type } = obstacle;
	const rayPts = [ray.origin, ray.direction];

	if (type === 'circle')
		return Circle.intersectRay2D(Circle.fromCenter(obstacle.center, obstacle.radius), rayPts)[1];

	if (type === 'line') return Line.intersectLineWithRay2D([obstacle.start, obstacle.end], rayPts);
};
