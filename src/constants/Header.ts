import type { MenuItem, MenuKey } from "../types/header";

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
export const SCROLL_HIDE_THRESHOLD = 64;
