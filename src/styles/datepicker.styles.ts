import type { SystemStyleObject, Theme } from "@mui/system";

export const textFieldSx: SystemStyleObject<Theme> = {
	"&:hover fieldset": {
		border: "1px solid #D3D3D4 !important",
	},
	"& fieldset": {
		borderColor: "#D3D3D4",
	},
	"& .MuiPickersOutlinedInput-root:hover .MuiPickersOutlinedInput-notchedOutline":
		{
			borderColor: "#D3D3D4",
			borderWidth: "1px",
		},
	"& .MuiPickersOutlinedInput-root.Mui-focused .MuiPickersOutlinedInput-notchedOutline":
		{
			borderColor: "#01b3e460 !important",
			borderWidth: "1px !important",
		},
	"& .MuiOutlinedInput-root": {
		paddingRight: 0,
		"&:hover .MuiOutlinedInput-notchedOutline": {
			borderColor: "#D3D3D4",
		},
		"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "#111827",
			borderWidth: "1.5px",
		},
		"&.Mui-focused fieldset": {
			borderColor: "#D3D3D4 !important",
			borderWidth: "1px !important",
		},
		"&.Mui-error .MuiOutlinedInput-notchedOutline": {
			borderColor: "#ef4444",
		},
	},
	"& .MuiPickersOutlinedInput-root": {
		paddingRight: "0",
	},
	"& .MuiInputAdornment-root": {
		backgroundColor: "#dee2e6",
		maxHeight: "none",
		alignSelf: "stretch",
		borderTopRightRadius: "0.375rem",
		borderBottomRightRadius: "0.375rem",
		"&:hover": {
			backgroundColor: "#ced4da",
			borderLeftColor: "#ced4da",
		},
	},
	"& .MuiSvgIcon-root": {
		color: "#000",
	},
	"& .MuiIconButton-root": {
		borderRadius: 0,
		borderTopRightRadius: "0.375rem",
		borderBottomRightRadius: "0.375rem",
		padding: "0.375rem",
		height: "100%",
		marginRight: "0",
		borderLeft: "1px solid #dee2e6",
		color: "#1e293b",
		"&:hover": {
			borderLeftColor: "#C6CCD1",
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
	"& .MuiPickersSectionList-root": {
		fontSize: "0.81rem",
		height: "37.3px",
	},
	"& .MuiPickersInputBase-root": {
		borderRadius: ".375rem",
	},
	"& .Mui-focused:not(.Mui-error)": {
		border: "0px",
	},
};

export const popperSx: SystemStyleObject<Theme> = {
	"& .MuiPaper-root": {
		borderRadius: "12px",
		border: "1px solid #e5e7eb",
		boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
	},
};
