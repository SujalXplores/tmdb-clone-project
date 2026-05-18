import type { SxProps, Theme } from "@mui/material";

export const popperSx: SxProps<Theme> = {
	"& .MuiPaper-root": {
		paddingY: ".5rem",
		marginTop: "0.25rem",
		width: "226.4px",
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

export const listboxSx: SxProps<Theme> = {
	paddingY: 0,
	"& .MuiAutocomplete-option": {
		'&[aria-selected="true"]': {
			backgroundColor: "#01b3e4 !important",
			color: "#fff",
			"&:hover": {
				backgroundColor: "#032541 !important",
			},
		},
		"&:hover": {
			backgroundColor: "#DDE2E6 !important",
		},
	},
};

export const chipSx: SxProps<Theme> = {
	background: "#e9ecef",
	borderWidth: ".8px",
	borderColor: "#21252957",
	borderStyle: "solid",
	display: "inline-flex",
	flexFlow: "row nowrap",
	alignItems: "center",
	justifyContent: "center",
	gap: "0.25rem",
	position: "relative",
	overflow: "hidden",
	borderRadius: "0.375rem",
	cursor: "pointer",
	"& .MuiChip-label": {
		padding: ".25rem 0 .25rem .5rem",
		color: "#000",
		lineHeight: "1.25rem",
	},
	"& .MuiChip-deleteIcon": {
		color: "#000",
		width: "0.875rem",
		height: "0.875rem",
		marginLeft: "0.5rem",
	},
	"&:hover": {
		background: "#CED4DA",
	},
};

export const clearIndicatorSx: SxProps<Theme> = {
	"&:hover": {
		color: "#000",
		backgroundColor: "#fff",
	},
};

export const paperSx: SxProps<Theme> = {
	"& .MuiAutocomplete-noOptions": {
		height: "161.143px",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
};

export const popupIndicatorSx: SxProps<Theme> = {
	transition: "none",
	"&:hover": {
		backgroundColor: "transparent",
	},
};

export const getRootSx = (isSelectOnly: boolean): SxProps<Theme> => ({
	"& .MuiOutlinedInput-root": {
		borderRadius: "0.375rem",
		fontSize: "14px",
		cursor: isSelectOnly ? "pointer" : "text",
		display: "flex",
		gap: "calc(0.375rem / 2)",
		paddingRight: "0 !important",
	},
	"&:hover": {
		backgroundColor: "#f8f9fa",
		borderRadius: "0.375rem",
	},
	"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
		borderColor: "#01b3e460 !important",
	},
	"& .MuiAutocomplete-input": {
		cursor: isSelectOnly ? "pointer !important" : "inherit",
	},
	"& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
		minHeight: "38px",
	},
	"&:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "#D3D3D4 !important",
	},
	"& .MuiChip-root": {
		margin: "0",
		height: "auto",
	},
	"& .MuiAutocomplete-popupIndicatorOpen": {
		transform: "none",
	},
});

export const textFieldSx: SxProps<Theme> = {
	"& .MuiOutlinedInput-root": {
		borderRadius: "8px",
		fontSize: "14px",
		"&:hover .MuiOutlinedInput-notchedOutline": {
			borderColor: "#9e9e9e",
		},
		"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#111827",
			borderWidth: "1.5px",
		},
		"&.Mui-error .MuiOutlinedInput-notchedOutline": {
			borderColor: "#ef4444",
		},
	},
	"& .MuiInputLabel-root": {
		fontSize: "14px",
		"&.Mui-focused": { color: "#111827" },
		"&.Mui-error": { color: "#ef4444" },
	},
	"& .MuiFormHelperText-root": {
		marginLeft: 0,
		fontSize: "11px",
	},
};
