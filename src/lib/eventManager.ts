import type { EventManager } from '$types/EventManager';

export const createEventManager = (): EventManager => {
	const callbacks = new Map<string, Set<(data: unknown) => void>>();

	return {
		on: (id, cb) => {
			if (callbacks.has(id)) {
				const callbackSet = callbacks.get(id);
				callbackSet.add(cb);
				return;
			}

			callbacks.set(id, new Set([cb]));
		},
		trigger: (id, data) => {
			const callbackSet = callbacks.get(id);
			if (!callbackSet) return;
			[...callbackSet.values()].forEach((cb) => cb(data));
		}
	};
};

export const events = createEventManager();
