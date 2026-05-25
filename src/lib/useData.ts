import {
	useInfiniteQuery,
	useQuery,
	type InfiniteData,
} from "@tanstack/react-query";
import { fetchData } from "./apiFn";
import type {
	ApiResponse,
	APIResponseError,
	UseAppInfiniteQueryProps,
	UseAppQueryProps,
} from "../types/common";

export const useData = <T>({
	queryKey,
	url,
	params,
	options,
}: UseAppQueryProps<T>) => {
	return useQuery<T, APIResponseError>({
		queryKey: [...queryKey, url, params],
		queryFn: async () => {
			const response = await fetchData<T>({ url, params });
			return response;
		},
		...options,
	});
};

export const useInfiniteData = <T>({
	queryKey,
	url,
	params,
	options,
}: UseAppInfiniteQueryProps<T>) => {
	return useInfiniteQuery<
		ApiResponse<T>,
		APIResponseError,
		InfiniteData<ApiResponse<T>, number>,
		readonly unknown[],
		number
	>({
		queryKey: [...queryKey, url, params],
		initialPageParam: 1,
		queryFn: async ({ pageParam }: { pageParam: number }) => {
			const response = await fetchData<ApiResponse<T>>({
				url,
				params: {
					...params,
					page: pageParam,
				},
			});
			return response;
		},
		...options,
		getNextPageParam: (lastPage) => {
			return lastPage.page < lastPage.total_pages
				? lastPage.page + 1
				: undefined;
		},
	});
};
