import type { SxProps, Theme } from "@mui/material";

export const PAGE_URL_TITLE_MAP: Record<string, string> = {
	"/movie": "Popular Movies",
	"/movie/now-playing": "Now Playing Movies",
	"/movie/top-rated": "Top Rated Movies",
	"/movie/upcoming": "Upcoming Movies",
	"/tv": "Popular TV Shows",
	"/tv/airing-today": "TV Shows Airing Today",
	"/tv/on-the-air": "Currently Airing TV Shows",
	"/tv/top-rated": "Top Rated TV Shows",
};

export const API_URL_FOR_PAGE: Record<string, string> = {
	"/movie": "movie/popular",
	"/movie/now-playing": "movie/now_playing",
	"/movie/top-rated": "movie/top_rated",
	"/movie/upcoming": "movie/upcoming",
	"/tv": "tv/popular",
	"/tv/airing-today": "tv/airing_today",
	"/tv/on-the-air": "tv/on_the_air",
	"/tv/top-rated": "tv/top_rated",
};

export const SEARCH_BUTTON_SX: SxProps<Theme> = {
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

export const LOAD_MORE_BUTTON_SX: SxProps<Theme> = {
	backgroundColor: "#02B4E4",
	fontSize: "1.5rem",
	fontWeight: 700,
	lineHeight: "2.25rem",
	height: "50px",
	marginTop: "54px",
	boxShadow: "none",
	":hover": {
		color: "rgba(10, 21, 38, 0.7)",
		boxShadow: "none",
	},
};

export const STICKY_SEARCH_BUTTON_SX: SxProps<Theme> = {
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

export const DRAWER_SUB_LINKS: Array<{
	label: string;
	href: string;
	isLogin?: boolean;
}> = [
	{ label: "Contribution Bible", href: "#" },
	{ label: "Discussions", href: "#" },
	{ label: "Leaderboard", href: "#" },
	{ label: "API", href: "#" },
	{ label: "Support", href: "#" },
	{ label: "About", href: "#" },
	{ label: "Login", href: "/login", isLogin: true },
];

export const STICKY_BUTTON_OFFSET = 147;
