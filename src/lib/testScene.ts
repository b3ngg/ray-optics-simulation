import type { Scene } from '$types/scene';

/**
 * Placeholder scene
 */
export const testScene: Scene = (space) => {
	const form = space.getForm();
	space.add({
		animate: () => {
			form.fill('#fff').point(space.pointer, 10, 'circle');
		}
	});

	space.bindMouse().bindTouch().play();
};
