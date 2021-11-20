import type { CanvasSpace } from 'pts';

/** A scene constructs and renders a different scenario */
export type Scene = (space: CanvasSpace) => void;
