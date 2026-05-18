import type { RefObject } from "react";

export interface MovieResponseType {
	page: number;
	results: Array<MovieType>;
	total_pages: number;
	total_results: number;
}

export interface MovieType {
	adult: boolean;
	backdrop_path: string;
	genre_ids: Array<number>;
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface UseInfiniteScrollOptions {
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	rootMargin?: string;
}

export interface UseInfiniteScrollReturn {
	sentinelRef: RefObject<HTMLDivElement | null>;
	hasInitiated: boolean;
	initiate: () => void;
	reset: () => void;
}
