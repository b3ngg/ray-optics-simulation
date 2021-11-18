import type { Ray } from '$types/Ray';
import type { PtIterable } from 'pts';
import { Line } from 'pts';
import { MAX_TRACE_LENGTH } from './const';

export const rayToPts = (ray: Ray): PtIterable =>
	Line.fromAngle(ray.origin, ray.angle, MAX_TRACE_LENGTH);
