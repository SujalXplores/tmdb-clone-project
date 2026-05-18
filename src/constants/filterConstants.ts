import {
	type DiscoverFiltersType,
} from "./../types/filters";

import type { SxProps, Theme } from "@mui/material";
import type { SystemStyleObject } from "@mui/system";

export const SORTING_PAYLOAD_KEYS = {
	POPULARITY_DESC: "popularity.desc",
	POPULARITY_ASC: "popularity.asc",
	RATING_DESC: "vote_average.desc",
	RATING_ASC: "vote_average.asc",
	RELEASE_DATE_DESC: "primary_release_date.desc",
	RELEASE_DATE_ASC: "primary_release_date.asc",
	TITLE_ASC: "title.asc",
	TITLE_DESC: "title.desc",
	ORIGINAL_TITLE_DESC: "original_title.desc",
	ORIGINAL_TITLE_ASC: "original_title.asc",
	REVENUE_DESC: "revenue.desc",
	REVENUE_ASC: "revenue.asc",
	VOTE_COUNT_DESC: "vote_count.desc",
	VOTE_COUNT_ASC: "vote_count.asc",
} as const;

export const SORT_BY_OPTIONS = [
	{
		label: "Popularity Descending",
		value: SORTING_PAYLOAD_KEYS.POPULARITY_DESC,
	},
	{
		label: "Popularity Ascending",
		value: SORTING_PAYLOAD_KEYS.POPULARITY_ASC,
	},
	{
		label: "Rating Descending",
		value: SORTING_PAYLOAD_KEYS.RATING_DESC,
	},
	{
		label: "Rating Ascending",
		value: SORTING_PAYLOAD_KEYS.RATING_ASC,
	},
	{
		label: "Release Date Descending",
		value: SORTING_PAYLOAD_KEYS.RELEASE_DATE_DESC,
	},
	{
		label: "Release Date Ascending",
		value: SORTING_PAYLOAD_KEYS.RELEASE_DATE_ASC,
	},
	{
		label: "Title (A-Z)",
		value: SORTING_PAYLOAD_KEYS.TITLE_ASC,
	},
	{
		label: "Title (Z-A)",
		value: SORTING_PAYLOAD_KEYS.TITLE_DESC,
	},
];

export const FILTERS_INITIAL_STATE: DiscoverFiltersType = {
	"air_date.gte": null,
	"air_date.lte": null,
	certification: null,
	certification_country: null,
	debug: null,
	"first_air_date.gte": null,
	"first_air_date.lte": null,
	include_adult: false,
	include_softcore: false,
	"latest_ceremony.gte": null,
	"latest_ceremony.lte": null,
	page: 1,
	"primary_release_date.gte": null,
	"primary_release_date.lte": null,
	region: null,
	"release_date.gte": null,
	"release_date.lte": null,
	show_me: "everything",
	sort_by: SORTING_PAYLOAD_KEYS.POPULARITY_DESC,
	"vote_average.gte": 0,
	"vote_average.lte": 10,
	"vote_count.gte": 0,
	watch_region: "IN",
	with_genres: null,
	with_keywords: null,
	with_networks: null,
	with_origin_country: null,
	with_original_language: null,
	with_watch_monetization_types: null,
	with_watch_providers: null,
	with_release_type: null,
	"with_runtime.gte": 0,
	"with_runtime.lte": 400,
};

export const withMenuProps = (
	overrides: SystemStyleObject<Theme> = {},
): { sx: SxProps<Theme> } => ({
	sx: {
		...(MENU_PAPER_PROPS.sx as SystemStyleObject<Theme>),
		...overrides,
	},
});

export const MENU_PAPER_PROPS = {
	sx: {
		marginTop: "0.25rem",
		paddingTop: ".5rem",
		width: "378.641px",
		minWidth: "226px",
		height: "268px",
		display: "flex",
		flexDirection: "column",
		overflow: "hidden",
		"& .MuiList-root": {
			paddingTop: 0,
			paddingBottom: 0,
			display: "flex",
			flexDirection: "column",
			height: "100%",
		},
		border: ".8px solid #21252933",
		borderRadius: "0.375rem",
		boxShadow: "0px 6px 13px rgba(0, 0, 0, 0.125)",
	},
};

export const SELECT_STYLES = {
	borderRadius: "0.375rem",
	"& .MuiSelect-select": {
		padding: "8.5px 14px",
		fontSize: "14px",
	},
	"& .MuiOutlinedInput-root": {
		borderRadius: "0.375rem",
		fontSize: "14px",
	},
	"&:hover": {
		backgroundColor: "#F8F9FA",
		borderRadius: "0.375rem",
	},
	"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "#01b3e460 !important",
	},
	"& .MuiAutocomplete-input": {
		cursor: "pointer",
	},
	"& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
		minHeight: "38px",
	},
	"&:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "#D3D3D4 !important",
	},
	"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "#01b3e460 !important",
	},
	"& .MuiOutlinedInput-notchedOutline": {
		borderWidth: "1px !important",
	},
	"& .MuiSelect-icon": {
		transform: "none !important",
		pointerEvents: "none",
	},
};

export const SEARCH_FIELD_STYLES: SxProps<Theme> = {
	"& .MuiSelect-select": {
		padding: "8.5px 14px",
		fontSize: "14px",
	},
	"& .MuiOutlinedInput-root": {
		borderRadius: "0.375rem",
		fontSize: "14px",
	},
	"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "#01b3e460 !important",
	},
	"& .MuiAutocomplete-input": {
		cursor: "pointer",
	},
	"& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
		minHeight: "38px",
	},
	"& .MuiOutlinedInput-notchedOutline": {
		border: "0.8px solid #01b3e460 !important",
		borderRadius: "0.375rem",
	},
};
