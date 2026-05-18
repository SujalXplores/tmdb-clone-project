import { useCallback, useEffect, useRef, useState } from "react";
import type {
	UseInfiniteScrollOptions,
	UseInfiniteScrollReturn,
} from "../types/movies";

export const useInfiniteScroll = ({
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	rootMargin = "100px",
}: UseInfiniteScrollOptions): UseInfiniteScrollReturn => {
	const sentinelRef = useRef<HTMLDivElement>(null);
	const [hasInitiated, setHasInitiated] = useState<boolean>(false);

	useEffect(() => {
		if (!hasInitiated) return;
		const sentinel = sentinelRef.current;
		if (!sentinel || !hasNextPage || isFetchingNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ rootMargin },
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		hasInitiated,
		rootMargin,
	]);

	const initiate = useCallback(() => setHasInitiated(true), []);
	const reset = useCallback(() => setHasInitiated(false), []);

	return { sentinelRef, hasInitiated, initiate, reset };
};
