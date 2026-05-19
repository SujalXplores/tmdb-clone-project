import { useMemo } from "react";
import dayjs from "dayjs";
import { useData, useInfiniteData } from "../lib/useData";
import { API_URL_FOR_PAGE } from "../constants/constants";
import { useGlobalState } from "../store/store";
import type { MovieType } from "../types/movies";
import type { CountriesType } from "../types/filters";

export const useMoviesData = (pageURL: string) => {
	const { state } = useGlobalState();
	const { appliedFilters, isFiltered } = state;

	const mappedPage = API_URL_FOR_PAGE[pageURL];
	if (!mappedPage) {
		throw new Error(`Unknown pageURL: ${pageURL}`);
	}

	const endpoint = isFiltered
		? `/discover/${mappedPage.includes("movie") ? "movie" : "tv"}`
		: `/${mappedPage}`;

	const infiniteQuery = useInfiniteData<MovieType>({
		queryKey: ["movies&tv", endpoint, appliedFilters, pageURL],
		url: endpoint,
		params: isFiltered
			? { ...appliedFilters, language: "en-US" }
			: {
					language: "en-US",
					include_adult: false,
					include_softcore: false,
					"release_date.lte": dayjs().format("YYYY-MM-DD"),
				},
	});

	const countriesQuery = useData<Array<CountriesType>>({
		queryKey: ["countries"],
		url: "/configuration/countries",
		params: {},
	});

	const allResults = useMemo(
		() => infiniteQuery.data?.pages?.flatMap((page) => page.results) ?? [],
		[infiniteQuery.data?.pages],
	);

	const isSinglePage = infiniteQuery.data?.pages?.[0]?.total_pages === 1;

	return {
		movies: allResults,
		countriesData: countriesQuery.data ?? [],
		isLoading: infiniteQuery.isLoading,
		isFetchingNextPage: infiniteQuery.isFetchingNextPage,
		hasNextPage: infiniteQuery.hasNextPage,
		fetchNextPage: infiniteQuery.fetchNextPage,
		isSinglePage,
	};
};
