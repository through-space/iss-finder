import { useEffect, useRef, useCallback } from "react";

export function useDebouncedCallback<T extends (...args: any[]) => void>(
	callback: T,
	delay: number,
	deps: any[] = [], // 👈 support extra dependencies
): T {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Store the latest callback reference
	const callbackRef = useRef(callback);
	useEffect(() => {
		callbackRef.current = callback;
	}, [callback, ...deps]);

	// Clear timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const debouncedFn = useCallback(
		(...args: any[]) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => {
				callbackRef.current(...args);
			}, delay);
		},
		[delay],
	);

	return debouncedFn as T;
}
