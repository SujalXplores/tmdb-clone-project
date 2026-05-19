import { useEffect, useRef, useState } from "react";

interface UseDebouncedSearchOptions {
	delay?: number;
	threshold?: number;
}

export const useDebouncedSearch = (
	value: string,
	{ delay = 500, threshold = 2 }: UseDebouncedSearchOptions = {},
) => {
	const [debouncedValue, setDebouncedValue] = useState<string>("");
	const hasCrossedThreshold = useRef<boolean>(false);

	useEffect(() => {
		const timerId = setTimeout(() => {
			const currentLength = value.trim().length;

			if (currentLength === 0) {
				hasCrossedThreshold.current = false;
				setDebouncedValue("");
				return;
			}

			if (currentLength >= threshold) {
				hasCrossedThreshold.current = true;
			}

			if (hasCrossedThreshold.current) {
				setDebouncedValue(value.trim());
			}
		}, delay);

		return () => clearTimeout(timerId);
	}, [value, delay, threshold]);

	const reset = () => {
		hasCrossedThreshold.current = false;
		setDebouncedValue("");
	};

	return { debouncedValue, reset };
};
