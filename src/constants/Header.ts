import type { MenuItem, MenuKey } from "../types/header";

export const ASSET_URLS = {
	addIcon:
		"https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-371-plus-white-0bac34f16124808a12ea863b4d9cc6e599dee7c0a80658cfe9ead26939e64517.svg",
	searchIcon:
		"https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-28-search-blue-177462d06db81ff2a02aa022c1c0be5ba4200d7bd3f51091ed9298980e3a26a1.svg",
	menuIcon:
		"https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-600-menu-7ef6e3f4266b4b216a8ef5920da43fc8c96e1ee805a219c5628fed5bfac854d5.svg",
	userIcon:
		"https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-7de7dfcae838579a18f4eebc5b8847230d154718e481c5cd01c477cfcbc85993.svg",
	logoSquare:
		"https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg",
} as const;

export const NAV_MENUS: Array<{
	key: MenuKey;
	label: string;
	items: MenuItem[];
}> = [
	{
		key: "movies",
		label: "Movies",
		items: [
			{ name: "Popular", url: "/movie" },
			{ name: "Now Playing", url: "/movie/now-playing" },
			{ name: "Upcoming", url: "/movie/upcoming" },
			{ name: "Top Rated", url: "/movie/top-rated" },
		],
	},
	{
		key: "tv",
		label: "TV Shows",
		items: [
			{ name: "Popular", url: "/tv" },
			{ name: "Airing Today", url: "/tv/airing-today" },
			{ name: "On TV", url: "/tv/on-the-air" },
			{ name: "Top Rated", url: "/tv/top-rated" },
		],
	},
	{
		key: "people",
		label: "People",
		items: [{ name: "Popular", url: null }],
	},
	{
		key: "awards",
		label: "Awards",
		items: [
			{ name: "Popular", url: null },
			{ name: "Upcoming", url: null },
		],
	},
	{
		key: "more",
		label: "More",
		items: [
			{ name: "Discussion", url: null },
			{ name: "Leaderboard", url: null },
			{ name: "Support", url: null },
			{ name: "API Documentation", url: null },
			{ name: "API for Business", url: null },
		],
	},
];

export const POPOVER_CLOSE_DELAY_MS = 200;
export const SCROLL_HIDE_THRESHOLD = 100;
