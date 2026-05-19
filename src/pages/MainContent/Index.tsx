import { lazy, Suspense, useMemo, useRef } from "react";
import { useLocation } from "react-router";
import styles from "./MoviesContent.module.scss";
import TopLoader from "@/shared/TopLoader";
import { useGlobalState, useUIState } from "@/store/store";
import {
	LOAD_MORE_BUTTON_SX,
	PAGE_URL_TITLE_MAP,
	SEARCH_BUTTON_SX,
	STICKY_BUTTON_OFFSET,
	STICKY_SEARCH_BUTTON_SX,
} from "@/constants/constants";
import Button from "@/components/Button";
import { useMoviesData } from "@/hooks/useMoviesData";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useStickyButton } from "@/hooks/useStickyButton";
import SearchButton from "./SearchButton";
import MobileDrawer from "./MobileDrawer";

const AllFiltersComponent = lazy(() => import("./Filters/AllFiltersComponent"));
const MoviesContainer = lazy(() => import("./MoviesContainer/Movies"));

const MoviesContent = () => {
	const { state, dispatch } = useGlobalState();
	const { isDrawerOpen, toggleDrawer } = useUIState();
	const { isDirty } = state;

	const pageURL = useLocation().pathname;
	const filterContainerRef = useRef<HTMLDivElement>(null);

	const {
		movies,
		countriesData,
		isLoading,
		isFetchingNextPage,
		hasNextPage,
		fetchNextPage,
		isSinglePage,
	} = useMoviesData(pageURL);

	const { sentinelRef, hasInitiated, initiate } = useInfiniteScroll({
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
	});

	const isStickyButtonVisible = useStickyButton({
		containerRef: filterContainerRef,
		bottomOffset: STICKY_BUTTON_OFFSET,
	});

	const headerTitle = useMemo(
		() => PAGE_URL_TITLE_MAP[pageURL] || "Movies",
		[pageURL],
	);

	const showLoadMore = !isSinglePage && movies.length > 0 && hasNextPage;
	const applyFilters = () => dispatch({ type: "APPLY_FILTERS" });

	return (
		<>
			{(isLoading || isFetchingNextPage) && <TopLoader />}
			<main className={styles.moviesContent}>
				<div className={styles.container}>
					<h3 className={styles.heading}>{headerTitle}</h3>
					<div className={styles.mainContent}>
						<div>
							<div className={styles.filtersContainer} ref={filterContainerRef}>
								<Suspense fallback={<TopLoader />}>
									<AllFiltersComponent countriesData={countriesData} />
								</Suspense>
							</div>
							<SearchButton
								sx={SEARCH_BUTTON_SX}
								onClick={applyFilters}
								disabled={!isDirty}
							/>
						</div>
						<div>
							<Suspense fallback={<TopLoader />}>
								<MoviesContainer movies={movies} isLoading={isLoading} />
							</Suspense>
							{showLoadMore &&
								(hasInitiated ? (
									<>
										<div ref={sentinelRef} aria-hidden='true' />
										<Button
											sx={LOAD_MORE_BUTTON_SX}
											onClick={() => {
												initiate();
												void fetchNextPage();
											}}
										>
											Load More
										</Button>
									</>
								) : (
									<Button
										sx={LOAD_MORE_BUTTON_SX}
										onClick={() => {
											initiate();
											void fetchNextPage();
										}}
									>
										Load More
									</Button>
								))}
						</div>
					</div>
				</div>
				<MobileDrawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
			</main>
			{isDirty && isStickyButtonVisible && (
				<SearchButton
					sx={STICKY_SEARCH_BUTTON_SX}
					onClick={applyFilters}
					disabled={!isDirty}
				/>
			)}
		</>
	);
};

export default MoviesContent;
