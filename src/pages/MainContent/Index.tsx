import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import styles from "./MoviesContent.module.scss";
import type { MovieType } from "../../types/movies";
import {
	API_URL_FOR_PAGE,
	PAGE_URL_TITLE_MAP,
} from "../../constants/constants";
import { useLocation } from "react-router";
import { useData, useInfiniteData } from "../../lib/useData";
import Button from "../../components/Button";
import TopLoader from "../../shared/TopLoader";
import { useGlobalState, useUIState } from "../../store/store";
import type { CountriesType } from "../../types/filters";
import type { SxProps, Theme } from "@mui/material";
import dayjs from "dayjs";

const AllFiltersComponent = lazy(() => import("./Filters/AllFiltersComponent"));
const MoviesContainer = lazy(() => import("./MoviesContainer/Movies"));

const SEARCH_BUTTON_SX: SxProps<Theme> = {
	backgroundColor: "#02B4E4",
	fontSize: "1.2rem",
	lineHeight: "1rem",
	fontWeight: 600,
	height: "44px",
	marginTop: "20px",
	borderRadius: "20px",
	color: "#fff",
	"&:hover": {
		backgroundColor: "#032541",
		color: "#ADB6BF",
	},
};

const LOAD_MORE_BUTTON_SX: SxProps<Theme> = {
	backgroundColor: "#02B4E4",
	fontSize: "1.5rem",
	fontWeight: 700,
	lineHeight: "2.25rem",
	height: "50px",
	marginTop: "50px",
	boxShadow: "none",
	":hover": {
		color: "rgba(10, 21, 38, 0.7)",
		boxShadow: "none",
	},
};

const STICKY_SEARCH_BUTTON_SX: SxProps<Theme> = {
	position: "sticky",
	bottom: 0,
	backgroundColor: "#02B4E4",
	fontSize: "1.2rem",
	lineHeight: "1rem",
	fontWeight: 600,
	height: "50px",
	borderRadius: "0px",
	zIndex: 1500,
	"&:hover": {
		backgroundColor: "#032541",
		color: "#ADB6BF",
	},
};

const MoviesContent = () => {
	const { state, dispatch } = useGlobalState();
	const { isDrawerOpen, toggleDrawer } = useUIState();
	const { appliedFilters, isDirty, isFiltered } = state;

	const [isSearchButtonVisible, setIsSearchButtonVisible] =
		useState<boolean>(true);
	const [openMenus, setOpenMenus] = useState<string[]>([]);
	const [hasInitiatedLoadMore, setHasInitiatedLoadMore] =
		useState<boolean>(false);

	const filterContainerRef = useRef<HTMLDivElement>(null);
	const loadMoreSentinelRef = useRef<HTMLDivElement>(null);

	const pageURL = useLocation().pathname;

	const endpoint = isFiltered
		? `/discover/${API_URL_FOR_PAGE[pageURL].includes("movie") ? "movie" : "tv"}`
		: `/${API_URL_FOR_PAGE[pageURL]}`;

	const { data, fetchNextPage, isLoading, isFetchingNextPage, hasNextPage } =
		useInfiniteData<MovieType>({
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

	const { data: countriesData } = useData<Array<CountriesType>>({
		queryKey: ["countries"],
		url: "/configuration/countries",
		params: {},
	});

	const headerTitle = useMemo(
		() => PAGE_URL_TITLE_MAP[pageURL] || "Movies",
		[pageURL],
	);

	const allResults = useMemo(
		() => data?.pages?.flatMap((page) => page.results) ?? [],
		[data?.pages],
	);

	const isSinglePage = data?.pages?.[0]?.total_pages === 1;
	const showLoadMore = !isSinglePage && allResults.length > 0 && hasNextPage;

	const toggleMenu = (menuName: string) => {
		setOpenMenus((prev) =>
			prev.includes(menuName)
				? prev.filter((item) => item !== menuName)
				: [...prev, menuName],
		);
	};

	useEffect(() => {
		if (!hasInitiatedLoadMore) return;
		const sentinel = loadMoreSentinelRef.current;
		if (!sentinel || !hasNextPage || isFetchingNextPage) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ rootMargin: "100px" },
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage, hasInitiatedLoadMore]);

	useEffect(() => {
		let frameId: number | null = null;

		const handleScroll = () => {
			if (frameId !== null) return;
			frameId = requestAnimationFrame(() => {
				const containerHeight = filterContainerRef.current?.offsetHeight ?? 0;
				setIsSearchButtonVisible(
					containerHeight > window.scrollY + window.innerHeight - 147,
				);
				frameId = null;
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (frameId !== null) cancelAnimationFrame(frameId);
		};
	}, []);

	useEffect(() => {
		setHasInitiatedLoadMore(false);
	}, [appliedFilters, pageURL]);

	useEffect(() => {
		if (!isDrawerOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") toggleDrawer();
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isDrawerOpen, toggleDrawer]);

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
									<AllFiltersComponent countriesData={countriesData || []} />
								</Suspense>
							</div>
							<Button
								sx={SEARCH_BUTTON_SX}
								onClick={() => dispatch({ type: "APPLY_FILTERS" })}
								disabled={!isDirty}
							>
								Search
							</Button>
						</div>
						<div>
							<Suspense fallback={<TopLoader />}>
								<MoviesContainer
									movies={allResults}
									isLoading={isLoading || isFetchingNextPage}
								/>
							</Suspense>
							{showLoadMore && (
								<>
									{hasInitiatedLoadMore && (
										<div ref={loadMoreSentinelRef} aria-hidden='true' />
									)}
									{!hasInitiatedLoadMore && (
										<Button
											sx={LOAD_MORE_BUTTON_SX}
											onClick={() => {
												setHasInitiatedLoadMore(true);
												fetchNextPage();
											}}
										>
											Load More
										</Button>
									)}
								</>
							)}
						</div>
					</div>
				</div>
				<div
					className={`${styles.drawer} ${isDrawerOpen ? styles.show : ""}`}
					role='dialog'
					aria-modal='true'
					aria-label='Mobile navigation menu'
					aria-hidden={!isDrawerOpen}
					tabIndex={-1}
				>
					<ul className={styles.drawerList}>
						<li
							className={styles.drawerListItem}
							onClick={() => toggleMenu("movies")}
						>
							<button
								type='button'
								className={styles.drawerListItemTitle}
								aria-expanded={openMenus.includes("movies")}
							>
								Movies
							</button>
							{openMenus.includes("movies") && (
								<ul className={styles.listMenu}>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>Popular</a>
									</li>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>Top Rated</a>
									</li>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>Upcoming</a>
									</li>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>Now Playing</a>
									</li>
								</ul>
							)}
						</li>
						<li
							className={styles.drawerListItem}
							onClick={() => toggleMenu("tvShows")}
						>
							<button
								type='button'
								className={styles.drawerListItemTitle}
								aria-expanded={openMenus.includes("tvShows")}
							>
								TV Shows
							</button>
							{openMenus.includes("tvShows") && (
								<ul className={styles.listMenu}>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>Popular</a>
									</li>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>Top Rated</a>
									</li>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>On TV</a>
									</li>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>Airing Today</a>
									</li>
								</ul>
							)}
						</li>
						<li
							className={styles.drawerListItem}
							onClick={() => toggleMenu("people")}
						>
							<button
								type='button'
								className={styles.drawerListItemTitle}
								aria-expanded={openMenus.includes("people")}
							>
								People
							</button>
							{openMenus.includes("people") && (
								<ul className={styles.listMenu}>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>Popular</a>
									</li>
								</ul>
							)}
						</li>
						<li
							className={styles.drawerListItem}
							onClick={() => toggleMenu("awards")}
						>
							<button
								type='button'
								className={styles.drawerListItemTitle}
								aria-expanded={openMenus.includes("awards")}
							>
								Awards
							</button>
							{openMenus.includes("awards") && (
								<ul className={styles.listMenu}>
									<li className={styles.listMenuItem}>
										<a className={styles.listMenuItemTitle}>Popular</a>
									</li>
									<li
										className={`${styles.listMenuItem} ${styles.upcomingMenuItem}`}
									>
										<a className={styles.listMenuItemTitle}>Upcoming</a>
									</li>
								</ul>
							)}
						</li>
					</ul>
					<ul className={styles.drawerSubList}>
						{[
							{ label: "Contribution Bible", href: "#" },
							{ label: "Discussions", href: "#" },
							{ label: "Leaderboard", href: "#" },
							{ label: "API", href: "#" },
							{ label: "Support", href: "#" },
							{ label: "About", href: "#" },
							{ label: "Login", href: "/login", isLogin: true },
						].map((item) => (
							<li
								key={item.label}
								className={`${styles.drawerListSubItem} ${
									item.isLogin ? styles.loginSubItem : ""
								}`}
							>
								<a href={item.href}>{item.label}</a>
							</li>
						))}
					</ul>
				</div>
			</main>
			{isDirty && isSearchButtonVisible && (
				<Button
					sx={STICKY_SEARCH_BUTTON_SX}
					onClick={() => dispatch({ type: "APPLY_FILTERS" })}
					disabled={!isDirty}
				>
					Search
				</Button>
			)}
		</>
	);
};

export default MoviesContent;
