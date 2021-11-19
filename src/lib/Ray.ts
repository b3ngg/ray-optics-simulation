import type { Ray } from '$types/Ray';
import type { Pt, PtIterable } from 'pts';
import { Line } from 'pts';
import { MAX_TRACE_LENGTH } from './const';

/** Shortcut for creating a ray */
export const createRay = (origin: Pt, angle: number): Ray => ({ origin, angle });

/** Converts a ray to a line with start and end points */
export const rayToPts = (ray: Ray): PtIterable =>
	Line.fromAngle(ray.origin, ray.angle, MAX_TRACE_LENGTH);
