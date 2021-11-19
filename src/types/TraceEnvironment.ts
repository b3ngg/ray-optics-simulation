import type { PtIterable } from 'pts';
import type { Ray } from './Ray';

export type TraceEnvironment = (startRays: Ray[]) => PtIterable[];
